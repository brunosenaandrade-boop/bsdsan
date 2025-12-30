'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, AlertCircle, CheckCircle, Loader2, ArrowLeft, UserPlus } from 'lucide-react';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import BSDSANHeader from '@/components/bsdsan/Header';
import BSDSANFooter from '@/components/bsdsan/Footer';

export default function AcessoPage() {
  const router = useRouter();
  const { loginAnalista, analistas } = useBSDSANStore();

  const [codigo, setCodigo] = useState('');
  const [status, setStatus] = useState<'idle' | 'verificando' | 'sucesso' | 'erro' | 'pendente'>('idle');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setStatus('erro');
      setMensagemErro('Por favor, insira seu código de acesso.');
      return;
    }

    setStatus('verificando');

    // Simular verificação
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Verificar se o analista existe
    const analista = analistas.find((a) => a.codigo === codigo.toUpperCase());

    if (!analista) {
      setStatus('erro');
      setMensagemErro('Código de acesso inválido. Verifique se digitou corretamente.');
      return;
    }

    if (analista.status === 'pendente') {
      setStatus('pendente');
      return;
    }

    if (analista.status === 'inativo') {
      setStatus('erro');
      setMensagemErro('Seu credenciamento foi suspenso. Entre em contato com a administração.');
      return;
    }

    // Login bem-sucedido
    const resultado = loginAnalista(codigo.toUpperCase());
    if (resultado) {
      setStatus('sucesso');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/bsdsan/portal');
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <BSDSANHeader />

      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1e3a5f]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-8 md:p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-[#0a0f1a]" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-white mb-2">
                Área Restrita
              </h1>
              <p className="text-sm text-[#6b7c95]">
                Acesso exclusivo para analistas credenciados
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-[#8ba3c7] mb-2"
                >
                  Código de Acesso
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a5568]" />
                  <input
                    type="text"
                    id="codigo"
                    value={codigo}
                    onChange={(e) => {
                      setCodigo(e.target.value.toUpperCase());
                      setStatus('idle');
                    }}
                    placeholder="BSDSAN-XXXXXXXX"
                    disabled={status === 'verificando' || status === 'sucesso'}
                    className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg pl-12 pr-4 py-4 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors font-mono tracking-wider disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === 'erro' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{mensagemErro}</p>
                  </motion.div>
                )}

                {status === 'pendente' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
                  >
                    <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-400 font-medium mb-1">
                        Cadastro em análise
                      </p>
                      <p className="text-xs text-yellow-400/70">
                        Seu credenciamento está sendo processado pela Diretoria.
                        Você receberá uma notificação quando for aprovado.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'sucesso' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-emerald-400 font-medium mb-1">
                        Credenciais validadas
                      </p>
                      <p className="text-xs text-emerald-400/70">
                        Redirecionando para o Portal do Analista...
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'verificando' || status === 'sucesso'}
                className="w-full bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] py-4 rounded-lg font-semibold hover:from-[#d4af37] hover:to-[#b8960c] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'verificando' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verificando credenciais...
                  </>
                ) : status === 'sucesso' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Acesso autorizado
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Verificar Acesso
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1e3a5f]/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0d1424] px-4 text-xs text-[#4a5568] uppercase tracking-wider">
                  Novo por aqui?
                </span>
              </div>
            </div>

            {/* Credenciamento Link */}
            <Link
              href="/bsdsan/credenciamento"
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#1e3a5f] text-[#8ba3c7] py-4 rounded-lg font-medium hover:bg-[#1e3a5f]/20 hover:text-white transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Solicitar Credenciamento
            </Link>

            {/* Help Text */}
            <p className="text-center text-xs text-[#4a5568] mt-6">
              Se você recebeu um convite da BSDSAN, utilize o código
              <br />
              fornecido na carta de convocação.
            </p>
          </motion.div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link
              href="/bsdsan"
              className="inline-flex items-center gap-2 text-sm text-[#6b7c95] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao site
            </Link>
          </div>
        </div>
      </section>

      <BSDSANFooter />
    </main>
  );
}
