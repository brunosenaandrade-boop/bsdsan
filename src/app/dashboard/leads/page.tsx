"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: string;
  source: string;
  notes: string;
  createdAt: string;
}

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(48) 99999-1111",
    interest: "Landing Page",
    status: "Novo",
    source: "Site - Quiz",
    notes: "Interessado em landing page para clínica",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(48) 99999-2222",
    interest: "E-commerce",
    status: "Em contato",
    source: "WhatsApp",
    notes: "Loja de roupas, precisa de e-commerce completo",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    phone: "(48) 99999-3333",
    interest: "SaaS",
    status: "Qualificado",
    source: "Indicação",
    notes: "Quer criar sistema de gestão para academias",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@email.com",
    phone: "(48) 99999-4444",
    interest: "Site Institucional",
    status: "Novo",
    source: "Site - Chat",
    notes: "Escritório de advocacia",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Carlos Lima",
    email: "carlos@email.com",
    phone: "(48) 99999-5555",
    interest: "App Mobile",
    status: "Em negociação",
    source: "Instagram",
    notes: "App de delivery local",
    createdAt: "2024-01-11",
  },
];

const statusOptions = [
  "Novo",
  "Em contato",
  "Qualificado",
  "Em negociação",
  "Fechado",
  "Perdido",
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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    notes: "",
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = () => {
    const lead: Lead = {
      id: leads.length + 1,
      ...newLead,
      status: "Novo",
      source: "Manual",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads([lead, ...leads]);
    setNewLead({ name: "", email: "", phone: "", interest: "", notes: "" });
    setIsAddDialogOpen(false);
  };

  const handleDeleteLead = (id: number) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-2xl">Leads</h2>
          <p className="text-muted-foreground">
            Gerencie seus leads e oportunidades
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary-135 text-white gap-2">
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  placeholder="Nome do lead"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                  placeholder="(48) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label>Interesse</Label>
                <Select
                  value={newLead.interest}
                  onValueChange={(value) =>
                    setNewLead({ ...newLead, interest: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o interesse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="Site Institucional">
                      Site Institucional
                    </SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="App Mobile">App Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notas</Label>
                <Textarea
                  value={newLead.notes}
                  onChange={(e) =>
                    setNewLead({ ...newLead, notes: e.target.value })
                  }
                  placeholder="Observações sobre o lead"
                />
              </div>
              <Button onClick={handleAddLead} className="w-full">
                Adicionar Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Lead</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">
                    Interesse
                  </th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">
                    Origem
                  </th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">
                    Data
                  </th>
                  <th className="text-right p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.email}
                        </p>
                        <p className="text-sm text-muted-foreground md:hidden">
                          {lead.interest}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {lead.interest}
                    </td>
                    <td className="p-4">
                      <Select
                        value={lead.status}
                        onValueChange={(value) =>
                          handleStatusChange(lead.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 h-8">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 hidden lg:table-cell">{lead.source}</td>
                    <td className="p-4 hidden lg:table-cell">
                      {lead.createdAt}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Ligar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum lead encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
