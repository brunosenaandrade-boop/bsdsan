import { NextRequest, NextResponse } from "next/server";
import { whatsappService } from "@/lib/whatsapp-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!whatsappService.getConnectionStatus()) {
      return NextResponse.json(
        {
          success: false,
          message: "WhatsApp não está conectado",
          chats: [],
        },
        { status: 400 }
      );
    }

    const client = whatsappService.getClient();
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message: "Cliente não disponível",
          chats: [],
        },
        { status: 400 }
      );
    }

    // Obter chats
    const chats = await client.getChats();

    // Filtrar apenas conversas individuais (não grupos)
    const individualChats = chats
      .filter((chat) => !chat.isGroup)
      .slice(0, 20) // Limitar a 20 conversas
      .map((chat) => ({
        id: chat.id._serialized,
        name: chat.name,
        unreadCount: chat.unreadCount,
        lastMessage: chat.lastMessage?.body?.substring(0, 100) || "",
        timestamp: chat.lastMessage?.timestamp || 0,
      }));

    return NextResponse.json({
      success: true,
      chats: individualChats,
    });
  } catch (error) {
    console.error("Erro ao obter mensagens:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao obter mensagens",
        chats: [],
      },
      { status: 500 }
    );
  }
}

// Obter mensagens de um chat específico
export async function POST(request: NextRequest) {
  try {
    const { chatId } = await request.json();

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "ID do chat é obrigatório",
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

    const client = whatsappService.getClient();
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message: "Cliente não disponível",
        },
        { status: 400 }
      );
    }

    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 50 });

    const formattedMessages = messages.map((msg) => ({
      id: msg.id.id,
      body: msg.body,
      fromMe: msg.fromMe,
      timestamp: msg.timestamp,
      type: msg.type,
    }));

    return NextResponse.json({
      success: true,
      chatName: chat.name,
      messages: formattedMessages,
    });
  } catch (error) {
    console.error("Erro ao obter mensagens do chat:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao obter mensagens",
      },
      { status: 500 }
    );
  }
}
