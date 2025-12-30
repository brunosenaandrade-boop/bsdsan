'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Palette,
  Lock,
  Save,
  CheckCircle,
  Loader2,
  Shield,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'empresa' | 'seguranca'>('empresa');

  const [config, setConfig] = useState({
    nomeEmpresa: 'BSDSAN',
    nomeCompleto: 'BsDeveloper Softwares de Alto Nível',
    slogan: 'Excelência em Qualidade de Software',
    email: 'contato@bsdeveloper.com.br',
    telefone: '(48) 99999-9999',
    endereco: 'Tubarão, SC - Brasil',
    corPrimaria: '#c9a227',
    corSecundaria: '#1e3a5f',
  });

  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  const handleSalvar = async () => {
    setSalvando(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSalvando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold text-white">Configurações</h1>
        <p className="text-[#6b7c95]">Personalize o sistema BSDSAN</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1e3a5f]/30 pb-4">
        <button
          onClick={() => setAbaAtiva('empresa')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            abaAtiva === 'empresa'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-[#6b7c95] hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Dados da Empresa
        </button>
        <button
          onClick={() => setAbaAtiva('seguranca')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            abaAtiva === 'seguranca'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-[#6b7c95] hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          Segurança
        </button>
      </div>

      {/* Conteúdo */}
      {abaAtiva === 'empresa' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Informações Básicas */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c9a227]" />
              Informações da Empresa
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Nome/Sigla
                </label>
                <input
                  type="text"
                  value={config.nomeEmpresa}
                  onChange={(e) => setConfig({ ...config, nomeEmpresa: e.target.value })}
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={config.nomeCompleto}
                  onChange={(e) => setConfig({ ...config, nomeCompleto: e.target.value })}
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Slogan
                </label>
                <input
                  type="text"
                  value={config.slogan}
                  onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#c9a227]" />
              Informações de Contato
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg pl-11 pr-4 py-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
                  <input
                    type="tel"
                    value={config.telefone}
                    onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg pl-11 pr-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Endereço
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
                  <input
                    type="text"
                    value={config.endereco}
                    onChange={(e) => setConfig({ ...config, endereco: e.target.value })}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg pl-11 pr-4 py-3 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cores */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#c9a227]" />
              Identidade Visual
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Cor Primária
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.corPrimaria}
                    onChange={(e) => setConfig({ ...config, corPrimaria: e.target.value })}
                    className="w-12 h-12 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.corPrimaria}
                    onChange={(e) => setConfig({ ...config, corPrimaria: e.target.value })}
                    className="flex-1 bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Cor Secundária
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.corSecundaria}
                    onChange={(e) => setConfig({ ...config, corSecundaria: e.target.value })}
                    className="w-12 h-12 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.corSecundaria}
                    onChange={(e) => setConfig({ ...config, corSecundaria: e.target.value })}
                    className="flex-1 bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-400 hover:to-red-500 disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : salvo ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {abaAtiva === 'seguranca' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Alterar Senha */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#c9a227]" />
              Alterar Senha do Admin
            </h2>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={senhas.senhaAtual}
                  onChange={(e) => setSenhas({ ...senhas, senhaAtual: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={senhas.novaSenha}
                  onChange={(e) => setSenhas({ ...senhas, novaSenha: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={senhas.confirmarSenha}
                  onChange={(e) => setSenhas({ ...senhas, confirmarSenha: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                />
              </div>

              <button
                onClick={handleSalvar}
                disabled={salvando || !senhas.senhaAtual || !senhas.novaSenha || senhas.novaSenha !== senhas.confirmarSenha}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-400 hover:to-red-500 disabled:opacity-50 mt-4"
              >
                {salvando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Alterar Senha
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info de Segurança */}
          <div className="bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Dicas de Segurança</h3>
            <ul className="text-sm text-[#6b7c95] space-y-1">
              <li>• Use uma senha com no mínimo 8 caracteres</li>
              <li>• Combine letras maiúsculas, minúsculas e números</li>
              <li>• Evite usar informações pessoais na senha</li>
              <li>• Altere sua senha periodicamente</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
