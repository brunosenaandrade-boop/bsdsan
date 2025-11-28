import { NextResponse } from "next/server";
import { whatsappService, Message } from "@/lib/whatsapp-client";
import Anthropic from "@anthropic-ai/sdk";
import Groq from "groq-sdk";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// Declarar tipos globais para persistir entre hot reloads
declare global {
  // eslint-disable-next-line no-var
  var whatsappBotConfigured: boolean | undefined;
  // eslint-disable-next-line no-var
  var whatsappConversationHistory: Map<string, Array<{ role: "user" | "assistant"; content: string }>> | undefined;
  // eslint-disable-next-line no-var
  var whatsappBotHandler: ((message: Message) => void) | undefined;
}

// Armazenar histórico de conversas por número (persistente entre hot reloads)
const conversationHistory = globalThis.whatsappConversationHistory || new Map<string, Array<{ role: "user" | "assistant"; content: string }>>();
globalThis.whatsappConversationHistory = conversationHistory;

// Carregar configurações do bot
async function loadBotSettings() {
  try {
    const settingsFile = path.join(process.cwd(), "data", "bot-settings.json");
    const data = await fs.readFile(settingsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      botName: "Ana",
      tone: "friendly",
      autoReply: true,
      responseDelay: "2",
      prompt: `Você é a Ana, assistente virtual da BS Developer...`,
    };
  }
}

// Verificar se é um contato especial e retornar instruções personalizadas
function getSpecialContactInstructions(contactName: string, settings: Record<string, unknown>): string | null {
  const specialContacts = settings.specialContacts as Record<string, { relationship: string; instructions: string }> | undefined;

  if (!specialContacts) return null;

  // Procurar pelo nome do contato (case insensitive e parcial)
  for (const [name, config] of Object.entries(specialContacts)) {
    if (contactName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(contactName.toLowerCase())) {
      console.log(`👤 Contato especial detectado: ${name} (${config.relationship})`);
      return config.instructions;
    }
  }

  return null;
}

// Gerar resposta com Claude (Anthropic) - Texto
async function generateAIResponse(
  userMessage: string,
  phoneNumber: string,
  contactName?: string
): Promise<string> {
  const settings = await loadBotSettings();

  if (!settings.autoReply) {
    return "";
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY não configurada");
    return "eita, deu um problema aqui, já já volto";
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Recuperar histórico da conversa
    let history = conversationHistory.get(phoneNumber) || [];

    // Adicionar mensagem do usuário ao histórico
    history.push({ role: "user", content: userMessage });

    // Limitar histórico a últimas 10 mensagens
    if (history.length > 10) {
      history = history.slice(-10);
    }

    // Construir system prompt base
    let systemPrompt = settings.prompt || `Você é o Bruno, um cara gente boa. Seja natural.`;

    // Adicionar instruções especiais se for um contato especial
    if (contactName) {
      const specialInstructions = getSpecialContactInstructions(contactName, settings);
      if (specialInstructions) {
        systemPrompt += `\n\n⚠️ INSTRUÇÕES ESPECIAIS PARA ESTE CONTATO:\n${specialInstructions}\n\nO nome do contato é: ${contactName}`;
      }
    }

    // Chamar Claude API
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    // Extrair texto da resposta
    const aiMessage = response.content[0].type === "text"
      ? response.content[0].text
      : "opa, não entendi direito, pode repetir?";

    // Adicionar resposta ao histórico
    history.push({ role: "assistant", content: aiMessage });
    conversationHistory.set(phoneNumber, history);

    return aiMessage;
  } catch (error) {
    console.error("❌ Erro ao gerar resposta IA (Claude):", error);
    if (error instanceof Error) {
      console.error("Mensagem do erro:", error.message);
    }
    return "";
  }
}

// Transcrever áudio usando Groq Whisper
async function transcribeAudio(audioBase64: string, mimeType: string): Promise<string | null> {
  if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY não configurada");
    return null;
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Converter base64 para Buffer
    const audioBuffer = Buffer.from(audioBase64, "base64");

    // Determinar extensão do arquivo baseado no mime type
    let extension = "ogg";
    if (mimeType.includes("mp3") || mimeType.includes("mpeg")) {
      extension = "mp3";
    } else if (mimeType.includes("wav")) {
      extension = "wav";
    } else if (mimeType.includes("m4a")) {
      extension = "m4a";
    }

    // Criar um File object para enviar ao Groq
    const audioFile = new File([audioBuffer], `audio.${extension}`, {
      type: mimeType.split(";")[0], // Remove codec info
    });

    // Transcrever com Whisper
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "pt", // Português
      response_format: "text",
    });

    // Extrair texto da transcrição (pode ser string ou objeto com .text)
    const text = typeof transcription === "string" ? transcription : transcription.text;
    console.log(`📝 Transcrição: ${text}`);
    return text;
  } catch (error) {
    console.error("❌ Erro ao transcrever áudio (Groq):", error);
    if (error instanceof Error) {
      console.error("Mensagem do erro:", error.message);
    }
    return null;
  }
}

