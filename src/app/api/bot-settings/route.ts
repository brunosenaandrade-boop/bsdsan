import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Caminho do arquivo de configurações (em produção, usar banco de dados)
const SETTINGS_FILE = path.join(process.cwd(), "data", "bot-settings.json");

// Configurações padrão
const DEFAULT_SETTINGS = {
  botName: "Ana",
  tone: "friendly",
  responseDelay: "2",
  autoReply: true,
  captureLeads: true,
  redirectToWhatsApp: true,
  workingHoursOnly: false,
  workingHoursStart: "09:00",
  workingHoursEnd: "18:00",
  prompt: `Você é a Ana, assistente virtual da BS Developer, empresa do Bruno Sena. Você é uma moça simpática, gentil, acolhedora e muito persuasiva.

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
- Nunca prometa prazos ou preços exatos - use "a partir de" ou "geralmente"`,
};

type BotSettings = typeof DEFAULT_SETTINGS;

// Garantir que o diretório data existe
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Carregar configurações
async function loadSettings(): Promise<BotSettings> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SETTINGS_FILE, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    // Se arquivo não existe, retorna padrão
    return DEFAULT_SETTINGS;
  }
}

// Salvar configurações
async function saveSettings(settings: BotSettings): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

// GET - Carregar configurações
export async function GET() {
  try {
    const settings = await loadSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erro ao carregar configurações:", error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

// POST - Salvar configurações
export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();

    // Mesclar com configurações existentes
    const currentSettings = await loadSettings();
    const mergedSettings = { ...currentSettings, ...newSettings };

    await saveSettings(mergedSettings);

    return NextResponse.json({
      success: true,
      message: "Configurações salvas com sucesso!",
      settings: mergedSettings
    });
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao salvar configurações" },
      { status: 500 }
    );
  }
}
