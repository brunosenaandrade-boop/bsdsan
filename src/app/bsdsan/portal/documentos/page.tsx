'use client';

import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion } from 'framer-motion';
import { FileText, Download, Award, Shield, ClipboardList, Calendar } from 'lucide-react';

export default function DocumentosAnalistaPage() {
  const { analistaLogado, getMissoesAnalista } = useBSDSANStore();

  if (!analistaLogado) return null;

  const missoes = getMissoesAnalista(analistaLogado.id);

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
        <h1 className="text-2xl font-playfair font-bold text-white">Meus Documentos</h1>
        <p className="text-[#6b7c95]">Certificados e documentos oficiais</p>
      </div>

      {/* Certificado de Credenciamento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#c9a227]/10 to-transparent bg-[#0d1424] border border-[#c9a227]/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#c9a227]/20 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-7 h-7 text-[#c9a227]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Certificado de Credenciamento
              </h3>
              <p className="text-sm text-[#6b7c95] mb-3">
                Documento oficial que comprova seu credenciamento como Analista de Qualidade
                Nível {analistaLogado.nivel} na BSDSAN.
              </p>
              <div className="flex items-center gap-4 text-xs text-[#4a5568]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Emitido em: {analistaLogado.dataCredenciamento ? formatarData(analistaLogado.dataCredenciamento) : 'Pendente'}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Matrícula: {analistaLogado.matricula}
                </span>
              </div>
            </div>
          </div>
          <button
            disabled={!analistaLogado.dataCredenciamento}
            className="flex items-center gap-2 bg-[#c9a227] text-[#0a0f1a] px-4 py-2 rounded-lg font-medium hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </button>
        </div>
      </motion.div>

      {/* Termo de Compromisso */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Termo de Compromisso e Confidencialidade
              </h3>
              <p className="text-sm text-[#6b7c95] mb-3">
                Documento assinado digitalmente com os termos e condições do seu credenciamento.
              </p>
              <div className="flex items-center gap-4 text-xs text-[#4a5568]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Assinado em: {formatarData(analistaLogado.dataCadastro)}
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2a4a6f] transition-colors shrink-0">
            <Download className="w-4 h-4" />
            Baixar PDF
          </button>
        </div>
      </motion.div>

      {/* Ordens de Serviço */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden"
      >
        <div className="p-5 border-b border-[#1e3a5f]/30">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#c9a227]" />
            Ordens de Serviço
          </h2>
        </div>

        {missoes.length > 0 ? (
          <div className="divide-y divide-[#1e3a5f]/30">
            {missoes.map((missao) => (
              <div key={missao.id} className="p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#4a5568] font-mono">{missao.protocolo}</span>
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
                  <h3 className="text-white font-medium">{missao.titulo}</h3>
                  <p className="text-xs text-[#4a5568] mt-1">
                    Emitido em: {formatarData(missao.dataEmissao)}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-sm text-[#8ba3c7] hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <ClipboardList className="w-12 h-12 text-[#1e3a5f] mx-auto mb-4" />
            <p className="text-[#6b7c95]">Nenhuma ordem de serviço emitida</p>
          </div>
        )}
      </motion.div>

      {/* Info */}
      <div className="bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 rounded-lg p-4">
        <p className="text-sm text-[#8ba3c7]">
          Todos os documentos são gerados oficialmente pela BSDSAN e possuem validade
          para comprovação de suas atividades como Analista de Qualidade.
        </p>
      </div>
    </div>
  );
}
