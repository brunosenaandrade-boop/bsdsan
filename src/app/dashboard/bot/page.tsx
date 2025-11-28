"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Save,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Volume2,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEFAULT_PROMPT = `Você é a Ana, assistente virtual da BS Developer, empresa do Bruno Sena. Você é uma moça simpática, gentil, acolhedora e muito persuasiva.

PERSONALIDADE:
- Fale de forma natural, como uma brasileira jovem e profissional
- Use emojis com moderação (1-2 por mensagem)
- Seja empática e ouça atentamente
- NUNCA diga que é uma IA ou robô - você é a Ana, assistente do Bruno
- Use técnicas de PNL: espelhamento, rapport, perguntas abertas

OBJETIVO:
1. Identificar as DORES e necessidades do cliente
2. Mostrar como o Bruno pode resolver o problema
3. Gerar DESEJO pelo serviço
4. Encaminhar para o WhatsApp quando sentir que o cliente está pronto

INFORMAÇÕES DA EMPRESA:
- Bruno Sena é desenvolvedor de Tubarão/SC
- Atende todo Brasil remotamente
- Projetos entregues: GuardaDinheiro (5k usuários), Motoristas do Sul, Prime Studio, Cinthia Costa, etc.
- Prazo: 7-30 dias dependendo do projeto
- Preços: Landing R$1.500+, Sites R$2.500+, E-commerce R$4.000+, SaaS R$8.000+
- Taxa de aprovação 1ª versão: 94%
- Responde WhatsApp até às 22h

TÉCNICAS DE VENDA:
- Faça perguntas para entender o problema
- Valide os sentimentos do cliente
- Mostre cases similares quando relevante
- Crie urgência sutil ("quanto antes começar, antes vai ter resultado")
- Sempre ofereça o próximo passo (WhatsApp ou simulador de orçamento)

