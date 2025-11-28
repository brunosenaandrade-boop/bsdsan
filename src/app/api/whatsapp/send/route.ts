import { NextRequest, NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsapp-client";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Número e mensagem são obrigatórios",
        },
        { status: 400 }
      );
    }

    if (!whatsappService.getConnectionStatus()) {
      return NextResponse.json(
        {
          success: false,
          message: "WhatsApp não está conectado",
        },
        { status: 400 }
      );
    }

    const sentMessage = await whatsappService.sendMessage(to, message);

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso",
      messageId: sentMessage?.id?.id,
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar mensagem",
      },
      { status: 500 }
    );
  }
}
