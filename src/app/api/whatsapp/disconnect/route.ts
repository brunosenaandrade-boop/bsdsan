import { NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsapp-client";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await whatsappService.disconnect();

    return NextResponse.json({
      success: true,
      message: "WhatsApp desconectado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao desconectar WhatsApp:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao desconectar WhatsApp",
      },
      { status: 500 }
    );
  }
}
