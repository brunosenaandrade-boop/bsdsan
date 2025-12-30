'use client';

import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  TrendingUp,
  Calendar,
  ArrowRight,
  Star,
  Trophy,
} from 'lucide-react';

export default function PortalDashboard() {
  const { analistaLogado, getMissoesAnalista, getComunicadosAnalista } = useBSDSANStore();

  if (!analistaLogado) return null;

  const missoes = getMissoesAnalista(analistaLogado.id);
  const comunicados = getComunicadosAnalista(analistaLogado.id);

  const missoesPendentes = missoes.filter((m) => m.status === 'pendente');
  const missoesEmAndamento = missoes.filter((m) => m.status === 'em_andamento');
  const missoesConcluidas = missoes.filter((m) => m.status === 'concluida');

  const totalOcorrencias = missoes.reduce((acc, m) => acc + (m.ocorrencias?.length || 0), 0);

  // Calcular nível de experiência
  const xpTotal = missoesConcluidas.length * 100 + totalOcorrencias * 25;
  const nivel = Math.floor(xpTotal / 500) + 1;
  const xpProximoNivel = 500 - (xpTotal % 500);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header de Boas-vindas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#0d1424] to-[#1e3a5f]/30 border border-[#1e3a5f]/30 rounded-xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[#6b7c95] text-sm mb-1">Bem-vinda de volta,</p>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white">
              {analistaLogado.nome.split(' ')[0]}
            </h1>
            <p className="text-[#8ba3c7] mt-2">
              Analista de Qualidade • Nível {analistaLogado.nivel}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-[#6b7c95]">Ranking Global</p>
              <p className="text-2xl font-bold text-[#c9a227]">#1</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#0a0f1a]" />
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-6 pt-6 border-t border-[#1e3a5f]/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#c9a227]" />
              <span className="text-sm text-white">Nível {nivel}</span>
            </div>
            <span className="text-xs text-[#6b7c95]">{xpProximoNivel} XP para o próximo nível</span>
          </div>
          <div className="h-2 bg-[#060a12] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((500 - xpProximoNivel) / 500) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#c9a227] to-[#f4d03f] rounded-full"
            />
          </div>
          <p className="text-xs text-[#4a5568] mt-2">
            {xpTotal} XP total • Complete missões e encontre bugs para subir de nível
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Missões Ativas',
            value: missoesPendentes.length + missoesEmAndamento.length,
            icon: ClipboardList,
            color: 'from-blue-500/20',
            iconColor: 'text-blue-400',
          },
          {
            label: 'Concluídas',
            value: missoesConcluidas.length,
            icon: CheckCircle,
            color: 'from-emerald-500/20',
            iconColor: 'text-emerald-400',
          },
          {
            label: 'Bugs Encontrados',
            value: totalOcorrencias,
            icon: AlertTriangle,
            color: 'from-orange-500/20',
            iconColor: 'text-orange-400',
          },
          {
            label: 'Taxa de Sucesso',
            value: missoes.length > 0 ? Math.round((missoesConcluidas.length / missoes.length) * 100) + '%' : '100%',
            icon: TrendingUp,
            color: 'from-[#c9a227]/20',
            iconColor: 'text-[#c9a227]',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} to-transparent bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-5`}
          >
            <stat.icon className={`w-6 h-6 ${stat.iconColor} mb-3`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[#6b7c95] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Missões Ativas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-[#1e3a5f]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-[#c9a227]" />
            <h2 className="text-lg font-semibold text-white">Missões Ativas</h2>
          </div>
          <Link
            href="/bsdsan/portal/missoes"
            className="text-sm text-[#c9a227] hover:underline flex items-center gap-1"
          >
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {[...missoesPendentes, ...missoesEmAndamento].length > 0 ? (
          <div className="divide-y divide-[#1e3a5f]/30">
            {[...missoesPendentes, ...missoesEmAndamento].slice(0, 3).map((missao) => (
              <Link
                key={missao.id}
                href={`/bsdsan/portal/missoes?id=${missao.id}`}
                className="block p-5 hover:bg-[#1e3a5f]/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                          missao.classificacao === 'urgente'
                            ? 'bg-red-500/20 text-red-400'
                            : missao.classificacao === 'prioritaria'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {missao.classificacao}
                      </span>
                      <span className="text-xs text-[#4a5568]">{missao.protocolo}</span>
                    </div>
                    <h3 className="text-white font-medium">{missao.titulo}</h3>
                    <p className="text-sm text-[#6b7c95] mt-1">{missao.sistema}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-[#6b7c95] text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>Prazo: {formatarData(missao.dataLimite)}</span>
                    </div>
                    <span
                      className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                        missao.status === 'em_andamento'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {missao.status === 'em_andamento' ? 'Em andamento' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-[#1e3a5f] mx-auto mb-4" />
            <p className="text-[#6b7c95]">Nenhuma missão ativa no momento</p>
            <p className="text-sm text-[#4a5568] mt-1">
              Novas missões serão atribuídas pela Diretoria
            </p>
          </div>
        )}
      </motion.div>

      {/* Comunicados Recentes */}
      {comunicados.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c9a227]" />
            Comunicados Recentes
          </h2>

          <div className="space-y-3">
            {comunicados.slice(0, 3).map((comunicado) => (
              <div
                key={comunicado.id}
                className={`p-4 rounded-lg border ${
                  !comunicado.lido
                    ? 'bg-[#c9a227]/5 border-[#c9a227]/30'
                    : 'bg-[#060a12] border-[#1e3a5f]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{comunicado.titulo}</p>
                    <p className="text-xs text-[#6b7c95] mt-1">{comunicado.mensagem}</p>
                  </div>
                  {!comunicado.lido && (
                    <span className="shrink-0 w-2 h-2 bg-[#c9a227] rounded-full" />
                  )}
                </div>
                <p className="text-[10px] text-[#4a5568] mt-2">
                  {formatarData(comunicado.dataEnvio)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Conquistas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#c9a227]" />
          Suas Conquistas
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { nome: 'Primeira Missão', descricao: 'Completou sua primeira missão', desbloqueado: missoesConcluidas.length > 0 },
            { nome: 'Caçadora de Bugs', descricao: 'Encontrou 5+ bugs', desbloqueado: totalOcorrencias >= 5 },
            { nome: 'Dedicação Total', descricao: 'Completou 10 missões', desbloqueado: missoesConcluidas.length >= 10 },
            { nome: 'Elite', descricao: 'Alcançou nível 5', desbloqueado: nivel >= 5 },
          ].map((conquista) => (
            <div
              key={conquista.nome}
              className={`p-4 rounded-lg border text-center ${
                conquista.desbloqueado
                  ? 'bg-[#c9a227]/10 border-[#c9a227]/30'
                  : 'bg-[#060a12] border-[#1e3a5f]/30 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  conquista.desbloqueado
                    ? 'bg-gradient-to-br from-[#c9a227] to-[#8b7355]'
                    : 'bg-[#1e3a5f]/30'
                }`}
              >
                <Award className={`w-6 h-6 ${conquista.desbloqueado ? 'text-[#0a0f1a]' : 'text-[#4a5568]'}`} />
              </div>
              <p className="text-sm font-medium text-white">{conquista.nome}</p>
              <p className="text-[10px] text-[#6b7c95] mt-1">{conquista.descricao}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
