"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Smartphone,
  CheckCircle,
  XCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Bot,
  MessageSquare,
  Send,
  Settings,
  User,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Chat {
  id: string;
  name: string;
  unreadCount: number;
  lastMessage: string;
  timestamp: number;
}

interface BotSettings {
  botName: string;
  tone: string;
  autoReply: boolean;
  responseDelay: string;
  prompt: string;
}

type ConnectionStatus = "disconnected" | "initializing" | "waiting_qr" | "connected";

export default function WhatsAppPage() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [botEnabled, setBotEnabled] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("connection");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Configurações do bot
  const [botSettings, setBotSettings] = useState<BotSettings>({
    botName: "Ana",
    tone: "friendly",
    autoReply: true,
    responseDelay: "2",
    prompt: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Verificar status periodicamente
  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/whatsapp/status");
      const data = await response.json();

      setStatus(data.status);
      setQrCode(data.qrCode);

      if (data.status === "connected") {
        loadChats();
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error);
    }
  }, []);

  // Carregar chats
  const loadChats = async () => {
    try {
      const response = await fetch("/api/whatsapp/messages");
      const data = await response.json();
      if (data.success) {
        setChats(data.chats);
      }
    } catch (error) {
      console.error("Erro ao carregar chats:", error);
    }
  };

  // Verificar status do bot
  const checkBotStatus = async () => {
    try {
      const response = await fetch("/api/whatsapp/setup-bot");
      const data = await response.json();
      setBotEnabled(data.botConfigured);
    } catch (error) {
      console.error("Erro ao verificar bot:", error);
    }
  };

  // Carregar configurações do bot
  const loadBotSettings = async () => {
    try {
      const response = await fetch("/api/bot-settings");
      const data = await response.json();
      if (data.settings) {
        setBotSettings(data.settings);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  // Salvar configurações do bot
  const saveBotSettings = async () => {
    setSavingSettings(true);
    try {
      const response = await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botSettings),
      });
      const data = await response.json();
      if (data.success) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    } finally {
      setSavingSettings(false);
    }
  };

  useEffect(() => {
    checkStatus();
    checkBotStatus();
    loadBotSettings();

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/whatsapp/connect");
      const data = await response.json();

      setStatus(data.status);
      if (data.qrCode) {
        setQrCode(data.qrCode);
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/whatsapp/disconnect", { method: "POST" });
      setStatus("disconnected");
      setQrCode(null);
      setChats([]);
      setBotEnabled(false);
      setSelectedChat(null);
    } catch (error) {
      console.error("Erro ao desconectar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableBot = async () => {
    try {
      const response = await fetch("/api/whatsapp/setup-bot", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setBotEnabled(true);
      }
    } catch (error) {
      console.error("Erro ao ativar bot:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;

    setSendingMessage(true);
    try {
      // Extrair apenas o número do ID do chat (remove @c.us)
      const phoneNumber = selectedChat.id.replace("@c.us", "");

      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: phoneNumber, message: messageText }),
      });
      const data = await response.json();

      if (data.success) {
        setMessageText("");
        // Recarregar chats para atualizar última mensagem
        loadChats();
      } else {
        alert("Erro: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem");
    } finally {
      setSendingMessage(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins font-bold text-2xl">WhatsApp</h2>
          <p className="text-muted-foreground">
            Gerencie seu WhatsApp e configure o bot de atendimento
          </p>
        </div>
        <Badge
          className={
            status === "connected"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        >
          {status === "connected" ? (
            <>
              <Wifi className="h-3 w-3 mr-1" />
              Conectado
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 mr-1" />
              Desconectado
            </>
          )}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connection" className="gap-2">
            <QrCode className="h-4 w-4" />
            Conexão
          </TabsTrigger>
          <TabsTrigger value="conversations" className="gap-2" disabled={status !== "connected"}>
            <MessageSquare className="h-4 w-4" />
            Conversas
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Config. Bot
          </TabsTrigger>
        </TabsList>

        {/* Tab: Conexão */}
        <TabsContent value="connection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Conexão via QR Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                {status !== "connected" ? (
                  <div className="text-center py-8">
                    {qrCode ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="w-64 h-64 mx-auto bg-white border-2 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrCode}
                            alt="QR Code WhatsApp"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Escaneie o QR Code com seu WhatsApp
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleConnect}
                          disabled={isLoading}
                          className="gap-2"
                        >
                          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                          Gerar novo QR
                        </Button>
                      </motion.div>
                    ) : (
                      <>
                        {status === "initializing" ? (
                          <div className="py-8">
                            <RefreshCw className="h-16 w-16 mx-auto text-primary animate-spin mb-4" />
                            <p className="text-muted-foreground">
                              Inicializando WhatsApp...
                            </p>
                          </div>
                        ) : (
                          <>
                            <Smartphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-4">
                              Clique para gerar um QR Code e conectar seu WhatsApp
                            </p>
                            <Button
                              onClick={handleConnect}
                              disabled={isLoading}
                              className="gradient-primary-135 text-white"
                            >
                              {isLoading ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Conectando...
                                </>
                              ) : (
                                "Gerar QR Code"
                              )}
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">WhatsApp Conectado!</h3>
                    <p className="text-muted-foreground mb-4">
                      Pronto para automações e atendimento.
                    </p>

                    {!botEnabled ? (
                      <Button
                        onClick={handleEnableBot}
                        className="gradient-primary-135 text-white gap-2 mb-4"
                      >
                        <Bot className="h-4 w-4" />
                        Ativar Bot IA
                      </Button>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 mb-4">
                        <Bot className="h-3 w-3 mr-1" />
                        Bot IA Ativo
                      </Badge>
                    )}

                    <div className="mt-4">
                      <Button
                        variant="destructive"
                        onClick={handleDisconnect}
                        disabled={isLoading}
                        className="gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Desconectar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Como Conectar</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Clique em &ldquo;Gerar QR Code&rdquo;</p>
                      <p className="text-sm text-muted-foreground">
                        Um código QR será exibido na tela
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Abra o WhatsApp no celular</p>
                      <p className="text-sm text-muted-foreground">
                        Vá em Configurações → Dispositivos conectados
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Escaneie o QR Code</p>
                      <p className="text-sm text-muted-foreground">
                        Aponte a câmera para o código na tela
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      4
                    </span>
                    <div>
                      <p className="font-medium">Ative o Bot IA</p>
                      <p className="text-sm text-muted-foreground">
                        Configure em &ldquo;Config. Bot&rdquo; e ative as respostas automáticas
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Mantenha seu celular conectado à
                    internet. Se desconectar, será necessário escanear o QR Code novamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Conversas */}
        <TabsContent value="conversations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Lista de Conversas */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Conversas
                  <Button variant="ghost" size="sm" onClick={loadChats}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {chats.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      Nenhuma conversa encontrada
                    </div>
                  ) : (
                    chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors border-b ${
                          selectedChat?.id === chat.id ? "bg-muted" : ""
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">
                              {chat.name || "Desconhecido"}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(chat.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage || "Sem mensagens"}
                          </p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-primary text-white">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Área de Chat */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 border-b">
                {selectedChat ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedChat.name || "Desconhecido"}
                      </CardTitle>
                      <CardDescription>
                        {selectedChat.id.replace("@c.us", "")}
                      </CardDescription>
                    </div>
                  </div>
                ) : (
                  <CardTitle className="text-lg text-muted-foreground">
                    Selecione uma conversa
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[500px]">
                {selectedChat ? (
                  <>
                    {/* Área de mensagens */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="text-center text-sm text-muted-foreground py-4">
                          Última mensagem: {selectedChat.lastMessage || "Nenhuma"}
                        </div>
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Campo de envio */}
                    <div className="p-4 border-t bg-muted/30">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          disabled={sendingMessage}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={sendingMessage || !messageText.trim()}
                          className="gradient-primary-135 text-white"
                        >
                          {sendingMessage ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Pressione Enter para enviar • Bot {botEnabled ? "ativo" : "inativo"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Selecione uma conversa para enviar mensagens</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Configurações do Bot */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Configurações do Bot WhatsApp
              </CardTitle>
              <CardDescription>
                Configure a personalidade e comportamento do bot de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status do Bot */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Bot de Respostas Automáticas</p>
                    <p className="text-sm text-muted-foreground">
                      {botSettings.autoReply
                        ? "Respondendo mensagens automaticamente"
                        : "Desativado - apenas atendimento manual"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={botSettings.autoReply}
                  onCheckedChange={(checked) =>
                    setBotSettings({ ...botSettings, autoReply: checked })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do Bot */}
                <div className="space-y-2">
                  <Label htmlFor="botName">Nome do Bot</Label>
                  <Input
                    id="botName"
                    value={botSettings.botName}
                    onChange={(e) =>
                      setBotSettings({ ...botSettings, botName: e.target.value })
                    }
                    placeholder="Ex: Ana, Maria, João..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Nome que o bot usará para se apresentar
                  </p>
                </div>

                {/* Tom de Voz */}
                <div className="space-y-2">
                  <Label htmlFor="tone">Tom de Voz</Label>
                  <Select
                    value={botSettings.tone}
                    onValueChange={(value) =>
                      setBotSettings({ ...botSettings, tone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Amigável e Informal</SelectItem>
                      <SelectItem value="professional">Profissional e Formal</SelectItem>
                      <SelectItem value="enthusiastic">Entusiasta e Energético</SelectItem>
                      <SelectItem value="calm">Calmo e Acolhedor</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Define como o bot se comunica
                  </p>
                </div>

                {/* Delay de Resposta */}
                <div className="space-y-2">
                  <Label htmlFor="delay">Delay de Resposta (segundos)</Label>
                  <Select
                    value={botSettings.responseDelay}
                    onValueChange={(value) =>
                      setBotSettings({ ...botSettings, responseDelay: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sem delay</SelectItem>
                      <SelectItem value="1">1 segundo</SelectItem>
                      <SelectItem value="2">2 segundos</SelectItem>
                      <SelectItem value="3">3 segundos</SelectItem>
                      <SelectItem value="5">5 segundos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Tempo antes de enviar a resposta (mais natural)
                  </p>
                </div>
              </div>

              {/* Prompt/Personalidade */}
              <div className="space-y-2">
                <Label htmlFor="prompt">Personalidade e Instruções do Bot</Label>
                <Textarea
                  id="prompt"
                  value={botSettings.prompt}
                  onChange={(e) =>
                    setBotSettings({ ...botSettings, prompt: e.target.value })
                  }
                  placeholder="Descreva a personalidade do bot, como deve atender, informações sobre a empresa, etc..."
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Instruções detalhadas de como o bot deve se comportar e responder
                </p>
              </div>

              {/* Botão Salvar */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={saveBotSettings}
                  disabled={savingSettings}
                  className="gradient-primary-135 text-white gap-2"
                >
                  {savingSettings ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
                {settingsSaved && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-600 flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Salvo com sucesso!
                  </motion.span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> As configurações aqui definidas afetam tanto o
                  bot do WhatsApp quanto o chatbot do site. Ambos usam a mesma
                  personalidade para manter consistência no atendimento.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
