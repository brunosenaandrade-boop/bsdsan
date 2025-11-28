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

const INITIAL_MESSAGE = `Oi! 👋 Eu sou a Ana, assistente virtual do Bruno aqui da BS Developer!

Estou aqui pra te ajudar a entender como a gente pode transformar sua ideia em um projeto digital de sucesso.

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

      // Extrair pain points da resposta se houver
      if (data.painPoints) {
        setPainPoints((prev) => [...prev, ...data.painPoints]);
      }
    } catch {
      // Fallback offline com respostas básicas
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
      return `Entendo que o investimento é uma preocupação importante! 💰

Nossos projetos variam de R$ 1.500 (landing pages simples) até R$ 15.000+ (SaaS complexos).

O legal é que a gente sempre encontra uma solução que cabe no seu bolso. Que tal fazer a simulação de orçamento no site? É rapidinho e sem compromisso!

Ou se preferir, posso te conectar direto com o Bruno no WhatsApp pra vocês conversarem sobre o seu projeto específico. O que você prefere?`;
    }

    if (
      lowerInput.includes("prazo") ||
      lowerInput.includes("tempo") ||
      lowerInput.includes("demora") ||
      lowerInput.includes("dias")
    ) {
      return `Ótima pergunta! ⏱️

Os prazos dependem do tipo de projeto:
• Landing pages: 7-14 dias
• Sites institucionais: 14-21 dias
• E-commerces e sistemas: 21-30 dias
• SaaS completos: 30-60 dias

E o Bruno tem uma taxa de 94% de aprovação na primeira versão, então você não fica semanas pedindo ajustes!

Qual é o seu prazo ideal pro projeto que você tem em mente?`;
    }

    if (
      lowerInput.includes("site") ||
      lowerInput.includes("landing") ||
      lowerInput.includes("loja") ||
      lowerInput.includes("ecommerce")
    ) {
      setPainPoints((prev) => [...prev, "Precisa de presença digital"]);
      return `Perfeito! Sites e lojas são minha especialidade! 🚀

Me conta um pouquinho mais: você quer um site pra...
• Vender produtos/serviços online?
• Captar leads e clientes?
• Mostrar seu portfólio e trabalhos?
• Ou algo diferente?

Quanto mais eu entender sua necessidade, melhor consigo te direcionar pro tipo de projeto ideal!`;
    }

    if (
      lowerInput.includes("app") ||
      lowerInput.includes("aplicativo") ||
      lowerInput.includes("mobile")
    ) {
      setPainPoints((prev) => [...prev, "Interesse em app mobile"]);
      return `Apps são projetos super interessantes! 📱

O Bruno já desenvolveu o Tenha Paz (bloqueador de spam pra Android) e tem experiência com apps nativos.

Antes de avançar, uma pergunta importante: seu app precisa funcionar em Android, iOS ou nos dois? E você já tem uma ideia clara das funcionalidades principais?

Isso me ajuda a te dar uma estimativa mais precisa!`;
    }

    if (
      lowerInput.includes("saas") ||
      lowerInput.includes("sistema") ||
      lowerInput.includes("plataforma")
    ) {
      setPainPoints((prev) => [...prev, "Quer criar um SaaS"]);
      return `Uau, SaaS é onde a mágica acontece! ✨

O Bruno criou o GuardaDinheiro que já tem 5.000+ usuários ativos. Então ele manja muito de:
• Dashboard com analytics
• Sistema de assinaturas
• Integração com pagamentos
• Múltiplos usuários

Qual é a ideia do seu SaaS? Ele resolve que tipo de problema?`;
    }

    // Resposta padrão com call-to-action
    return `Que legal você me contar isso! 😊

Olha, pelo que você tá descrevendo, parece que o Bruno pode te ajudar sim!

Quer que eu te conecte com ele no WhatsApp pra vocês conversarem melhor? Ele responde super rápido e vai adorar entender seu projeto em detalhes.

Ou se preferir, você pode usar o simulador de orçamento aqui no site pra ter uma ideia de valores antes de conversar. O que faz mais sentido pra você?`;
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
            className="fixed bottom-24 right-6 z-50 flex items-center gap-2 gradient-primary-135 text-white px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Abrir chat"
          >
            <Sparkles className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Fale com a Ana</span>
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
            className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-primary-135 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white/30">
                  <AvatarFallback className="bg-white/20 text-white font-semibold">
                    A
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Ana • Assistente Virtual</p>
                  <p className="text-xs opacity-80">BS Developer</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
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
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Action */}
            {messages.length > 2 && (
              <div className="px-4 py-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsAppRedirect}
                  className="w-full gap-2 text-green-600 border-green-200 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  Continuar no WhatsApp
                </Button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="gradient-primary-135 text-white"
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
