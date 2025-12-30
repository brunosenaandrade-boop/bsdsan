'use client';

import { useState } from 'react';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Users,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Loader2,
  X,
} from 'lucide-react';

export default function ComunicadosPage() {
  const { analistas, comunicados, enviarComunicado } = useBSDSANStore();
  const [modalNovo, setModalNovo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [novoComunicado, setNovoComunicado] = useState({
    titulo: '',
    mensagem: '',
    tipo: 'informativo' as 'informativo' | 'importante' | 'urgente',
    destinatarioId: '', // vazio = todos
  });

  const analistasAtivos = analistas.filter((a) => a.status === 'ativo');

  const handleEnviar = async () => {
    if (!novoComunicado.titulo || !novoComunicado.mensagem) return;

    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1500));

    enviarComunicado({
      titulo: novoComunicado.titulo,
      mensagem: novoComunicado.mensagem,
      tipo: novoComunicado.tipo,
      destinatarioId: novoComunicado.destinatarioId || undefined,
    });

    setEnviando(false);
    setSucesso(true);

    setTimeout(() => {
      setSucesso(false);
      setModalNovo(false);
      setNovoComunicado({
        titulo: '',
        mensagem: '',
        tipo: 'informativo',
        destinatarioId: '',
      });
    }, 2000);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDestinatario = (id?: string) => {
    if (!id) return 'Todos os analistas';
    const analista = analistas.find((a) => a.id === id);
    return analista?.nome || 'Desconhecido';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white">Comunicados</h1>
          <p className="text-[#6b7c95]">Envie mensagens para os analistas</p>
        </div>

        <button
          onClick={() => setModalNovo(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-red-400 hover:to-red-500 transition-all"
        >
          <Send className="w-5 h-5" />
          Novo Comunicado
        </button>
      </div>

      {/* Lista de Comunicados */}
      <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#1e3a5f]/30">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#c9a227]" />
            Histórico de Comunicados
          </h2>
        </div>

        {comunicados.length > 0 ? (
          <div className="divide-y divide-[#1e3a5f]/30">
            {[...comunicados].reverse().map((com) => (
              <div key={com.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          com.tipo === 'urgente'
                            ? 'bg-red-500/20 text-red-400'
                            : com.tipo === 'importante'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {com.tipo}
                      </span>
                      <span className="text-xs text-[#4a5568]">
                        Para: {getDestinatario(com.destinatarioId)}
                      </span>
                    </div>
                    <h3 className="text-white font-medium">{com.titulo}</h3>
                    <p className="text-sm text-[#6b7c95] mt-1">{com.mensagem}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#4a5568]">{formatarData(com.dataEnvio)}</p>
                    <div className="flex items-center gap-1 mt-2 justify-end">
                      {com.lido ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Lido</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-yellow-400" />
                          <span className="text-[10px] text-yellow-400">Não lido</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-[#1e3a5f] mx-auto mb-4" />
            <p className="text-[#6b7c95]">Nenhum comunicado enviado ainda</p>
            <button
              onClick={() => setModalNovo(true)}
              className="inline-flex items-center gap-1 text-sm text-[#c9a227] hover:underline mt-3"
            >
              <Send className="w-4 h-4" />
              Enviar primeiro comunicado
            </button>
          </div>
        )}
      </div>

      {/* Modal Novo Comunicado */}
      <AnimatePresence>
        {modalNovo && (
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
              {sucesso ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Comunicado Enviado!
                  </h3>
                  <p className="text-[#6b7c95]">
                    O destinatário receberá a mensagem em seu portal.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-[#1e3a5f]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Novo Comunicado</h3>
                        <p className="text-xs text-[#6b7c95]">Envie uma mensagem</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalNovo(false)}
                      className="text-[#6b7c95] hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Destinatário */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Destinatário
                      </label>
                      <select
                        value={novoComunicado.destinatarioId}
                        onChange={(e) =>
                          setNovoComunicado({ ...novoComunicado, destinatarioId: e.target.value })
                        }
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="">Todos os analistas</option>
                        {analistasAtivos.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tipo */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Tipo de Comunicado
                      </label>
                      <div className="flex gap-3">
                        {[
                          { value: 'informativo', label: 'Informativo', icon: Info, color: 'blue' },
                          { value: 'importante', label: 'Importante', icon: AlertTriangle, color: 'orange' },
                          { value: 'urgente', label: 'Urgente', icon: AlertTriangle, color: 'red' },
                        ].map((tipo) => (
                          <button
                            key={tipo.value}
                            type="button"
                            onClick={() =>
                              setNovoComunicado({ ...novoComunicado, tipo: tipo.value as any })
                            }
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
                              novoComunicado.tipo === tipo.value
                                ? tipo.color === 'blue'
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : tipo.color === 'orange'
                                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                  : 'bg-red-500/20 border-red-500/50 text-red-400'
                                : 'bg-[#060a12] border-[#1e3a5f]/50 text-[#6b7c95]'
                            }`}
                          >
                            <tipo.icon className="w-4 h-4" />
                            <span className="text-sm">{tipo.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Título */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={novoComunicado.titulo}
                        onChange={(e) =>
                          setNovoComunicado({ ...novoComunicado, titulo: e.target.value })
                        }
                        placeholder="Assunto do comunicado"
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568]"
                      />
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block text-sm text-[#8ba3c7] mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        value={novoComunicado.mensagem}
                        onChange={(e) =>
                          setNovoComunicado({ ...novoComunicado, mensagem: e.target.value })
                        }
                        placeholder="Digite sua mensagem..."
                        rows={4}
                        className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] resize-none"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-[#1e3a5f]/30 flex gap-3">
                    <button
                      onClick={() => setModalNovo(false)}
                      className="flex-1 py-3 border border-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#1e3a5f]/20"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleEnviar}
                      disabled={enviando || !novoComunicado.titulo || !novoComunicado.mensagem}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {enviando ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar Comunicado
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
