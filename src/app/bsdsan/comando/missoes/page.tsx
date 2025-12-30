'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Plus,
  Search,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  X,
  Send,
  Loader2,
} from 'lucide-react';

export default function MissoesAdminPage() {
  const searchParams = useSearchParams();
  const { analistas, missoes, criarMissao } = useBSDSANStore();

  const [modalNova, setModalNova] = useState(searchParams.get('nova') === 'true');
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todas' | 'pendentes' | 'andamento' | 'concluidas'>('todas');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [novaMissao, setNovaMissao] = useState({
    titulo: '',
    descricao: '',
    sistema: '',
    versao: '',
    classificacao: 'normal' as 'normal' | 'prioritaria' | 'urgente',
    analistaId: '',
    dataLimite: '',
    instrucoes: [''],
    urlSistema: '',
    observacoes: '',
  });

  const analistasAtivos = analistas.filter((a) => a.status === 'ativo');

  const missoesFiltradas = missoes.filter((m) => {
    const matchBusca =
      m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      m.protocolo.toLowerCase().includes(busca.toLowerCase());

    const matchFiltro =
      filtro === 'todas' ||
      (filtro === 'pendentes' && m.status === 'pendente') ||
      (filtro === 'andamento' && m.status === 'em_andamento') ||
      (filtro === 'concluidas' && m.status === 'concluida');

    return matchBusca && matchFiltro;
  });

  const handleAddInstrucao = () => {
    setNovaMissao((prev) => ({
      ...prev,
      instrucoes: [...prev.instrucoes, ''],
    }));
  };

  const handleRemoveInstrucao = (index: number) => {
    setNovaMissao((prev) => ({
      ...prev,
      instrucoes: prev.instrucoes.filter((_, i) => i !== index),
    }));
  };

  const handleInstrucaoChange = (index: number, value: string) => {
    setNovaMissao((prev) => ({
      ...prev,
      instrucoes: prev.instrucoes.map((inst, i) => (i === index ? value : inst)),
    }));
  };

  const handleCriarMissao = async () => {
    if (!novaMissao.titulo || !novaMissao.descricao || !novaMissao.analistaId || !novaMissao.dataLimite) {
      return;
    }

    setEnviando(true);
    await new Promise((r) => setTimeout(r, 2000));

    const analista = analistas.find((a) => a.id === novaMissao.analistaId);

    criarMissao({
      titulo: novaMissao.titulo,
      descricao: novaMissao.descricao,
      sistema: novaMissao.sistema,
      versao: novaMissao.versao,
      classificacao: novaMissao.classificacao,
      analistaId: novaMissao.analistaId,
      analistaNome: analista?.nome,
      dataLimite: novaMissao.dataLimite,
      instrucoes: novaMissao.instrucoes.filter((i) => i.trim()),
      urlSistema: novaMissao.urlSistema,
      observacoes: novaMissao.observacoes,
    });

    setEnviando(false);
    setSucesso(true);

    setTimeout(() => {
      setSucesso(false);
      setModalNova(false);
      setNovaMissao({
        titulo: '',
        descricao: '',
        sistema: '',
        versao: '',
        classificacao: 'normal',
        analistaId: '',
        dataLimite: '',
        instrucoes: [''],
        urlSistema: '',
        observacoes: '',
      });
    }, 2000);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white">Missões</h1>
          <p className="text-[#6b7c95]">Crie e gerencie ordens de serviço</p>
        </div>

        <button
          onClick={() => setModalNova(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-red-400 hover:to-red-500 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nova Missão
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a5568]" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título ou protocolo..."
            className="w-full bg-[#0d1424] border border-[#1e3a5f]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#1e3a5f]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { value: 'todas', label: 'Todas' },
            { value: 'pendentes', label: 'Pendentes' },
            { value: 'andamento', label: 'Em Andamento' },
            { value: 'concluidas', label: 'Concluídas' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value as 'todas' | 'pendentes' | 'andamento' | 'concluidas')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
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

      {/* Lista de Missões */}
      <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden">
        {missoesFiltradas.length > 0 ? (
          <div className="divide-y divide-[#1e3a5f]/30">
            {missoesFiltradas.map((missao) => (
              <div key={missao.id} className="p-5 hover:bg-[#1e3a5f]/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          missao.status === 'concluida'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : missao.status === 'em_andamento'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {missao.status === 'concluida'
                          ? 'Concluída'
                          : missao.status === 'em_andamento'
                          ? 'Em andamento'
                          : 'Pendente'}
                      </span>
                      {missao.classificacao !== 'normal' && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                            missao.classificacao === 'urgente'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}
                        >
                          {missao.classificacao}
                        </span>
                      )}
                      <span className="text-xs text-[#4a5568] font-mono">{missao.protocolo}</span>
                    </div>
                    <h3 className="text-white font-medium">{missao.titulo}</h3>
                    <p className="text-sm text-[#6b7c95] mt-1">
                      {missao.sistema} {missao.versao && `• v${missao.versao}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-[#6b7c95]">
                      <User className="w-4 h-4" />
                      <span>{missao.analistaNome || 'Não atribuído'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6b7c95]">
                      <Calendar className="w-4 h-4" />
                      <span>{formatarData(missao.dataLimite)}</span>
                    </div>
                    {missao.ocorrencias && missao.ocorrencias.length > 0 && (
                      <div className="flex items-center gap-1 text-orange-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{missao.ocorrencias.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <ClipboardList className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
            <p className="text-[#6b7c95]">Nenhuma missão encontrada</p>
            <button
              onClick={() => setModalNova(true)}
              className="inline-flex items-center gap-1 text-sm text-[#c9a227] hover:underline mt-3"
            >
              <Plus className="w-4 h-4" />
              Criar nova missão
            </button>
          </div>
        )}
      </div>

      {/* Modal Nova Missão */}
      <AnimatePresence>
        {modalNova && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl w-full max-w-2xl my-8"
            >
              {sucesso ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Missão Criada com Sucesso!
                  </h3>
                  <p className="text-[#6b7c95]">
                    A ordem de serviço foi enviada para o analista.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-[#1e3a5f]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Nova Missão</h3>
                        <p className="text-xs text-[#6b7c95]">Criar ordem de serviço</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalNova(false)}
                      className="text-[#6b7c95] hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Analista */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Atribuir para *
                      </label>
                      <select
                        value={novaMissao.analistaId}
                        onChange={(e) =>
                          setNovaMissao({ ...novaMissao, analistaId: e.target.value })
                        }
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="">Selecione um analista...</option>
                        {analistasAtivos.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.nome} ({a.matricula})
                          </option>
                        ))}
                      </select>
                      {analistasAtivos.length === 0 && (
                        <p className="text-xs text-yellow-400 mt-1">
                          Nenhum analista ativo. Aprove um cadastro primeiro.
                        </p>
                      )}
                    </div>

                    {/* Título */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Título da Missão *
                      </label>
                      <input
                        type="text"
                        value={novaMissao.titulo}
                        onChange={(e) =>
                          setNovaMissao({ ...novaMissao, titulo: e.target.value })
                        }
                        placeholder="Ex: Validação do módulo de orçamentos"
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                      />
                    </div>

                    {/* Sistema e Versão */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#8ba3c7] mb-2">
                          Sistema
                        </label>
                        <input
                          type="text"
                          value={novaMissao.sistema}
                          onChange={(e) =>
                            setNovaMissao({ ...novaMissao, sistema: e.target.value })
                          }
                          placeholder="Nome do sistema"
                          className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#8ba3c7] mb-2">
                          Versão
                        </label>
                        <input
                          type="text"
                          value={novaMissao.versao}
                          onChange={(e) =>
                            setNovaMissao({ ...novaMissao, versao: e.target.value })
                          }
                          placeholder="Ex: 2.4.1-beta"
                          className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                        />
                      </div>
                    </div>

                    {/* Classificação e Data Limite */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#8ba3c7] mb-2">
                          Classificação
                        </label>
                        <select
                          value={novaMissao.classificacao}
                          onChange={(e) =>
                            setNovaMissao({
                              ...novaMissao,
                              classificacao: e.target.value as 'normal' | 'prioritaria' | 'urgente',
                            })
                          }
                          className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="prioritaria">Prioritária</option>
                          <option value="urgente">Urgente</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-[#8ba3c7] mb-2">
                          Data Limite *
                        </label>
                        <input
                          type="date"
                          value={novaMissao.dataLimite}
                          onChange={(e) =>
                            setNovaMissao({ ...novaMissao, dataLimite: e.target.value })
                          }
                          className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                    </div>

                    {/* Descrição */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Descrição *
                      </label>
                      <textarea
                        value={novaMissao.descricao}
                        onChange={(e) =>
                          setNovaMissao({ ...novaMissao, descricao: e.target.value })
                        }
                        placeholder="Descreva detalhadamente o que deve ser verificado..."
                        rows={4}
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                      />
                    </div>

                    {/* Instruções */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Instruções
                      </label>
                      <div className="space-y-2">
                        {novaMissao.instrucoes.map((inst, index) => (
                          <div key={index} className="flex gap-2">
                            <span className="w-8 h-10 bg-[#1e3a5f]/30 rounded flex items-center justify-center text-xs text-[#6b7c95]">
                              {index + 1}
                            </span>
                            <input
                              type="text"
                              value={inst}
                              onChange={(e) => handleInstrucaoChange(index, e.target.value)}
                              placeholder="Instrução..."
                              className="flex-1 bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-2 text-white placeholder-[#4a5568]"
                            />
                            {novaMissao.instrucoes.length > 1 && (
                              <button
                                onClick={() => handleRemoveInstrucao(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={handleAddInstrucao}
                          className="text-sm text-[#c9a227] hover:underline"
                        >
                          + Adicionar instrução
                        </button>
                      </div>
                    </div>

                    {/* URL do Sistema */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        URL do Sistema (opcional)
                      </label>
                      <input
                        type="url"
                        value={novaMissao.urlSistema}
                        onChange={(e) =>
                          setNovaMissao({ ...novaMissao, urlSistema: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                      />
                    </div>

                    {/* Observações */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Observações (opcional)
                      </label>
                      <textarea
                        value={novaMissao.observacoes}
                        onChange={(e) =>
                          setNovaMissao({ ...novaMissao, observacoes: e.target.value })
                        }
                        placeholder="Informações adicionais..."
                        rows={2}
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-[#1e3a5f]/30 flex gap-3">
                    <button
                      onClick={() => setModalNova(false)}
                      className="flex-1 py-3 border border-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#1e3a5f]/20"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCriarMissao}
                      disabled={
                        enviando ||
                        !novaMissao.titulo ||
                        !novaMissao.descricao ||
                        !novaMissao.analistaId ||
                        !novaMissao.dataLimite
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {enviando ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Criar Missão
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
