'use client';

import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion } from 'framer-motion';
import { History, CheckCircle, Calendar, Clock, Award, Bug, TrendingUp } from 'lucide-react';

export default function HistoricoPage() {
  const { analistaLogado, getMissoesAnalista } = useBSDSANStore();

  if (!analistaLogado) return null;

  const missoes = getMissoesAnalista(analistaLogado.id);
  const missoesConcluidas = missoes.filter((m) => m.status === 'concluida');

  const totalBugs = missoes.reduce((acc, m) => acc + (m.ocorrencias?.length || 0), 0);

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
      <div>
        <h1 className="text-2xl font-playfair font-bold text-white">Histórico</h1>
        <p className="text-[#6b7c95]">Acompanhe suas missões concluídas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Missões Concluídas', value: missoesConcluidas.length, icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Bugs Reportados', value: totalBugs, icon: Bug, color: 'text-orange-400' },
          { label: 'Taxa de Sucesso', value: '100%', icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Nível Atual', value: analistaLogado.nivel, icon: Award, color: 'text-[#c9a227]' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-5"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[#6b7c95] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Lista de Missões Concluídas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
      >
        <div className="p-5 border-b border-[#1e3a5f]/30 flex items-center gap-3">
          <History className="w-5 h-5 text-[#c9a227]" />
          <h2 className="text-lg font-semibold text-white">Missões Concluídas</h2>
        </div>

        {missoesConcluidas.length > 0 ? (
          <div className="divide-y divide-[#1e3a5f]/30">
            {missoesConcluidas.map((missao) => (
              <div key={missao.id} className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">Concluída</span>
                      <span className="text-xs text-[#4a5568] font-mono">{missao.protocolo}</span>
                    </div>
                    <h3 className="text-white font-medium">{missao.titulo}</h3>
                    <p className="text-sm text-[#6b7c95] mt-1">{missao.sistema}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    {missao.ocorrencias && missao.ocorrencias.length > 0 && (
                      <div className="flex items-center gap-1 text-orange-400">
                        <Bug className="w-4 h-4" />
                        <span>{missao.ocorrencias.length} bugs</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[#6b7c95]">
                      <Calendar className="w-4 h-4" />
                      <span>{formatarData(missao.dataConclusao || missao.dataLimite)}</span>
                    </div>
                  </div>
                </div>

                {missao.relatorio && (
                  <div className="mt-4 bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-4">
                    <p className="text-xs text-[#4a5568] uppercase tracking-wider mb-2">Relatório</p>
                    <p className="text-sm text-[#8ba3c7]">{missao.relatorio}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-[#1e3a5f] mx-auto mb-4" />
            <p className="text-[#6b7c95]">Nenhuma missão concluída ainda</p>
            <p className="text-sm text-[#4a5568] mt-1">
              Suas missões concluídas aparecerão aqui
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
