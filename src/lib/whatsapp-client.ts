import { Client, LocalAuth, Message } from "whatsapp-web.js";
import { EventEmitter } from "events";

// Declarar tipo global para persistir entre hot reloads
declare global {
  // eslint-disable-next-line no-var
  var whatsappServiceInstance: WhatsAppService | undefined;
}

// Singleton para o cliente WhatsApp
class WhatsAppService extends EventEmitter {
  private client: Client | null = null;
  private qrCode: string | null = null;
  private isConnected: boolean = false;
  private isInitializing: boolean = false;
  private messageHandlers: ((message: Message) => void)[] = [];

  constructor() {
    super();
  }

  public static getInstance(): WhatsAppService {
    // Usar globalThis para persistir entre hot reloads do Next.js
    if (!globalThis.whatsappServiceInstance) {
      globalThis.whatsappServiceInstance = new WhatsAppService();
    }
    return globalThis.whatsappServiceInstance;
  }

  public async initialize(): Promise<void> {
    if (this.client || this.isInitializing) {
      return;
    }

    this.isInitializing = true;

    try {
      this.client = new Client({
        authStrategy: new LocalAuth({
          dataPath: "./whatsapp-session",
        }),
        puppeteer: {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu",
          ],
        },
      });

      // Evento de QR Code
      this.client.on("qr", (qr: string) => {
        console.log("QR Code recebido");
        this.qrCode = qr;
        this.emit("qr", qr);
      });

      // Evento de autenticação
      this.client.on("authenticated", () => {
        console.log("WhatsApp autenticado!");
        this.emit("authenticated");
      });

      // Evento de pronto
      this.client.on("ready", () => {
        console.log("WhatsApp pronto!");
        this.isConnected = true;
        this.qrCode = null;
        this.emit("ready");
      });

      // Evento de desconexão
      this.client.on("disconnected", (reason: string) => {
        console.log("WhatsApp desconectado:", reason);
        this.isConnected = false;
        this.client = null;
        this.isInitializing = false;
        this.emit("disconnected", reason);
      });

      // Evento de mensagem recebida
      this.client.on("message", async (message: Message) => {
        console.log("Mensagem recebida:", message.body);
        this.emit("message", message);

        // Executar handlers registrados
        for (const handler of this.messageHandlers) {
          try {
            handler(message);
          } catch (error) {
            console.error("Erro no handler de mensagem:", error);
          }
        }
      });

      // Evento de falha de autenticação
      this.client.on("auth_failure", (msg: string) => {
        console.error("Falha na autenticação:", msg);
        this.isInitializing = false;
        this.emit("auth_failure", msg);
      });

      await this.client.initialize();
    } catch (error) {
      console.error("Erro ao inicializar WhatsApp:", error);
      this.isInitializing = false;
      throw error;
    }
  }

  public async sendMessage(to: string, message: string): Promise<Message | null> {
    if (!this.client || !this.isConnected) {
      throw new Error("WhatsApp não está conectado");
    }

    try {
      // Formatar número para o formato correto
      const formattedNumber = this.formatNumber(to);
      const chatId = `${formattedNumber}@c.us`;

      const sentMessage = await this.client.sendMessage(chatId, message);
      return sentMessage;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  }

  private formatNumber(number: string): string {
    // Remove caracteres não numéricos
    let cleaned = number.replace(/\D/g, "");

    // Adiciona código do país se não tiver
    if (!cleaned.startsWith("55")) {
      cleaned = "55" + cleaned;
    }

    return cleaned;
  }

  public onMessage(handler: (message: Message) => void): void {
    this.messageHandlers.push(handler);
  }

  public removeMessageHandler(handler: (message: Message) => void): void {
    const index = this.messageHandlers.indexOf(handler);
    if (index > -1) {
      this.messageHandlers.splice(index, 1);
    }
  }

  public getQRCode(): string | null {
    return this.qrCode;
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public isInitializingClient(): boolean {
    return this.isInitializing;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      try {
        // Tentar destruir o cliente graciosamente
        await this.client.destroy();
      } catch (error) {
        // Ignorar erros EBUSY que ocorrem no Windows
        const errorMessage = (error as Error).message || "";
        if (!errorMessage.includes("EBUSY")) {
          console.error("Erro ao desconectar WhatsApp:", error);
        }
      } finally {
        // Limpar estado mesmo se houver erro
        this.client = null;
        this.isConnected = false;
        this.isInitializing = false;
        this.qrCode = null;
      }
    }
  }

  public async getChats() {
    if (!this.client || !this.isConnected) {
      return [];
    }
    return await this.client.getChats();
  }

  public getClient(): Client | null {
    return this.client;
  }
}

export const whatsappService = WhatsAppService.getInstance();
export type { Message };
