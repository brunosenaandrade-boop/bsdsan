"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Template {
  id: number;
  name: string;
  category: string;
  content: string;
  usageCount: number;
  lastUsed: string;
}

const initialTemplates: Template[] = [
  {
    id: 1,
    name: "Boas-vindas",
    category: "Saudação",
    content:
      "Olá {nome}! 👋 Seja bem-vindo(a) à BS Developer! Sou a Ana, assistente virtual do Bruno. Como posso te ajudar hoje?",
    usageCount: 156,
    lastUsed: "Há 2h",
  },
  {
    id: 2,
    name: "Orçamento Enviado",
    category: "Follow-up",
    content:
      "Oi {nome}! Tudo bem? 😊 Passando pra saber se você conseguiu analisar o orçamento que enviamos. Ficou alguma dúvida? Estou à disposição!",
    usageCount: 89,
    lastUsed: "Há 5h",
  },
  {
    id: 3,
    name: "Projeto Iniciado",
    category: "Atualização",
    content:
      "🚀 {nome}, seu projeto foi oficialmente iniciado! Prazo estimado: {prazo} dias. Qualquer dúvida, é só chamar!",
    usageCount: 45,
    lastUsed: "Ontem",
  },
  {
    id: 4,
    name: "Projeto Concluído",
    category: "Entrega",
    content:
      "🎉 {nome}, seu projeto está PRONTO! Segue o link para visualização: {link}. Me conta o que achou! 🙏",
    usageCount: 32,
    lastUsed: "2 dias",
  },
  {
    id: 5,
    name: "Lembrete de Pagamento",
    category: "Financeiro",
    content:
      "Olá {nome}! 💰 Este é um lembrete amigável sobre o pagamento do projeto. Valor: R$ {valor}. Precisa de mais informações?",
    usageCount: 28,
    lastUsed: "3 dias",
  },
];

const categories = [
  "Saudação",
  "Follow-up",
  "Atualização",
  "Entrega",
  "Financeiro",
  "Suporte",
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Saudação: "bg-green-100 text-green-700",
    "Follow-up": "bg-blue-100 text-blue-700",
    Atualização: "bg-yellow-100 text-yellow-700",
    Entrega: "bg-purple-100 text-purple-700",
    Financeiro: "bg-orange-100 text-orange-700",
    Suporte: "bg-pink-100 text-pink-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    content: "",
  });

  const handleAddTemplate = () => {
    const template: Template = {
      id: templates.length + 1,
      ...newTemplate,
      usageCount: 0,
      lastUsed: "Nunca",
    };
    setTemplates([template, ...templates]);
    setNewTemplate({ name: "", category: "", content: "" });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-2xl">
            Templates de Mensagem
          </h2>
          <p className="text-muted-foreground">
            Gerencie seus templates de resposta rápida
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary-135 text-white gap-2">
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Template</Label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                  placeholder="Ex: Boas-vindas"
                />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={newTemplate.category}
                  onValueChange={(value) =>
                    setNewTemplate({ ...newTemplate, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Conteúdo da Mensagem</Label>
                <Textarea
                  value={newTemplate.content}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, content: e.target.value })
                  }
                  placeholder="Digite o template da mensagem..."
                  className="min-h-[150px]"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{nome}"}, {"{email}"}, {"{valor}"} para variáveis
                  dinâmicas
                </p>
              </div>
              <Button
                onClick={handleAddTemplate}
                className="w-full"
                disabled={
                  !newTemplate.name ||
                  !newTemplate.category ||
                  !newTemplate.content
                }
              >
                Criar Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">
                      {template.name}
                    </CardTitle>
                    <Badge className={`mt-2 ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCopyTemplate(template.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 p-3 bg-muted rounded-lg mb-4">
                  <p className="text-sm line-clamp-4">{template.content}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{template.usageCount} usos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{template.lastUsed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tips Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dicas para bons templates</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use variáveis como {"{nome}"} para personalização</li>
                <li>• Mantenha as mensagens curtas e objetivas</li>
                <li>• Inclua emojis com moderação para um tom amigável</li>
                <li>• Sempre termine com uma pergunta ou call-to-action</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}