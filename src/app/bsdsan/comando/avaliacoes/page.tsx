'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  User,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Award,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface Resposta {
  questao: number;
  categoria: string;
  pergunta: string;
  respostaSelecionada: string;
  indiceResposta: number | null;
}

interface Avaliacao {
  candidato: string;
  codigo: string;
  dataRealizacao: string;
  tempoInicio: string;
  tempoFim: string;
  respostas: Resposta[];
  pontuacao: number;
  totalQuestoes: number;
}

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [avaliacaoExpandida, setAvaliacaoExpandida] = useState<number | null>(null);

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const carregarAvaliacoes = () => {
    const dados = localStorage.getItem('bsdsan-avaliacoes');
    if (dados) {
      setAvaliacoes(JSON.parse(dados));
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calcularTempo = (inicio: string, fim: string) => {
    const diff = new Date(fim).getTime() - new Date(inicio).getTime();
    const minutos = Math.floor(diff / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);
    return `${minutos}min ${segundos}s`;
  };

  const getCategoriaStats = (respostas: Resposta[]) => {
    const categorias: Record<string, { total: number; respondidas: number }> = {};
    respostas.forEach((r) => {
      if (!categorias[r.categoria]) {
        categorias[r.categoria] = { total: 0, respondidas: 0 };
      }
      categorias[r.categoria].total++;
      if (r.indiceResposta !== null) {
        categorias[r.categoria].respondidas++;
      }
    });
    return categorias;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white">
            Avaliações Psicológicas
          </h1>
          <p className="text-[#6b7c95]">
            Resultados das avaliações dos candidatos
          </p>
        </div>

        <button
          onClick={carregarAvaliacoes}
          className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/30 text-[#8ba3c7] rounded-lg hover:bg-[#1e3a5f]/50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* Lista de Avaliações */}
      {avaliacoes.length === 0 ? (
        <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-12 text-center">
          <Brain className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Nenhuma avaliação realizada
          </h2>
          <p className="text-[#6b7c95]">
            As avaliações dos candidatos aparecerão aqui após serem concluídas.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {avaliacoes.map((avaliacao, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
            >
              {/* Cabeçalho da Avaliação */}
              <div
                className="p-6 cursor-pointer hover:bg-[#1e3a5f]/10 transition-colors"
                onClick={() =>
                  setAvaliacaoExpandida(avaliacaoExpandida === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-xl flex items-center justify-center">
                      <User className="w-7 h-7 text-[#0a0f1a]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {avaliacao.candidato}
                      </h3>
                      <p className="text-sm text-[#6b7c95]">{avaliacao.codigo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-[#6b7c95]">Pontuação</p>
                      <p className="text-2xl font-bold text-[#c9a227]">
                        {avaliacao.pontuacao}/{avaliacao.totalQuestoes}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[#6b7c95]">Realizada em</p>
                      <p className="text-sm text-white">
                        {formatarData(avaliacao.dataRealizacao)}
                      </p>
                    </div>

                    {avaliacaoExpandida === index ? (
                      <ChevronUp className="w-6 h-6 text-[#6b7c95]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#6b7c95]" />
                    )}
                  </div>
                </div>

                {/* Stats rápidos */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#1e3a5f]/30">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#6b7c95]" />
                    <span className="text-sm text-[#8ba3c7]">
                      Tempo: {calcularTempo(avaliacao.tempoInicio, avaliacao.tempoFim)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-[#8ba3c7]">
                      {avaliacao.respostas.filter((r) => r.indiceResposta !== null).length} respondidas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#c9a227]" />
                    <span className="text-sm text-[#8ba3c7]">
                      {Math.round((avaliacao.pontuacao / avaliacao.totalQuestoes) * 100)}% de acertos
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalhes Expandidos */}
              {avaliacaoExpandida === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-[#1e3a5f]/30"
                >
                  {/* Estatísticas por Categoria */}
                  <div className="p-6 bg-[#060a12]">
                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#c9a227]" />
                      Desempenho por Categoria
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(getCategoriaStats(avaliacao.respostas)).map(
                        ([categoria, stats]) => (
                          <div
                            key={categoria}
                            className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-lg p-4"
                          >
                            <p className="text-xs text-[#6b7c95] uppercase tracking-wider mb-1">
                              {categoria}
                            </p>
                            <p className="text-lg font-semibold text-white">
                              {stats.respondidas}/{stats.total}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Lista de Respostas */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#c9a227]" />
                      Todas as Respostas
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {avaliacao.respostas.map((resposta, rIndex) => (
                        <div
                          key={rIndex}
                          className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-[#1e3a5f]/30 rounded text-xs text-[#8ba3c7]">
                                  Q{resposta.questao}
                                </span>
                                <span className="px-2 py-0.5 bg-[#c9a227]/20 rounded text-xs text-[#c9a227]">
                                  {resposta.categoria}
                                </span>
                              </div>
                              <p className="text-sm text-white mb-2">
                                {resposta.pergunta}
                              </p>
                              <p className="text-sm">
                                <span className="text-[#6b7c95]">Resposta: </span>
                                <span
                                  className={
                                    resposta.indiceResposta !== null
                                      ? 'text-[#c9a227]'
                                      : 'text-red-400'
                                  }
                                >
                                  {resposta.respostaSelecionada}
                                </span>
                              </p>
                            </div>
                            <div className="shrink-0">
                              {resposta.indiceResposta !== null ? (
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
