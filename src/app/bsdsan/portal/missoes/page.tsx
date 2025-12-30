'use client';

import { useState } from 'react';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Send,
  Bug,
  Loader2,
  X,
  FileText,
} from 'lucide-react';

export default function MissoesPage() {
  const { analistaLogado, getMissoesAnalista, atualizarMissao, concluirMissao, registrarOcorrencia } = useBSDSANStore();

  const [missaoSelecionada, setMissaoSelecionada] = useState<string | null>(null);
  const [modalOcorrencia, setModalOcorrencia] = useState(false);
  const [modalConclusao, setModalConclusao] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [novaOcorrencia, setNovaOcorrencia] = useState({
    tipo: 'bug' as 'bug' | 'melhoria' | 'duvida' | 'outro',
    gravidade: 'media' as 'baixa' | 'media' | 'alta' | 'critica',
    titulo: '',
    descricao: '',
    passos: '',
  });

  const [relatorio, setRelatorio] = useState('');

  if (!analistaLogado) return null;

  const missoes = getMissoesAnalista(analistaLogado.id);
  const missao = missoes.find((m) => m.id === missaoSelecionada);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const iniciarMissao = (id: string) => {
    atualizarMissao(id, { status: 'em_andamento' });
  };

  const handleRegistrarOcorrencia = async () => {
    if (!missaoSelecionada || !novaOcorrencia.titulo || !novaOcorrencia.descricao) return;

    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1500));

    registrarOcorrencia(missaoSelecionada, novaOcorrencia);

    setNovaOcorrencia({
      tipo: 'bug',
      gravidade: 'media',
      titulo: '',
      descricao: '',
      passos: '',
    });
    setModalOcorrencia(false);
    setEnviando(false);
  };

  const handleConcluirMissao = async () => {
    if (!missaoSelecionada || !relatorio) return;

    setEnviando(true);
    await new Promise((r) => setTimeout(r, 2000));

    concluirMissao(missaoSelecionada, relatorio);
    setRelatorio('');
    setModalConclusao(false);
    setMissaoSelecionada(null);
    setEnviando(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold text-white">Minhas Missões</h1>
        <p className="text-[#6b7c95] mt-1">Gerencie suas atribuições de qualidade</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de Missões */}
        <div className="lg:col-span-1 space-y-4">
          {missoes.length > 0 ? (
            missoes.map((m) => (
              <motion.button
                key={m.id}
                onClick={() => setMissaoSelecionada(m.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  missaoSelecionada === m.id
                    ? 'bg-[#c9a227]/10 border-[#c9a227]/50'
                    : 'bg-[#0d1424] border-[#1e3a5f]/30 hover:border-[#1e3a5f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          m.status === 'concluida'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : m.status === 'em_andamento'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {m.status === 'concluida' ? 'Concluída' : m.status === 'em_andamento' ? 'Em andamento' : 'Pendente'}
                      </span>
                      {m.classificacao !== 'normal' && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                            m.classificacao === 'urgente'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}
                        >
                          {m.classificacao}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-medium truncate">{m.titulo}</h3>
                    <p className="text-xs text-[#6b7c95] mt-1">{m.sistema}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4a5568] shrink-0" />
                </div>
              </motion.button>
            ))
          ) : (
            <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-[#1e3a5f] mx-auto mb-4" />
              <p className="text-[#6b7c95]">Nenhuma missão atribuída</p>
              <p className="text-sm text-[#4a5568] mt-1">
                Aguarde novas atribuições da Diretoria
              </p>
            </div>
          )}
        </div>

        {/* Detalhe da Missão */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {missao ? (
              <motion.div
                key={missao.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
              >
                {/* Cabeçalho */}
                <div className="p-6 border-b border-[#1e3a5f]/30">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#6b7c95] font-mono mb-1">{missao.protocolo}</p>
                      <h2 className="text-xl font-semibold text-white">{missao.titulo}</h2>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded text-xs font-medium ${
                        missao.status === 'concluida'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : missao.status === 'em_andamento'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {missao.status === 'concluida' ? 'Concluída' : missao.status === 'em_andamento' ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-[#4a5568]">Sistema</p>
                      <p className="text-white">{missao.sistema}</p>
                    </div>
                    <div>
                      <p className="text-[#4a5568]">Versão</p>
                      <p className="text-white">{missao.versao || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#4a5568]">Emissão</p>
                      <p className="text-white">{formatarData(missao.dataEmissao)}</p>
                    </div>
                    <div>
                      <p className="text-[#4a5568]">Prazo</p>
                      <p className={`${
                        new Date(missao.dataLimite) < new Date() && missao.status !== 'concluida'
                          ? 'text-red-400'
                          : 'text-white'
                      }`}>
                        {formatarData(missao.dataLimite)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Descrição e Instruções */}
                <div className="p-6 border-b border-[#1e3a5f]/30">
                  <h3 className="text-sm font-semibold text-white mb-3">Descrição da Missão</h3>
                  <p className="text-[#8ba3c7] text-sm leading-relaxed">{missao.descricao}</p>

                  {missao.instrucoes && missao.instrucoes.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-white mb-3">Instruções</h3>
                      <ul className="space-y-2">
                        {missao.instrucoes.map((instrucao, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#8ba3c7]">
                            <span className="w-5 h-5 bg-[#1e3a5f]/30 rounded flex items-center justify-center text-xs text-[#c9a227] shrink-0">
                              {i + 1}
                            </span>
                            {instrucao}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {missao.urlSistema && (
                    <a
                      href={missao.urlSistema}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-sm text-[#c9a227] hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Acessar Sistema
                    </a>
                  )}
                </div>

                {/* Ocorrências */}
                <div className="p-6 border-b border-[#1e3a5f]/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">
                      Ocorrências Registradas ({missao.ocorrencias?.length || 0})
                    </h3>
                    {missao.status !== 'concluida' && (
                      <button
                        onClick={() => setModalOcorrencia(true)}
                        className="text-xs text-[#c9a227] hover:underline flex items-center gap-1"
                      >
                        <Bug className="w-4 h-4" />
                        Registrar Ocorrência
                      </button>
                    )}
                  </div>

                  {missao.ocorrencias && missao.ocorrencias.length > 0 ? (
                    <div className="space-y-3">
                      {missao.ocorrencias.map((oc) => (
                        <div
                          key={oc.id}
                          className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                                    oc.tipo === 'bug'
                                      ? 'bg-red-500/20 text-red-400'
                                      : oc.tipo === 'melhoria'
                                      ? 'bg-blue-500/20 text-blue-400'
                                      : 'bg-gray-500/20 text-gray-400'
                                  }`}
                                >
                                  {oc.tipo}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                                    oc.gravidade === 'critica'
                                      ? 'bg-red-500/20 text-red-400'
                                      : oc.gravidade === 'alta'
                                      ? 'bg-orange-500/20 text-orange-400'
                                      : oc.gravidade === 'media'
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-green-500/20 text-green-400'
                                  }`}
                                >
                                  {oc.gravidade}
                                </span>
                              </div>
                              <p className="text-white text-sm font-medium">{oc.titulo}</p>
                              <p className="text-[#6b7c95] text-xs mt-1">{oc.descricao}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#4a5568]">Nenhuma ocorrência registrada ainda.</p>
                  )}
                </div>

                {/* Ações */}
                <div className="p-6">
                  {missao.status === 'pendente' && (
                    <button
                      onClick={() => iniciarMissao(missao.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 transition-all"
                    >
                      Iniciar Missão
                    </button>
                  )}

                  {missao.status === 'em_andamento' && (
                    <button
                      onClick={() => setModalConclusao(true)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Concluir Missão
                    </button>
                  )}

                  {missao.status === 'concluida' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                        <div>
                          <p className="text-emerald-400 font-medium">Missão Concluída</p>
                          <p className="text-xs text-emerald-400/70">
                            Finalizada em {formatarData(missao.dataConclusao || '')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-12 text-center"
              >
                <FileText className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
                <p className="text-[#6b7c95]">Selecione uma missão para ver os detalhes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Registrar Ocorrência */}
      <AnimatePresence>
        {modalOcorrencia && (
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
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[#1e3a5f]/30 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Registrar Ocorrência</h3>
                <button
                  onClick={() => setModalOcorrencia(false)}
                  className="text-[#6b7c95] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#8ba3c7] mb-2">Tipo</label>
                    <select
                      value={novaOcorrencia.tipo}
                      onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, tipo: e.target.value as 'bug' | 'melhoria' | 'duvida' | 'outro' })}
                      className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="bug">Bug</option>
                      <option value="melhoria">Melhoria</option>
                      <option value="duvida">Dúvida</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#8ba3c7] mb-2">Gravidade</label>
                    <select
                      value={novaOcorrencia.gravidade}
                      onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, gravidade: e.target.value as 'baixa' | 'media' | 'alta' | 'critica' })}
                      className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="critica">Crítica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#8ba3c7] mb-2">Título *</label>
                  <input
                    type="text"
                    value={novaOcorrencia.titulo}
                    onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, titulo: e.target.value })}
                    placeholder="Resumo breve da ocorrência"
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8ba3c7] mb-2">Descrição *</label>
                  <textarea
                    value={novaOcorrencia.descricao}
                    onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, descricao: e.target.value })}
                    placeholder="Descreva detalhadamente a ocorrência..."
                    rows={4}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8ba3c7] mb-2">Passos para Reproduzir</label>
                  <textarea
                    value={novaOcorrencia.passos}
                    onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, passos: e.target.value })}
                    placeholder="1. Acesse a página X&#10;2. Clique no botão Y&#10;3. Observe o erro Z"
                    rows={3}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-[#1e3a5f]/30 flex gap-3">
                <button
                  onClick={() => setModalOcorrencia(false)}
                  className="flex-1 bg-transparent border border-[#1e3a5f] text-white py-3 rounded-lg font-medium hover:bg-[#1e3a5f]/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRegistrarOcorrencia}
                  disabled={enviando || !novaOcorrencia.titulo || !novaOcorrencia.descricao}
                  className="flex-1 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {enviando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {enviando ? 'Enviando...' : 'Registrar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Concluir Missão */}
      <AnimatePresence>
        {modalConclusao && (
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
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl w-full max-w-lg"
            >
              <div className="p-6 border-b border-[#1e3a5f]/30 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Concluir Missão</h3>
                <button
                  onClick={() => setModalConclusao(false)}
                  className="text-[#6b7c95] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-sm text-[#8ba3c7] mb-2">
                  Relatório de Conclusão *
                </label>
                <textarea
                  value={relatorio}
                  onChange={(e) => setRelatorio(e.target.value)}
                  placeholder="Descreva o que foi verificado, principais observações e conclusões..."
                  rows={6}
                  className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                />
                <p className="text-xs text-[#4a5568] mt-2">
                  Este relatório será enviado para a Diretoria de Qualidade.
                </p>
              </div>

              <div className="p-6 border-t border-[#1e3a5f]/30 flex gap-3">
                <button
                  onClick={() => setModalConclusao(false)}
                  className="flex-1 bg-transparent border border-[#1e3a5f] text-white py-3 rounded-lg font-medium hover:bg-[#1e3a5f]/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConcluirMissao}
                  disabled={enviando || !relatorio}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {enviando ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  {enviando ? 'Finalizando...' : 'Concluir Missão'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
