"use client";

import { useState } from "react";
import {
  Save,
  RefreshCw,
  User,
  Bell,
  Palette,
  Shield,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "Bruno Sena",
    email: "admin@bsdeveloper.com",
    phone: "(48) 99999-9999",
    company: "BS Developer",
  });

  const [notifications, setNotifications] = useState({
    emailNewLead: true,
    emailNewMessage: true,
    pushNewLead: true,
    pushNewMessage: true,
    dailyReport: false,
    weeklyReport: true,
  });

  const [branding, setBranding] = useState({
    primaryColor: "#1E3A8A",
    accentColor: "#14B8A6",
    logoUrl: "/image/logo.png",
    companyName: "BS Developer",
    tagline: "Transformando ideias em negócios digitais",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-2xl">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações do seu CRM
          </p>
        </div>
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

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="h-4 w-4" />
            Marca
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input
                    value={profile.company}
                    onChange={(e) =>
                      setProfile({ ...profile, company: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Notificações por Email</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novo Lead</p>
                      <p className="text-sm text-muted-foreground">
                        Receber email quando um novo lead for capturado
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNewLead}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          emailNewLead: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nova Mensagem</p>
                      <p className="text-sm text-muted-foreground">
                        Receber email para novas mensagens
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNewMessage}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          emailNewMessage: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Notificações Push</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novo Lead</p>
                      <p className="text-sm text-muted-foreground">
                        Notificação push para novos leads
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNewLead}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          pushNewLead: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nova Mensagem</p>
                      <p className="text-sm text-muted-foreground">
                        Notificação push para novas mensagens
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNewMessage}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          pushNewMessage: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Relatórios</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Relatório Diário</p>
                      <p className="text-sm text-muted-foreground">
                        Resumo diário por email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.dailyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          dailyReport: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Relatório Semanal</p>
                      <p className="text-sm text-muted-foreground">
                        Resumo semanal por email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          weeklyReport: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Personalização da Marca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Personalize a aparência do seu CRM. Estas configurações permitem
                que você venda o sistema como white-label.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={branding.companyName}
                    onChange={(e) =>
                      setBranding({ ...branding, companyName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={branding.tagline}
                    onChange={(e) =>
                      setBranding({ ...branding, tagline: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          primaryColor: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cor de Destaque</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={branding.accentColor}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={branding.accentColor}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          accentColor: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL da Logo</Label>
                <Input
                  value={branding.logoUrl}
                  onChange={(e) =>
                    setBranding({ ...branding, logoUrl: e.target.value })
                  }
                  placeholder="/image/logo.png"
                />
                <p className="text-xs text-muted-foreground">
                  Caminho para o arquivo da logo no servidor
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Preview</h4>
                <div
                  className="p-4 rounded-lg text-white"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <p className="font-bold text-lg">{branding.companyName}</p>
                  <p className="text-sm opacity-80">{branding.tagline}</p>
                  <div
                    className="mt-2 inline-block px-3 py-1 rounded text-sm"
                    style={{ backgroundColor: branding.accentColor }}
                  >
                    Botão de Ação
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Senha Atual</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Nova Senha</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirmar Nova Senha</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="gap-2">
                  <Key className="h-4 w-4" />
                  Alterar Senha
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Chaves de API</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OpenAI API Key</Label>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      defaultValue="••••••••••••••••••••"
                    />
                    <p className="text-xs text-muted-foreground">
                      Usada para o chatbot de IA
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Dica de segurança:</strong> Nunca compartilhe suas
                  chaves de API. Elas dão acesso às suas integrações e podem
                  gerar custos na sua conta.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
