'use client';

import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function PerfilPage() {
  const { analistaLogado } = useBSDSANStore();
  const [copiado, setCopiado] = useState(false);

  if (!analistaLogado) return null;

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(analistaLogado.codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold text-white">Meu Perfil</h1>
        <p className="text-[#6b7c95]">Suas informações de credenciamento</p>
      </div>

      {/* Card Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
      >
        {/* Header do Card */}
        <div className="bg-gradient-to-r from-[#1e3a5f]/30 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-[#0a0f1a]">
                {analistaLogado.nome.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{analistaLogado.nome}</h2>
              <p className="text-[#c9a227]">Analista de Qualidade - Nível {analistaLogado.nivel}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-xs text-emerald-400">Credenciamento Ativo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="p-6 space-y-6">
          {/* Credenciais */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#c9a227]" />
              Credenciais
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4">
                <p className="text-xs text-[#4a5568] uppercase tracking-wider mb-1">Matrícula</p>
                <p className="text-lg font-mono text-white">{analistaLogado.matricula}</p>
              </div>
              <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4">
                <p className="text-xs text-[#4a5568] uppercase tracking-wider mb-1">Código de Acesso</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-mono text-[#c9a227]">{analistaLogado.codigo}</p>
                  <button
                    onClick={copiarCodigo}
                    className="p-1 text-[#6b7c95] hover:text-white transition-colors"
                  >
                    {copiado ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#c9a227]" />
              Informações de Contato
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-[#6b7c95]" />
                <div>
                  <p className="text-[#4a5568]">Email</p>
                  <p className="text-white">{analistaLogado.email}</p>
                </div>
              </div>
              {analistaLogado.telefone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-[#6b7c95]" />
                  <div>
                    <p className="text-[#4a5568]">Telefone</p>
                    <p className="text-white">{analistaLogado.telefone}</p>
                  </div>
                </div>
              )}
              {analistaLogado.endereco && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#6b7c95]" />
                  <div>
                    <p className="text-[#4a5568]">Localização</p>
                    <p className="text-white">{analistaLogado.endereco}</p>
                  </div>
                </div>
              )}
              {analistaLogado.formacao && (
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-5 h-5 text-[#6b7c95]" />
                  <div>
                    <p className="text-[#4a5568]">Formação</p>
                    <p className="text-white capitalize">{analistaLogado.formacao.replace('_', ' ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Datas */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c9a227]" />
              Histórico
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-[#1e3a5f]/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#6b7c95]" />
                </div>
                <div>
                  <p className="text-[#4a5568]">Data de Cadastro</p>
                  <p className="text-white">{formatarData(analistaLogado.dataCadastro)}</p>
                </div>
              </div>
              {analistaLogado.dataCredenciamento && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[#4a5568]">Data de Credenciamento</p>
                    <p className="text-white">{formatarData(analistaLogado.dataCredenciamento)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Aviso */}
      <div className="bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 rounded-lg p-4">
        <p className="text-sm text-[#8ba3c7]">
          Para alterar suas informações, entre em contato com a Diretoria de Certificação
          através do email <strong className="text-white">contato@bsdeveloper.com.br</strong>
        </p>
      </div>
    </div>
  );
}
