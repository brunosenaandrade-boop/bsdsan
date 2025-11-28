"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total de Leads",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Conversas Ativas",
    value: "32",
    change: "+5%",
    trend: "up",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Taxa de Conversão",
    value: "24%",
    change: "-2%",
    trend: "down",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "Agendamentos",
    value: "18",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "bg-orange-500",
  },
];

const recentLeads = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    interest: "Landing Page",
    status: "Novo",
    date: "Há 2h",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    interest: "E-commerce",
    status: "Em contato",
    date: "Há 5h",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    interest: "SaaS",
    status: "Qualificado",
    date: "Há 1d",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@email.com",
    interest: "Site Institucional",
    status: "Novo",
    date: "Há 1d",
  },
  {
    id: 5,
    name: "Carlos Lima",
    email: "carlos@email.com",
    interest: "App Mobile",
    status: "Em negociação",
    date: "Há 2d",
  },
];

const recentConversations = [
  {
    id: 1,
    name: "João Silva",
    message: "Oi, gostaria de saber mais sobre...",
    time: "10:32",
    unread: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    message: "Qual o prazo para um e-commerce?",
    time: "09:15",
    unread: true,
  },
  {
    id: 3,
    name: "Pedro Costa",
    message: "Perfeito, vou analisar a proposta",
    time: "Ontem",
    unread: false,
  },
  {
    id: 4,
    name: "Ana Oliveira",
    message: "Pode me enviar o orçamento?",
    time: "Ontem",
    unread: false,
  },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Novo: "bg-blue-100 text-blue-700",
    "Em contato": "bg-yellow-100 text-yellow-700",
    Qualificado: "bg-green-100 text-green-700",
    "Em negociação": "bg-purple-100 text-purple-700",
    Fechado: "bg-emerald-100 text-emerald-700",
    Perdido: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="font-poppins font-bold text-2xl">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu CRM e automações
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}
                  >
                    <stat.icon
                      className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <span
                    className={`flex items-center text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 ml-1" />
                    )}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Leads Recentes</CardTitle>
            <a
              href="/dashboard/leads"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lead.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {lead.interest}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lead.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Conversas Recentes</CardTitle>
            <a
              href="/dashboard/conversations"
              className="text-sm text-primary hover:underline"
            >
              Ver todas
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      conv.unread
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {conv.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-medium truncate ${
                          conv.unread ? "" : "text-muted-foreground"
                        }`}
                      >
                        {conv.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.message}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/dashboard/whatsapp"
              className="p-4 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium">Conectar WhatsApp</p>
            </a>
            <a
              href="/dashboard/bot"
              className="p-4 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium">Configurar Bot</p>
            </a>
            <a
              href="/dashboard/templates"
              className="p-4 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium">Criar Template</p>
            </a>
            <a
              href="/dashboard/analytics"
              className="p-4 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium">Ver Relatórios</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
