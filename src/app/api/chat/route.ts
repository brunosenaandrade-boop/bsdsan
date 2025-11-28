import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Configurações padrão (fallback)
const DEFAULT_PROMPT = `Você é a Ana, assistente virtual da BS Developer, empresa do Bruno Sena. Você é uma moça simpática, gentil, acolhedora e muito persuasiva.

PERSONALIDADE:
- Fale de forma natural, como uma brasileira jovem e profissional
- Use emojis com moderação (1-2 por mensagem)
- Seja empática e ouça atentamente
- NUNCA diga que é uma IA ou robô - você é a Ana, assistente do Bruno
- Use técnicas de PNL: espelhamento, rapport, perguntas abertas

OBJETIVO:
1. Identificar as DORES e necessidades do cliente
2. Mostrar como o Bruno pode resolver o problema
3. Gerar DESEJO pelo serviço
4. Encaminhar para o WhatsApp quando sentir que o cliente está pronto

INFORMAÇÕES DA EMPRESA:
- Bruno Sena é desenvolvedor de Tubarão/SC
- Atende todo Brasil remotamente
- Projetos entregues: GuardaDinheiro (5k usuários), Motoristas do Sul, Prime Studio, Cinthia Costa, etc.
- Prazo: 7-30 dias dependendo do projeto
- Preços: Landing R$1.500+, Sites R$2.500+, E-commerce R$4.000+, SaaS R$8.000+
- Taxa de aprovação 1ª versão: 94%
- Responde WhatsApp até às 22h

TÉCNICAS DE VENDA:
- Faça perguntas para entender o problema
- Valide os sentimentos do cliente
- Mostre cases similares quando relevante
- Crie urgência sutil ("quanto antes começar, antes vai ter resultado")
- Sempre ofereça o próximo passo (WhatsApp ou simulador de orçamento)

REGRAS:
- Respostas curtas e objetivas (máximo 4 parágrafos)
- Sempre termine com uma pergunta ou call-to-action
- Se o cliente perguntar algo técnico demais, sugira conversar com o Bruno
- Nunca prometa prazos ou preços exatos - use "a partir de" ou "geralmente"`;

// Configurações do bot do SITE (separado do WhatsApp)
// O bot do site é a Ana - vendedora que direciona para o WhatsApp
function getSiteSettings() {
  return {
    botName: "Ana",
    tone: "friendly",
    prompt: DEFAULT_PROMPT,
  };
}

// Ajustar prompt baseado no tom de voz
function adjustPromptForTone(basePrompt: string, tone: string, botName: string): string {
  let toneInstructions = "";

  switch (tone) {
    case "professional":
      toneInstructions = `
TOM DE VOZ: Profissional e Formal
- Use linguagem mais formal e técnica
- Evite gírias e expressões muito informais
- Mantenha um tom respeitoso e corporativo
- Use "você" em vez de "tu"`;
      break;
    case "enthusiastic":
      toneInstructions = `
TOM DE VOZ: Entusiasta e Energético
- Seja muito animado e positivo
- Use mais emojis (2-3 por mensagem)
- Demonstre empolgação genuína
- Use exclamações para transmitir energia`;
      break;
    case "calm":
      toneInstructions = `
TOM DE VOZ: Calmo e Acolhedor
- Fale de forma tranquila e serena
- Transmita segurança e confiança
- Não apresse o cliente
- Use frases mais longas e reflexivas`;
      break;
    default:
      toneInstructions = `
TOM DE VOZ: Amigável e Informal
- Seja simpática e acessível
- Use linguagem do dia-a-dia
- Crie conexão pessoal
- Seja leve mas profissional`;
  }

  let adjustedPrompt = basePrompt.replace(/Você é a \w+,/g, `Você é a ${botName},`);
  adjustedPrompt = adjustedPrompt.replace(/você é a \w+,/gi, `você é a ${botName},`);

  return adjustedPrompt + toneInstructions;
}

// Extrair pain points da mensagem
function extractPainPoints(message: string): string[] {
  const painPoints: string[] = [];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("vender") || lowerMessage.includes("vendas")) {
    painPoints.push("Quer aumentar vendas");
  }
  if (lowerMessage.includes("cliente") || lowerMessage.includes("lead")) {
    painPoints.push("Precisa captar mais clientes");
  }
  if (lowerMessage.includes("organiz") || lowerMessage.includes("bagunça")) {
    painPoints.push("Precisa organizar processos");
  }
  if (lowerMessage.includes("tempo") || lowerMessage.includes("demora")) {
    painPoints.push("Quer economizar tempo");
  }
  if (lowerMessage.includes("concorr") || lowerMessage.includes("competir")) {
    painPoints.push("Precisa se destacar da concorrência");
  }

  return painPoints;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, testMode } = await request.json();

    // Configurações do bot do SITE (Ana - vendedora)
    const settings = getSiteSettings();
    const systemPrompt = adjustPromptForTone(
      settings.prompt,
      settings.tone,
      settings.botName
    );

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        message: `Oi! Desculpa, estou com uma instabilidade técnica agora. 😅

Mas não se preocupa! Você pode falar diretamente com o Bruno pelo WhatsApp - ele responde super rápido!

Ou então, usa o simulador de orçamento aqui no site pra ter uma ideia de valores. O que você prefere?`,
        painPoints: [],
      });
    }

    // Inicializar Claude (Anthropic)
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Construir histórico de conversa para o Claude
    const chatHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    // Última mensagem do usuário
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // Chamar Claude API
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: chatHistory,
    });

    // Extrair texto da resposta
    const assistantMessage = response.content[0].type === "text"
      ? response.content[0].text
      : "Desculpa, não entendi. Pode repetir de outra forma?";

    // Extrair pain points
    const painPoints = extractPainPoints(lastUserMessage);

    // Se for modo de teste, incluir info adicional
    if (testMode) {
      return NextResponse.json({
        message: assistantMessage,
        painPoints,
        debug: {
          promptUsed: systemPrompt.substring(0, 200) + "...",
          botName: settings.botName,
          tone: settings.tone,
          model: "claude-haiku-4-20250514",
        }
      });
    }

    return NextResponse.json({
      message: assistantMessage,
      painPoints,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        message: `Ops, tive um probleminha técnico! 😅

Mas não se preocupa, você pode falar diretamente com o Bruno pelo WhatsApp. Ele vai adorar te ajudar!`,
        painPoints: [],
      },
      { status: 200 }
    );
  }
}
