"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "online" | "offline";
}

interface Message {
  id: number;
  content: string;
  sender: "user" | "contact";
  time: string;
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "João Silva",
    lastMessage: "Oi, gostaria de saber mais sobre os serviços",
    time: "10:32",
    unread: 2,
    status: "online",
  },
  {
    id: 2,
    name: "Maria Santos",
    lastMessage: "Qual o prazo para um e-commerce?",
    time: "09:15",
    unread: 1,
    status: "online",
  },
  {
    id: 3,
    name: "Pedro Costa",
    lastMessage: "Perfeito, vou analisar a proposta",
    time: "Ontem",
    unread: 0,
    status: "offline",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    lastMessage: "Pode me enviar o orçamento?",
    time: "Ontem",
    unread: 0,
    status: "offline",
  },
  {
    id: 5,
    name: "Carlos Lima",
    lastMessage: "Obrigado pelo atendimento!",
    time: "23/01",
    unread: 0,
    status: "offline",
  },
];

const messages: Message[] = [
  {
    id: 1,
    content: "Olá! Vi seu site e gostaria de saber mais sobre desenvolvimento de landing pages.",
    sender: "contact",
    time: "10:28",
  },
  {
    id: 2,
    content: "Oi João! Claro, fico feliz em ajudar. Você já tem uma ideia do que precisa?",
    sender: "user",
    time: "10:29",
  },
  {
    id: 3,
    content: "Sim! Tenho uma clínica de estética e preciso de uma landing page para captar clientes para um tratamento específico.",
    sender: "contact",
    time: "10:30",
  },
  {
    id: 4,
    content: "Perfeito! Landing pages para clínicas de estética são um dos nossos pontos fortes. Geralmente entregamos em 7-10 dias.",
    sender: "user",
    time: "10:31",
  },
  {
    id: 5,
    content: "Ótimo! E qual seria o investimento aproximado?",
    sender: "contact",
    time: "10:32",
  },
];

export default function ConversationsPage() {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(
    conversations[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Aqui enviaria a mensagem
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Conversations List */}
        <Card className="md:col-span-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full p-3 rounded-lg text-left transition-colors mb-1 ${
                    selectedConv?.id === conv.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-white">
                          {conv.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {conv.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-primary text-white">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {selectedConv.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedConv.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.status === "online"
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-primary text-white rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="gradient-primary-135 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}