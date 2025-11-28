import { NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsapp-client";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isConnected = whatsappService.getConnectionStatus();
    const isInitializing = whatsappService.isInitializingClient();
    const qr = whatsappService.getQRCode();

    let qrImage = null;
    if (qr) {
      qrImage = await QRCode.toDataURL(qr, {
        width: 256,
        margin: 2,
      });
    }

    let status: "disconnected" | "initializing" | "waiting_qr" | "connected";

    if (isConnected) {
      status = "connected";
    } else if (qr) {
      status = "waiting_qr";
    } else if (isInitializing) {
      status = "initializing";
    } else {
      status = "disconnected";
    }

    return NextResponse.json({
      success: true,
      status,
      isConnected,
      isInitializing,
      qrCode: qrImage,
    });
  } catch (error) {
    console.error("Erro ao verificar status:", error);
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Erro ao verificar status",
      },
      { status: 500 }
    );
  }
}
