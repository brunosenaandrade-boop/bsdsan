'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import {
  Shield,
  LayoutDashboard,
  Users,
  ClipboardList,
  MessageSquare,
  Settings,
  LogOut,
  Lock,
  Loader2,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { href: '/bsdsan/comando', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bsdsan/comando/analistas', label: 'Analistas', icon: Users },
  { href: '/bsdsan/comando/missoes', label: 'Missões', icon: ClipboardList },
  { href: '/bsdsan/comando/comunicados', label: 'Comunicados', icon: MessageSquare },
  { href: '/bsdsan/comando/configuracoes', label: 'Configurações', icon: Settings },
];

export default function ComandoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminLogado, loginAdmin, logoutAdmin, inicializar } = useBSDSANStore();

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [verificando, setVerificando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificando(true);
    setErro('');

    await new Promise((r) => setTimeout(r, 1500));

    const sucesso = loginAdmin(senha);
    if (!sucesso) {
      setErro('Senha incorreta. Acesso negado.');
    }

    setVerificando(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/bsdsan');
  };

  // Tela de Login do Admin
  if (!adminLogado) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-white mb-2">
                Comando Central
              </h1>
              <p className="text-sm text-[#6b7c95]">
                Área restrita - Apenas administradores
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setErro('');
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-4 text-white placeholder-[#4a5568] focus:outline-none focus:border-red-500/50"
                />
              </div>

              {erro && (
                <p className="text-sm text-red-400 text-center">{erro}</p>
              )}

              <button
                type="submit"
                disabled={verificando}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-400 hover:to-red-500 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {verificando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Acessar Comando
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/bsdsan"
                className="text-sm text-[#6b7c95] hover:text-white"
              >
                Voltar ao site
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-[#4a5568] mt-6">
            BSDSAN - Painel de Administração
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d1424] border-b border-red-500/30 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/bsdsan/comando" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-semibold text-white">COMANDO CENTRAL</h1>
                <p className="text-[10px] text-red-400">Administração BSDSAN</p>
              </div>
            </Link>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">Bruno Sena</p>
              <p className="text-[10px] text-red-400">Diretor-Presidente</p>
            </div>
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
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-[#0d1424] border-r border-red-500/20 z-40 transform transition-transform md:translate-x-0 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-[#8ba3c7] hover:text-white hover:bg-[#1e3a5f]/20'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#060a12] border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400 font-medium">MODO ADMIN</span>
            </div>
            <p className="text-[10px] text-[#4a5568]">
              Todas as ações são registradas
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
