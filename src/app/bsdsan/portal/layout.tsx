'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import {
  Shield,
  LayoutDashboard,
  ClipboardList,
  History,
  FileText,
  User,
  LogOut,
  Bell,
} from 'lucide-react';

const menuItems = [
  { href: '/bsdsan/portal', label: 'Painel', icon: LayoutDashboard },
  { href: '/bsdsan/portal/missoes', label: 'Missões', icon: ClipboardList },
  { href: '/bsdsan/portal/historico', label: 'Histórico', icon: History },
  { href: '/bsdsan/portal/documentos', label: 'Documentos', icon: FileText },
  { href: '/bsdsan/portal/perfil', label: 'Meu Perfil', icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { analistaLogado, logoutAnalista, getComunicadosAnalista, inicializar } = useBSDSANStore();

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  useEffect(() => {
    if (!analistaLogado) {
      router.push('/bsdsan/acesso');
    }
  }, [analistaLogado, router]);

  if (!analistaLogado) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full" />
      </div>
    );
  }

  const comunicadosNaoLidos = getComunicadosAnalista(analistaLogado.id).filter((c) => !c.lido).length;

  const handleLogout = () => {
    logoutAnalista();
    router.push('/bsdsan/acesso');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d1424] border-b border-[#1e3a5f]/30 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/bsdsan/portal" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0a0f1a]" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold text-white">BSDSAN</h1>
              <p className="text-[10px] text-[#6b7c95]">Portal do Analista</p>
            </div>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-[#6b7c95] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              {comunicadosNaoLidos > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {comunicadosNaoLidos}
                </span>
              )}
            </button>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#1e3a5f] to-[#0d1424] rounded-full flex items-center justify-center border border-[#1e3a5f]/50">
                <span className="text-sm font-semibold text-[#c9a227]">
                  {analistaLogado.nome.charAt(0)}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{analistaLogado.nome}</p>
                <p className="text-[10px] text-[#6b7c95]">Analista Nível {analistaLogado.nivel}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-[#6b7c95] hover:text-red-400 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 bottom-0 w-64 bg-[#0d1424] border-r border-[#1e3a5f]/30 hidden md:block">
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-[#8ba3c7] hover:text-white hover:bg-[#1e3a5f]/20 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Credentials Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4">
            <p className="text-[10px] text-[#4a5568] uppercase tracking-wider mb-1">Matrícula</p>
            <p className="text-sm font-mono text-[#c9a227]">{analistaLogado.matricula}</p>
            <div className="mt-3 pt-3 border-t border-[#1e3a5f]/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-400">Credenciamento Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0d1424] border-t border-[#1e3a5f]/30 md:hidden">
        <div className="flex justify-around py-2">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 p-2 text-[#6b7c95]"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
