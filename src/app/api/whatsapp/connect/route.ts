import { NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsapp-client";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Verificar se já está conectado
    if (whatsappService.getConnectionStatus()) {
      return NextResponse.json({
        success: true,
        status: "connected",
        message: "WhatsApp já está conectado",
      });
    }

    // Verificar se já está inicializando
    if (whatsappService.isInitializingClient()) {
      const qr = whatsappService.getQRCode();
      if (qr) {
        // Gerar QR Code como imagem base64
        const qrImage = await QRCode.toDataURL(qr, {
          width: 256,
          margin: 2,
        });

        return NextResponse.json({
          success: true,
          status: "waiting_qr",
          qrCode: qrImage,
          message: "Aguardando escaneamento do QR Code",
        });
      }

      return NextResponse.json({
        success: true,
        status: "initializing",
        message: "Inicializando WhatsApp...",
      });
    }

    // Iniciar conexão
    whatsappService.initialize().catch(console.error);

    return NextResponse.json({
      success: true,
      status: "initializing",
      message: "Iniciando conexão com WhatsApp...",
    });
  } catch (error) {
    console.error("Erro ao conectar WhatsApp:", error);
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Erro ao conectar com WhatsApp",
      },
      { status: 500 }
    );
  }
}
