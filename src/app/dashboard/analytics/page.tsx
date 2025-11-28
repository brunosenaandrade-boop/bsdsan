"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Target,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  {
    title: "Total de Leads",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversões",
    value: "324",
    change: "+8.2%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Mensagens",
    value: "8,942",
    change: "+23.1%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Taxa de Conversão",
    value: "25.2%",
    change: "-2.4%",
    trend: "down",
    icon: TrendingUp,
  },
];

const monthlyData = [
  { month: "Jan", leads: 120, conversions: 28 },
  { month: "Fev", leads: 145, conversions: 35 },
  { month: "Mar", leads: 168, conversions: 42 },
  { month: "Abr", leads: 189, conversions: 48 },
  { month: "Mai", leads: 210, conversions: 55 },
  { month: "Jun", leads: 248, conversions: 62 },
];

const sourceData = [
  { source: "Site - Quiz", leads: 420, percentage: 33 },
  { source: "WhatsApp", leads: 380, percentage: 30 },
  { source: "Indicação", leads: 256, percentage: 20 },
  { source: "Instagram", leads: 128, percentage: 10 },
  { source: "Outros", leads: 100, percentage: 7 },
];

const interestData = [
  { interest: "Landing Page", count: 380, percentage: 30 },
  { interest: "E-commerce", count: 320, percentage: 25 },
  { interest: "SaaS", count: 256, percentage: 20 },
  { interest: "Site Institucional", count: 192, percentage: 15 },
  { interest: "App Mobile", count: 136, percentage: 10 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-2xl">Analytics</h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho do seu CRM
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
            <SelectItem value="1y">Último ano</SelectItem>
          </SelectContent>
        </Select>
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
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`flex items-center text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 ml-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 ml-1" />
                    )}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((item, index) => (
                <div key={item.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.month}</span>
                    <span className="text-muted-foreground">
                      {item.leads} leads / {item.conversions} conversões
                    </span>
                  </div>
                  <div className="flex gap-1 h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.leads / 250) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-primary rounded-l"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(item.conversions / 250) * 100}%`,
                      }}
                      transition={{ delay: index * 0.1 + 0.05 }}
                      className="bg-primary-teal rounded-r"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span>Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary-teal" />
                <span>Conversões</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Origem dos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((item, index) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.source}</span>
                    <span className="text-muted-foreground">
                      {item.leads} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full gradient-primary-135 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interest Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Interesse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {interestData.map((item, index) => (
              <motion.div
                key={item.interest}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-muted rounded-lg"
              >
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${item.percentage * 2.51} 251`}
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#1E3A8A" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{item.percentage}%</span>
                  </div>
                </div>
                <p className="font-medium text-sm">{item.interest}</p>
                <p className="text-xs text-muted-foreground">
                  {item.count} leads
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}