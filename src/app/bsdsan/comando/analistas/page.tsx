'use client';

import { useState } from 'react';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Shield,
  UserCheck,
  UserX,
} from 'lucide-react';

export default function AnalistasPage() {
  const { analistas, aprovarAnalista, atualizarAnalista } = useBSDSANStore();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'ativos' | 'pendentes' | 'inativos'>('todos');
  const [analistaSelecionado, setAnalistaSelecionado] = useState<string | null>(null);
  const [modalAprovar, setModalAprovar] = useState(false);

  const analistasFiltrados = analistas.filter((a) => {
    const matchBusca =
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.email.toLowerCase().includes(busca.toLowerCase()) ||
      a.matricula.toLowerCase().includes(busca.toLowerCase());

    const matchFiltro =
      filtro === 'todos' ||
      (filtro === 'ativos' && a.status === 'ativo') ||
      (filtro === 'pendentes' && a.status === 'pendente') ||
      (filtro === 'inativos' && a.status === 'inativo');

    return matchBusca && matchFiltro;
  });

  const analista = analistas.find((a) => a.id === analistaSelecionado);

  const handleAprovar = () => {
    if (analistaSelecionado) {
      aprovarAnalista(analistaSelecionado);
      setModalAprovar(false);
    }
  };

  const handleInativar = (id: string) => {
    atualizarAnalista(id, { status: 'inativo' });
  };

  const handleReativar = (id: string) => {
    atualizarAnalista(id, { status: 'ativo' });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white">Analistas</h1>
          <p className="text-[#6b7c95]">Gerencie os analistas credenciados</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#6b7c95]">
            {analistas.filter((a) => a.status === 'pendente').length} pendentes
          </span>
          <span className="text-[#1e3a5f]">|</span>
          <span className="text-[#6b7c95]">
            {analistas.filter((a) => a.status === 'ativo').length} ativos
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a5568]" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, email ou matrícula..."
            className="w-full bg-[#0d1424] border border-[#1e3a5f]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#1e3a5f]"
          />
        </div>

        <div className="flex gap-2">
          {[
            { value: 'todos', label: 'Todos' },
            { value: 'pendentes', label: 'Pendentes' },
            { value: 'ativos', label: 'Ativos' },
            { value: 'inativos', label: 'Inativos' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value as 'todos' | 'ativos' | 'pendentes' | 'inativos')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filtro === f.value
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-[#0d1424] text-[#6b7c95] border border-[#1e3a5f]/30 hover:border-[#1e3a5f]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-3">
          {analistasFiltrados.length > 0 ? (
            analistasFiltrados.map((a) => (
              <motion.button
                key={a.id}
                onClick={() => setAnalistaSelecionado(a.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  analistaSelecionado === a.id
                    ? 'bg-red-500/10 border-red-500/50'
                    : 'bg-[#0d1424] border-[#1e3a5f]/30 hover:border-[#1e3a5f]'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      a.status === 'ativo'
                        ? 'bg-emerald-500/20 border-emerald-500/50'
                        : a.status === 'pendente'
                        ? 'bg-yellow-500/20 border-yellow-500/50'
                        : 'bg-gray-500/20 border-gray-500/50'
                    }`}
                  >
                    <span className="text-sm font-semibold text-white">
                      {a.nome.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{a.nome}</p>
                    <p className="text-xs text-[#6b7c95]">{a.matricula}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-[10px] uppercase font-medium ${
                      a.status === 'ativo'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : a.status === 'pendente'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-8 text-center">
              <Users className="w-12 h-12 text-[#1e3a5f] mx-auto mb-4" />
              <p className="text-[#6b7c95]">Nenhum analista encontrado</p>
            </div>
          )}
        </div>

        {/* Detalhe */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {analista ? (
              <motion.div
                key={analista.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
              >
                {/* Header do Card */}
                <div className="p-6 border-b border-[#1e3a5f]/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${
                          analista.status === 'ativo'
                            ? 'bg-emerald-500/20 border-emerald-500/50'
                            : analista.status === 'pendente'
                            ? 'bg-yellow-500/20 border-yellow-500/50'
                            : 'bg-gray-500/20 border-gray-500/50'
                        }`}
                      >
                        <span className="text-2xl font-bold text-white">
                          {analista.nome.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{analista.nome}</h2>
                        <p className="text-[#6b7c95]">Analista de Qualidade - Nível {analista.nivel}</p>
                        <p className="text-xs text-[#4a5568] font-mono mt-1">{analista.matricula}</p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1.5 rounded text-xs font-medium ${
                        analista.status === 'ativo'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : analista.status === 'pendente'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {analista.status === 'ativo'
                        ? 'Credenciado'
                        : analista.status === 'pendente'
                        ? 'Aguardando Aprovação'
                        : 'Inativo'}
                    </span>
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6 space-y-6">
                  {/* Contato */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Informações de Contato</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-[#6b7c95]" />
                        <span className="text-[#8ba3c7]">{analista.email}</span>
                      </div>
                      {analista.telefone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-[#6b7c95]" />
                          <span className="text-[#8ba3c7]">{analista.telefone}</span>
                        </div>
                      )}
                      {analista.endereco && (
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-[#6b7c95]" />
                          <span className="text-[#8ba3c7]">{analista.endereco}</span>
                        </div>
                      )}
                      {analista.formacao && (
                        <div className="flex items-center gap-3 text-sm">
                          <GraduationCap className="w-4 h-4 text-[#6b7c95]" />
                          <span className="text-[#8ba3c7] capitalize">{analista.formacao.replace('_', ' ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Datas */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Histórico</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-[#6b7c95]" />
                        <div>
                          <p className="text-[#4a5568]">Cadastro</p>
                          <p className="text-[#8ba3c7]">{formatarData(analista.dataCadastro)}</p>
                        </div>
                      </div>
                      {analista.dataCredenciamento && (
                        <div className="flex items-center gap-3 text-sm">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <div>
                            <p className="text-[#4a5568]">Credenciamento</p>
                            <p className="text-[#8ba3c7]">{formatarData(analista.dataCredenciamento)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Código de Acesso */}
                  <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4">
                    <p className="text-xs text-[#4a5568] uppercase tracking-wider mb-1">
                      Código de Acesso
                    </p>
                    <p className="text-lg font-mono text-[#c9a227]">{analista.codigo}</p>
                  </div>

                  {/* Experiência */}
                  {analista.experiencia && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Experiência</h3>
                      <p className="text-sm text-[#6b7c95]">{analista.experiencia}</p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="p-6 border-t border-[#1e3a5f]/30 flex gap-3">
                  {analista.status === 'pendente' && (
                    <>
                      <button
                        onClick={() => setModalAprovar(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500"
                      >
                        <UserCheck className="w-5 h-5" />
                        Aprovar Credenciamento
                      </button>
                      <button
                        onClick={() => handleInativar(analista.id)}
                        className="px-6 py-3 border border-red-500/30 text-red-400 rounded-lg font-medium hover:bg-red-500/10"
                      >
                        <UserX className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {analista.status === 'ativo' && (
                    <button
                      onClick={() => handleInativar(analista.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 py-3 rounded-lg font-medium hover:bg-red-500/30"
                    >
                      <UserX className="w-5 h-5" />
                      Suspender Credenciamento
                    </button>
                  )}

                  {analista.status === 'inativo' && (
                    <button
                      onClick={() => handleReativar(analista.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-400 py-3 rounded-lg font-medium hover:bg-emerald-500/30"
                    >
                      <UserCheck className="w-5 h-5" />
                      Reativar Credenciamento
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-12 text-center"
              >
                <Users className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
                <p className="text-[#6b7c95]">Selecione um analista para ver os detalhes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Aprovar */}
      <AnimatePresence>
        {modalAprovar && analista && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl w-full max-w-md"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aprovar Credenciamento
                </h3>
                <p className="text-[#6b7c95] mb-6">
                  Tem certeza que deseja aprovar o credenciamento de{' '}
                  <strong className="text-white">{analista.nome}</strong>?
                </p>
                <p className="text-xs text-[#4a5568] bg-[#060a12] rounded-lg p-3 mb-6">
                  O analista receberá acesso ao portal e poderá receber missões
                  imediatamente após a aprovação.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModalAprovar(false)}
                    className="flex-1 py-3 border border-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#1e3a5f]/20"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAprovar}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500"
                  >
                    Confirmar Aprovação
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
