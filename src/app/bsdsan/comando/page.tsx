'use client';

import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Plus,
  UserCheck,
  Bug,
} from 'lucide-react';

export default function ComandoDashboard() {
  const { analistas, missoes, getEstatisticas } = useBSDSANStore();

  const stats = getEstatisticas();

  const analistasPendentes = analistas.filter((a) => a.status === 'pendente');
  const missoesRecentes = [...missoes].sort(
    (a, b) => new Date(b.dataEmissao).getTime() - new Date(a.dataEmissao).getTime()
  ).slice(0, 5);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white">
            Comando Central
          </h1>
          <p className="text-[#6b7c95]">Painel de administração do BSDSAN</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/bsdsan/comando/missoes?nova=true"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-red-400 hover:to-red-500 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nova Missão
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Analistas Ativos',
            value: stats.analistasAtivos,
            total: stats.totalAnalistas,
            icon: Users,
            color: 'from-blue-500/20',
            iconColor: 'text-blue-400',
          },
          {
            label: 'Total de Missões',
            value: stats.totalMissoes,
            icon: ClipboardList,
            color: 'from-purple-500/20',
            iconColor: 'text-purple-400',
          },
          {
            label: 'Concluídas',
            value: stats.missoesConcluidas,
            icon: CheckCircle,
            color: 'from-emerald-500/20',
            iconColor: 'text-emerald-400',
          },
          {
            label: 'Bugs Reportados',
            value: stats.totalOcorrencias,
            icon: Bug,
            color: 'from-orange-500/20',
            iconColor: 'text-orange-400',
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
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              {stat.total !== undefined && (
                <span className="text-sm text-[#6b7c95]">/ {stat.total}</span>
              )}
            </div>
            <p className="text-xs text-[#6b7c95] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Analistas Pendentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
        >
          <div className="p-5 border-b border-[#1e3a5f]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">
                Aguardando Aprovação
              </h2>
              {analistasPendentes.length > 0 && (
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                  {analistasPendentes.length}
                </span>
              )}
            </div>
            <Link
              href="/bsdsan/comando/analistas"
              className="text-sm text-[#c9a227] hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {analistasPendentes.length > 0 ? (
            <div className="divide-y divide-[#1e3a5f]/30">
              {analistasPendentes.slice(0, 4).map((analista) => (
                <div
                  key={analista.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#0d1424] rounded-full flex items-center justify-center border border-[#1e3a5f]/50">
                      <span className="text-sm font-semibold text-[#c9a227]">
                        {analista.nome.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{analista.nome}</p>
                      <p className="text-xs text-[#6b7c95]">{analista.email}</p>
                    </div>
                  </div>
                  <Link
                    href={`/bsdsan/comando/analistas?id=${analista.id}`}
                    className="text-xs text-[#c9a227] hover:underline"
                  >
                    Analisar
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500/30 mx-auto mb-3" />
              <p className="text-[#6b7c95]">Nenhum cadastro pendente</p>
            </div>
          )}
        </motion.div>

        {/* Missões Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
        >
          <div className="p-5 border-b border-[#1e3a5f]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">
                Missões Recentes
              </h2>
            </div>
            <Link
              href="/bsdsan/comando/missoes"
              className="text-sm text-[#c9a227] hover:underline"
            >
              Ver todas
            </Link>
          </div>

          {missoesRecentes.length > 0 ? (
            <div className="divide-y divide-[#1e3a5f]/30">
              {missoesRecentes.map((missao) => (
                <div
                  key={missao.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
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
                    </div>
                    <p className="text-white font-medium truncate">{missao.titulo}</p>
                    <p className="text-xs text-[#6b7c95]">{missao.protocolo}</p>
                  </div>
                  <span className="text-xs text-[#4a5568] shrink-0 ml-3">
                    {formatarData(missao.dataEmissao)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Clock className="w-10 h-10 text-[#1e3a5f] mx-auto mb-3" />
              <p className="text-[#6b7c95]">Nenhuma missão criada ainda</p>
              <Link
                href="/bsdsan/comando/missoes?nova=true"
                className="inline-flex items-center gap-1 text-sm text-[#c9a227] hover:underline mt-2"
              >
                <Plus className="w-4 h-4" />
                Criar primeira missão
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Nova Missão', href: '/bsdsan/comando/missoes?nova=true', icon: ClipboardList, color: 'from-blue-500' },
            { label: 'Ver Analistas', href: '/bsdsan/comando/analistas', icon: Users, color: 'from-purple-500' },
            { label: 'Enviar Comunicado', href: '/bsdsan/comando/comunicados', icon: AlertTriangle, color: 'from-orange-500' },
            { label: 'Configurações', href: '/bsdsan/comando/configuracoes', icon: TrendingUp, color: 'from-emerald-500' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg hover:border-[#1e3a5f] transition-colors group"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${action.color} to-transparent rounded-lg flex items-center justify-center`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-[#8ba3c7] group-hover:text-white transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