// Processar mensagem de áudio: transcreve e envia para Claude
async function handleAudioMessage(
  audioBase64: string,
  mimeType: string,
  phoneNumber: string,
  contactName?: string
): Promise<string> {
  const settings = await loadBotSettings();

  if (!settings.autoReply) {
    return "";
  }

  // Transcrever o áudio
  const transcription = await transcribeAudio(audioBase64, mimeType);

  if (!transcription || transcription.trim() === "") {
    return "não consegui ouvir direito, pode mandar de novo?";
  }

  console.log(`🎤 Áudio transcrito: "${transcription}"`);

  // Enviar a transcrição para o Claude como se fosse uma mensagem de texto
  return await generateAIResponse(transcription, phoneNumber, contactName);
}

// Flag para verificar se o handler já foi configurado (persistente)
const isBotConfigured = () => globalThis.whatsappBotConfigured === true;
const setBotConfigured = (value: boolean) => { globalThis.whatsappBotConfigured = value; };

export async function POST() {
  try {
    if (!whatsappService.getConnectionStatus()) {
      return NextResponse.json(
        {
          success: false,
          message: "WhatsApp não está conectado",
        },
        { status: 400 }
      );
    }

    // Se já está configurado, apenas retorna sucesso
    if (isBotConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Bot já está configurado",
      });
    }

    const settings = await loadBotSettings();

    // Remover handler anterior se existir (evita duplicação)
    if (globalThis.whatsappBotHandler) {
      whatsappService.removeMessageHandler(globalThis.whatsappBotHandler);
    }

    // Criar novo handler
    const messageHandler = async (message: Message) => {
      try {
        // Ignorar mensagens de grupos e mensagens próprias
        if (message.from.includes("@g.us") || message.fromMe) {
          return;
        }

        // Verificar se auto-resposta está ativada
        const currentSettings = await loadBotSettings();
        if (!currentSettings.autoReply) {
          return;
        }

        // Obter o nome do contato
        let contactName = "";
        try {
          const contact = await message.getContact();
          contactName = contact.pushname || contact.name || "";
          console.log(`👤 Contato: ${contactName} (${message.from})`);
        } catch {
          console.log(`👤 Contato: ${message.from} (nome não disponível)`);
        }

        // Obter o chat para enviar status de "digitando"
        const chat = await message.getChat();

        let response = "";

        // Verificar se é uma mensagem de áudio/voz
        const hasMedia = message.hasMedia;
        const messageType = message.type;

        if (hasMedia && (messageType === "ptt" || messageType === "audio")) {
          console.log(`🎤 Áudio recebido de ${contactName || message.from}`);

          // Mostrar status "digitando" enquanto processa
          await chat.sendStateTyping();

          try {
            // Baixar o áudio
            const media = await message.downloadMedia();

            if (media && media.data) {
              console.log(`📥 Áudio baixado: ${media.mimetype}, tamanho: ${media.data.length} caracteres base64`);

              // Transcrever e responder com Claude
              response = await handleAudioMessage(
                media.data,
                media.mimetype || "audio/ogg",
                message.from,
                contactName
              );
            } else {
              console.log("❌ Não foi possível baixar o áudio");
              response = "não consegui ouvir, pode mandar de novo?";
            }
          } catch (audioError) {
            console.error("❌ Erro ao processar áudio:", audioError);
            response = "deu ruim aqui pra ouvir o áudio, manda de novo?";
          }
        } else if (message.body && message.body.trim() !== "") {
          // Mensagem de texto normal
          console.log(`📩 Mensagem recebida de ${contactName || message.from}: ${message.body.substring(0, 50)}...`);

          // Mostrar status "digitando" enquanto gera resposta
          await chat.sendStateTyping();

          response = await generateAIResponse(message.body, message.from, contactName);
        } else {
          // Ignorar mensagens vazias ou outros tipos de mídia
          return;
        }

        if (response) {
          // Calcular delay baseado no tamanho da resposta (simula digitação real)
          const baseDelay = parseInt(currentSettings.responseDelay || "2") * 1000;
          const typingDelay = Math.min(response.length * 30, 5000); // 30ms por caractere, máximo 5s
          const totalDelay = baseDelay + typingDelay;

          // Manter status "digitando" durante o delay
          await chat.sendStateTyping();

          if (totalDelay > 0) {
            await new Promise((resolve) => setTimeout(resolve, totalDelay));
          }

          // Parar de "digitar" e enviar
          await chat.clearState();

          // Enviar resposta
          await message.reply(response);
          console.log(`✅ Resposta enviada para ${contactName || message.from}: ${response.substring(0, 50)}...`);
        }
      } catch (error) {
        console.error("❌ Erro ao processar mensagem:", error);
      }
    };

    // Registrar handler e salvar referência
    globalThis.whatsappBotHandler = messageHandler;
    whatsappService.onMessage(messageHandler);

    setBotConfigured(true);

    return NextResponse.json({
      success: true,
      message: "Bot configurado com sucesso (Claude AI + Áudio via Groq Whisper)",
      settings: {
        botName: settings.botName,
        autoReply: settings.autoReply,
        responseDelay: settings.responseDelay,
        audioSupport: !!process.env.GROQ_API_KEY,
      },
    });
  } catch (error) {
    console.error("Erro ao configurar bot:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao configurar bot",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    botConfigured: isBotConfigured(),
    isConnected: whatsappService.getConnectionStatus(),
  });
}