REGRAS:
- Respostas curtas e objetivas (máximo 4 parágrafos)
- Sempre termine com uma pergunta ou call-to-action
- Se o cliente perguntar algo técnico demais, sugira conversar com o Bruno
- Nunca prometa prazos ou preços exatos - use "a partir de" ou "geralmente"`;

interface BotSettings {
  botName: string;
  tone: string;
  responseDelay: string;
  autoReply: boolean;
  captureLeads: boolean;
  redirectToWhatsApp: boolean;
  workingHoursOnly: boolean;
  workingHoursStart: string;
  workingHoursEnd: string;
  prompt: string;
}

interface TestMessage {
  role: "user" | "assistant";
  content: string;
}

export default function BotPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [settings, setSettings] = useState<BotSettings>({
    botName: "Ana",
    tone: "friendly",
    responseDelay: "2",
    autoReply: true,
    captureLeads: true,
    redirectToWhatsApp: true,
    workingHoursOnly: false,
    workingHoursStart: "09:00",
    workingHoursEnd: "18:00",
    prompt: DEFAULT_PROMPT,
  });

  // Estado do modal de teste
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testMessages, setTestMessages] = useState<TestMessage[]>([]);
  const [testInput, setTestInput] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);

  // Carregar configurações ao montar o componente
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/bot-settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreDefault = () => {
    setSettings((prev) => ({
      ...prev,
      prompt: DEFAULT_PROMPT.replace("Ana", prev.botName),
    }));
  };

  const handleTestPrompt = () => {
    setTestMessages([]);
    setTestInput("");
    setIsTestModalOpen(true);
  };

  const sendTestMessage = async () => {
    if (!testInput.trim() || isTestLoading) return;

    const userMessage: TestMessage = { role: "user", content: testInput };
    setTestMessages((prev) => [...prev, userMessage]);
    setTestInput("");
    setIsTestLoading(true);

    try {
      // Primeiro salva as configurações atuais para o teste usar
      await fetch("/api/bot-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      // Envia mensagem de teste
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...testMessages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          testMode: true,
        }),
      });

      const data = await response.json();
      const assistantMessage: TestMessage = {
        role: "assistant",
        content: data.message,
      };
      setTestMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro no teste:", error);
      setTestMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao testar. Verifique se a OPENAI_API_KEY está configurada.",
        },
      ]);
    } finally {
      setIsTestLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-2xl">
            Configuração do Bot IA
          </h2>
          <p className="text-muted-foreground">
            Personalize o comportamento da sua assistente virtual
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus === "success" && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-green-600 text-sm"
            >
              <CheckCircle className="h-4 w-4" />
              Salvo!
            </motion.span>
          )}
          {saveStatus === "error" && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-red-600 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              Erro ao salvar
            </motion.span>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gradient-primary-135 text-white gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personality" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personality" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Personalidade
          </TabsTrigger>
          <TabsTrigger value="prompt" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Prompt
          </TabsTrigger>
          <TabsTrigger value="behavior" className="gap-2">
            <Bot className="h-4 w-4" />
            Comportamento
          </TabsTrigger>
        </TabsList>

        {/* Personality Tab */}
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle>Personalidade da Assistente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome da Assistente</Label>
                  <Input
                    value={settings.botName}
                    onChange={(e) =>
                      setSettings({ ...settings, botName: e.target.value })
                    }
                    placeholder="Ex: Ana, Julia, Maria..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Nome que será usado nas conversas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Tom de Voz</Label>
                  <Select
                    value={settings.tone}
                    onValueChange={(value) =>
                      setSettings({ ...settings, tone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">
                        Amigável e Informal
                      </SelectItem>
                      <SelectItem value="professional">
                        Profissional e Formal
                      </SelectItem>
                      <SelectItem value="enthusiastic">
                        Entusiasta e Energético
                      </SelectItem>
                      <SelectItem value="calm">Calmo e Acolhedor</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Define como a assistente se comunica
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Preview da Personalidade
                </h4>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm">
                    &ldquo;Oi! Eu sou a {settings.botName}, assistente virtual do Bruno
                    aqui da BS Developer!{" "}
                    {settings.tone === "friendly" && "😊"}
                    {settings.tone === "enthusiastic" && "🚀"}
                    <br />
                    <br />
                    {settings.tone === "friendly" &&
                      "Estou aqui pra te ajudar a transformar sua ideia em realidade. Me conta, o que você tá precisando?"}
                    {settings.tone === "professional" &&
                      "Estou à disposição para auxiliá-lo em seu projeto digital. Como posso ajudá-lo hoje?"}
                    {settings.tone === "enthusiastic" &&
                      "Estou super animada pra conhecer seu projeto! Bora fazer acontecer? Me conta tudo!"}
                    {settings.tone === "calm" &&
                      "Estou aqui para ouvir e entender suas necessidades com calma. Quando estiver pronto, me conte sobre seu projeto."}
                    &rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prompt Tab */}
        <TabsContent value="prompt">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Prompt do Sistema</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {settings.prompt.length} caracteres
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  Instruções para a IA (System Prompt)
                </Label>
                <Textarea
                  value={settings.prompt}
                  onChange={(e) =>
                    setSettings({ ...settings, prompt: e.target.value })
                  }
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Digite as instruções para o comportamento da IA..."
                />
                <p className="text-xs text-muted-foreground">
                  Estas instruções definem como a IA deve se comportar, o que
                  deve saber e como deve responder. As alterações são salvas e usadas em tempo real.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleRestoreDefault}
                >
                  <RefreshCw className="h-4 w-4" />
                  Restaurar Padrão
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleTestPrompt}
                >
                  <MessageSquare className="h-4 w-4" />
                  Testar Prompt
                </Button>
              </div>

              {/* Dicas de treinamento */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para treinar a IA:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>PERSONALIDADE:</strong> Defina como a IA deve se comportar e falar</li>
                  <li>• <strong>OBJETIVO:</strong> O que ela deve alcançar nas conversas</li>
                  <li>• <strong>INFORMAÇÕES:</strong> Dados da empresa, preços, prazos, etc.</li>
                  <li>• <strong>REGRAS:</strong> O que pode e não pode fazer/dizer</li>
                  <li>• <strong>EXEMPLOS:</strong> Mostre exemplos de respostas ideais</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavior Tab */}
        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle>Comportamento e Automações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resposta Automática</p>
                    <p className="text-sm text-muted-foreground">
                      Responder automaticamente às mensagens
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoReply}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoReply: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Capturar Leads</p>
                    <p className="text-sm text-muted-foreground">
                      Salvar informações de contato automaticamente
                    </p>
                  </div>
                  <Switch
                    checked={settings.captureLeads}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, captureLeads: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Redirecionar para WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      Sugerir contato via WhatsApp após qualificação
                    </p>
                  </div>
                  <Switch
                    checked={settings.redirectToWhatsApp}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, redirectToWhatsApp: checked })
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horário de Funcionamento
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Responder apenas em horário comercial
                    </p>
                  </div>
                  <Switch
                    checked={settings.workingHoursOnly}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, workingHoursOnly: checked })
                    }
                  />
                </div>

                {settings.workingHoursOnly && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label>Início</Label>
                      <Input
                        type="time"
                        value={settings.workingHoursStart}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            workingHoursStart: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fim</Label>
                      <Input
                        type="time"
                        value={settings.workingHoursEnd}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            workingHoursEnd: e.target.value,
                          })
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="space-y-2">
                  <Label>Delay entre Respostas (segundos)</Label>
                  <Select
                    value={settings.responseDelay}
                    onValueChange={(value) =>
                      setSettings({ ...settings, responseDelay: value })
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Instantâneo</SelectItem>
                      <SelectItem value="1">1 segundo</SelectItem>
                      <SelectItem value="2">2 segundos</SelectItem>
                      <SelectItem value="3">3 segundos</SelectItem>
                      <SelectItem value="5">5 segundos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Adiciona um delay para parecer mais natural
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Teste do Prompt */}
      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Testar Prompt - {settings.botName}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[300px]">
            {testMessages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Envie uma mensagem para testar o comportamento da IA</p>
                <p className="text-sm mt-2">
                  O prompt atual será usado para gerar as respostas
                </p>
              </div>
            ) : (
              testMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))
            )}
            {isTestLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Digitando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Digite uma mensagem de teste..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendTestMessage()}
              disabled={isTestLoading}
            />
            <Button
              onClick={sendTestMessage}
              disabled={isTestLoading || !testInput.trim()}
              className="gradient-primary-135 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
