"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { openWhatsApp } from "@/lib/whatsapp";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE = `Oi! Eu sou a Ana, assistente virtual da BS Developer.

Estou aqui pra te ajudar a entender como podemos transformar sua ideia em um projeto digital de sucesso.

Me conta: você já tem um negócio e quer digitalizar, ou está começando algo do zero?`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: INITIAL_MESSAGE,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.painPoints) {
        setPainPoints((prev) => [...prev, ...data.painPoints]);
      }
    } catch {
      const fallbackResponse = generateFallbackResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fallbackResponse,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("preço") ||
      lowerInput.includes("valor") ||
      lowerInput.includes("custo") ||
      lowerInput.includes("quanto")
    ) {
      return `Entendo que o investimento é uma preocupação importante!

Nossos projetos variam de R$ 3.000 (landing pages) até R$ 20.000+ (SaaS complexos).

O legal é que sempre encontramos uma solução que gera ROI comprovado. Que tal preencher o formulário de qualificação? É rápido e sem compromisso!

Ou posso te conectar direto com o Bruno no WhatsApp. O que prefere?`;
    }

    if (
      lowerInput.includes("prazo") ||
      lowerInput.includes("tempo") ||
      lowerInput.includes("demora") ||
      lowerInput.includes("dias")
    ) {
      return `Ótima pergunta!

Prazos típicos:
• Landing pages: 7-14 dias
• Sites e sistemas: 14-30 dias
• SaaS completos: 30-45 dias

E temos 94% de aprovação na primeira versão, então você não fica semanas pedindo ajustes.

Qual é o seu prazo ideal?`;
    }

    if (
      lowerInput.includes("site") ||
      lowerInput.includes("landing") ||
      lowerInput.includes("loja") ||
      lowerInput.includes("ecommerce")
    ) {
      setPainPoints((prev) => [...prev, "Precisa de presença digital"]);
      return `Sites e lojas são nossa especialidade!

Me conta mais: você quer...
• Vender produtos/serviços online?
• Captar leads qualificados?
• Mostrar seu portfólio?

Quanto mais eu entender, melhor consigo te direcionar!`;
    }

    if (
      lowerInput.includes("saas") ||
      lowerInput.includes("sistema") ||
      lowerInput.includes("plataforma")
    ) {
      setPainPoints((prev) => [...prev, "Quer criar um SaaS"]);
      return `SaaS é nossa especialidade máxima!

O Bruno criou o GuardaDinheiro com 15.000+ usuários. Entendemos de:
• Arquitetura escalável
• Sistema de assinaturas
• Integração com pagamentos
• Analytics avançado

Qual é a ideia do seu SaaS?`;
    }

    return `Interessante!

Pelo que você está descrevendo, parece que podemos ajudar sim.

Quer que eu te conecte com o Bruno no WhatsApp? Ele responde rápido e vai adorar entender seu projeto.

Ou preencha o formulário de qualificação no site. O que faz mais sentido?`;
  };

  const handleWhatsAppRedirect = () => {
    openWhatsApp({
      type: "custom",
      painPoints,
      customMessage:
        "Conversei com a Ana no site e gostaria de saber mais sobre como vocês podem me ajudar.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-full shadow-lg hover:bg-white/20 transition-all"
            aria-label="Abrir chat"
          >
            <Sparkles className="h-5 w-5" />
            <span className="hidden sm:inline font-medium text-sm">Fale com a Ana</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] sm:w-[400px] h-[500px] bg-[#0d0d0d] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-white/20">
                  <AvatarFallback className="bg-white/10 text-white font-semibold">
                    A
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white text-sm">Ana • Assistente Virtual</p>
                  <p className="text-xs text-muted-foreground">BS Developer</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-white/10 text-white rounded-br-md"
                          : "bg-[#1a1a1a] border border-white/10 text-white/90 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Action */}
            {messages.length > 2 && (
              <div className="px-4 py-2 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWhatsAppRedirect}
                  className="w-full gap-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 border border-green-500/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  Continuar no WhatsApp
                </Button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-white/30"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="btn-silver"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
