'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  User,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  PenTool,
} from 'lucide-react';
import { useBSDSANStore } from '@/lib/bsdsan/store';

interface FormData {
  // Etapa 1 - Dados Pessoais
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  // Etapa 2 - Informações Profissionais
  formacao: string;
  experiencia: string;
  motivacao: string;
  // Etapa 3 - Termos
  termosAceitos: boolean;
  codigoCondutaAceito: boolean;
  // Etapa 4 - Assinatura
  assinatura: string;
}

const etapas = [
  { numero: 1, titulo: 'Dados Pessoais', icone: User },
  { numero: 2, titulo: 'Informações Profissionais', icone: FileText },
  { numero: 3, titulo: 'Termos e Condições', icone: Shield },
  { numero: 4, titulo: 'Assinatura Digital', icone: PenTool },
];

export default function CredenciamentoPage() {
  const router = useRouter();
  const { cadastrarAnalista } = useBSDSANStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [etapaAtual, setEtapaAtual] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [codigoGerado, setCodigoGerado] = useState('');

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    formacao: '',
    experiencia: '',
    motivacao: '',
    termosAceitos: false,
    codigoCondutaAceito: false,
    assinatura: '',
  });

  const [erros, setErros] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Limpar erro do campo
    if (erros[name as keyof FormData]) {
      setErros((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validarEtapa = (): boolean => {
    const novosErros: Partial<Record<keyof FormData, string>> = {};

    if (etapaAtual === 1) {
      if (!formData.nome.trim()) novosErros.nome = 'Nome completo é obrigatório';
      if (!formData.email.trim()) novosErros.email = 'Email é obrigatório';
      if (!formData.cpf.trim()) novosErros.cpf = 'CPF é obrigatório';
      if (!formData.telefone.trim()) novosErros.telefone = 'Telefone é obrigatório';
    }

    if (etapaAtual === 2) {
      if (!formData.formacao.trim()) novosErros.formacao = 'Formação é obrigatória';
    }

    if (etapaAtual === 3) {
      if (!formData.termosAceitos) novosErros.termosAceitos = 'Você deve aceitar os termos';
      if (!formData.codigoCondutaAceito) novosErros.codigoCondutaAceito = 'Você deve aceitar o código de conduta';
    }

    if (etapaAtual === 4) {
      if (!formData.assinatura) novosErros.assinatura = 'Assinatura digital é obrigatória';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const proximaEtapa = () => {
    if (validarEtapa()) {
      setEtapaAtual((prev) => Math.min(prev + 1, 4));
    }
  };

  const etapaAnterior = () => {
    setEtapaAtual((prev) => Math.max(prev - 1, 1));
  };

  // Funções do canvas para assinatura
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c9a227';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setFormData((prev) => ({ ...prev, assinatura: canvas.toDataURL() }));
    }
  };

  const limparAssinatura = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFormData((prev) => ({ ...prev, assinatura: '' }));
  };

  const handleSubmit = async () => {
    if (!validarEtapa()) return;

    setEnviando(true);

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Cadastrar analista
    const novoAnalista = cadastrarAnalista({
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      telefone: formData.telefone,
      endereco: formData.endereco,
      formacao: formData.formacao,
      experiencia: formData.experiencia,
      assinaturaDigital: formData.assinatura,
      termosAceitos: true,
    });

    setCodigoGerado(novoAnalista.codigo);
    setEnviando(false);
    setConcluido(true);
  };

  // Tela de conclusão
  if (concluido) {
    return (
      <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-10 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-playfair font-bold text-white mb-4">
            Cadastro Enviado com Sucesso
          </h1>

          <p className="text-[#8ba3c7] mb-8">
            Seu pedido de credenciamento foi registrado e será analisado pela
            Diretoria de Certificação. Você receberá uma notificação quando
            seu acesso for liberado.
          </p>

          <div className="bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg p-6 mb-8">
            <p className="text-xs text-[#6b7c95] uppercase tracking-wider mb-2">
              Seu Código de Acesso
            </p>
            <p className="text-2xl font-mono font-bold text-[#c9a227] tracking-wider">
              {codigoGerado}
            </p>
            <p className="text-xs text-[#4a5568] mt-3">
              Guarde este código. Ele será necessário para acessar o portal
              após a aprovação do seu cadastro.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-yellow-400 font-medium mb-1">
                  Aguardando Aprovação
                </p>
                <p className="text-xs text-yellow-400/70">
                  O processo de análise pode levar até 48 horas úteis.
                  Você será notificado por email quando seu credenciamento
                  for aprovado.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#4a5568] mb-6">
            Protocolo de Registro: BSDSAN/CR/{new Date().getFullYear()}/{Math.floor(Math.random() * 9000) + 1000}
          </p>

          <Link
            href="/bsdsan"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-8 py-4 rounded font-semibold hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
          >
            Voltar ao Site
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1a] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/bsdsan" className="inline-flex items-center gap-2 text-[#6b7c95] hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>

          <div className="w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-[#0a0f1a]" />
          </div>

          <h1 className="text-3xl font-playfair font-bold text-white mb-2">
            Solicitação de Credenciamento
          </h1>
          <p className="text-[#6b7c95]">
            Preencha o formulário abaixo para solicitar seu credenciamento como Analista de Qualidade.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {etapas.map((etapa, index) => (
              <div key={etapa.numero} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      etapaAtual > etapa.numero
                        ? 'bg-emerald-500 border-emerald-500'
                        : etapaAtual === etapa.numero
                        ? 'bg-[#c9a227] border-[#c9a227]'
                        : 'bg-transparent border-[#1e3a5f]'
                    }`}
                  >
                    {etapaAtual > etapa.numero ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <etapa.icone
                        className={`w-5 h-5 ${
                          etapaAtual === etapa.numero ? 'text-[#0a0f1a]' : 'text-[#4a5568]'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 hidden md:block ${
                      etapaAtual >= etapa.numero ? 'text-white' : 'text-[#4a5568]'
                    }`}
                  >
                    {etapa.titulo}
                  </span>
                </div>
                {index < etapas.length - 1 && (
                  <div
                    className={`w-full h-0.5 mx-2 ${
                      etapaAtual > etapa.numero ? 'bg-emerald-500' : 'bg-[#1e3a5f]'
                    }`}
                    style={{ minWidth: '40px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            {/* Etapa 1 - Dados Pessoais */}
            {etapaAtual === 1 && (
              <motion.div
                key="etapa1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Dados Pessoais</h2>
                  <p className="text-sm text-[#6b7c95]">
                    Informações básicas para identificação.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      className={`w-full bg-[#060a12] border rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors ${
                        erros.nome ? 'border-red-500' : 'border-[#1e3a5f]/50'
                      }`}
                    />
                    {erros.nome && <p className="text-xs text-red-400 mt-1">{erros.nome}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={`w-full bg-[#060a12] border rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors ${
                        erros.email ? 'border-red-500' : 'border-[#1e3a5f]/50'
                      }`}
                    />
                    {erros.email && <p className="text-xs text-red-400 mt-1">{erros.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      className={`w-full bg-[#060a12] border rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors ${
                        erros.cpf ? 'border-red-500' : 'border-[#1e3a5f]/50'
                      }`}
                    />
                    {erros.cpf && <p className="text-xs text-red-400 mt-1">{erros.cpf}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className={`w-full bg-[#060a12] border rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors ${
                        erros.telefone ? 'border-red-500' : 'border-[#1e3a5f]/50'
                      }`}
                    />
                    {erros.telefone && <p className="text-xs text-red-400 mt-1">{erros.telefone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      placeholder="Cidade, Estado"
                      className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 2 - Informações Profissionais */}
            {etapaAtual === 2 && (
              <motion.div
                key="etapa2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Informações Profissionais</h2>
                  <p className="text-sm text-[#6b7c95]">
                    Conte-nos sobre sua formação e experiência.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Formação Acadêmica *
                    </label>
                    <select
                      name="formacao"
                      value={formData.formacao}
                      onChange={handleChange}
                      className={`w-full bg-[#060a12] border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c9a227]/50 transition-colors ${
                        erros.formacao ? 'border-red-500' : 'border-[#1e3a5f]/50'
                      }`}
                    >
                      <option value="">Selecione...</option>
                      <option value="ensino_medio">Ensino Médio</option>
                      <option value="tecnico">Curso Técnico</option>
                      <option value="graduacao">Graduação</option>
                      <option value="pos_graduacao">Pós-Graduação</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutorado">Doutorado</option>
                      <option value="outro">Outro</option>
                    </select>
                    {erros.formacao && <p className="text-xs text-red-400 mt-1">{erros.formacao}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Experiência Profissional
                    </label>
                    <textarea
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                      placeholder="Descreva brevemente sua experiência profissional..."
                      rows={4}
                      className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8ba3c7] mb-2">
                      Por que deseja fazer parte do programa?
                    </label>
                    <textarea
                      name="motivacao"
                      value={formData.motivacao}
                      onChange={handleChange}
                      placeholder="Conte-nos sua motivação para integrar o programa de certificação..."
                      rows={4}
                      className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a227]/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 3 - Termos */}
            {etapaAtual === 3 && (
              <motion.div
                key="etapa3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Termos e Condições</h2>
                  <p className="text-sm text-[#6b7c95]">
                    Leia atentamente e aceite os termos para prosseguir.
                  </p>
                </div>

                {/* Termo de Compromisso */}
                <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Termo de Compromisso e Confidencialidade
                  </h3>
                  <div className="h-48 overflow-y-auto text-sm text-[#8ba3c7] leading-relaxed pr-4 space-y-4 scrollbar-thin">
                    <p>
                      <strong className="text-white">CLÁUSULA PRIMEIRA - DO OBJETO</strong><br />
                      O presente Termo tem por objeto estabelecer as condições de participação
                      no Programa de Analistas de Qualidade da BSDSAN - BsDeveloper Softwares
                      de Alto Nível.
                    </p>
                    <p>
                      <strong className="text-white">CLÁUSULA SEGUNDA - DA CONFIDENCIALIDADE</strong><br />
                      O ANALISTA compromete-se a manter em absoluto sigilo todas as informações,
                      dados, documentos, especificações técnicas e quaisquer outros materiais
                      aos quais tiver acesso durante a execução de suas atividades, não podendo
                      divulgá-los a terceiros sem prévia e expressa autorização por escrito da BSDSAN.
                    </p>
                    <p>
                      <strong className="text-white">CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES</strong><br />
                      O ANALISTA se obriga a: (i) executar suas atividades com zelo e dedicação;
                      (ii) reportar quaisquer irregularidades encontradas; (iii) seguir os
                      protocolos e metodologias estabelecidos pela BSDSAN; (iv) manter
                      atualizados seus dados cadastrais.
                    </p>
                    <p>
                      <strong className="text-white">CLÁUSULA QUARTA - DA PROPRIEDADE INTELECTUAL</strong><br />
                      Todos os relatórios, análises e documentos produzidos pelo ANALISTA
                      no exercício de suas funções são de propriedade exclusiva da BSDSAN.
                    </p>
                    <p>
                      <strong className="text-white">CLÁUSULA QUINTA - DAS PENALIDADES</strong><br />
                      O descumprimento de qualquer cláusula deste Termo poderá resultar em
                      suspensão ou cancelamento do credenciamento, sem prejuízo de outras
                      medidas cabíveis.
                    </p>
                    <p>
                      <strong className="text-white">CLÁUSULA SEXTA - DA VIGÊNCIA</strong><br />
                      O presente Termo entra em vigor na data de aprovação do credenciamento
                      e permanece válido por tempo indeterminado, podendo ser rescindido
                      por qualquer das partes mediante notificação prévia de 30 dias.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1e3a5f]/30">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="termosAceitos"
                        checked={formData.termosAceitos}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-[#1e3a5f] bg-[#060a12] text-[#c9a227] focus:ring-[#c9a227] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#8ba3c7]">
                        Li e aceito integralmente o <strong className="text-white">Termo de Compromisso
                        e Confidencialidade</strong> acima descrito.
                      </span>
                    </label>
                    {erros.termosAceitos && (
                      <p className="text-xs text-red-400 mt-2 ml-8">{erros.termosAceitos}</p>
                    )}
                  </div>
                </div>

                {/* Código de Conduta */}
                <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Código de Ética e Conduta
                  </h3>
                  <div className="h-32 overflow-y-auto text-sm text-[#8ba3c7] leading-relaxed pr-4 space-y-3">
                    <p>
                      Como Analista de Qualidade credenciado pela BSDSAN, comprometo-me a:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Agir com honestidade, integridade e profissionalismo em todas as atividades;</li>
                      <li>Executar minhas atribuições com máxima diligência e atenção aos detalhes;</li>
                      <li>Reportar fielmente todas as ocorrências identificadas;</li>
                      <li>Não divulgar informações confidenciais a terceiros;</li>
                      <li>Respeitar os prazos e protocolos estabelecidos;</li>
                      <li>Zelar pela reputação e imagem da instituição.</li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1e3a5f]/30">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="codigoCondutaAceito"
                        checked={formData.codigoCondutaAceito}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-[#1e3a5f] bg-[#060a12] text-[#c9a227] focus:ring-[#c9a227] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#8ba3c7]">
                        Declaro que li, compreendi e me comprometo a seguir o{' '}
                        <strong className="text-white">Código de Ética e Conduta</strong> da BSDSAN.
                      </span>
                    </label>
                    {erros.codigoCondutaAceito && (
                      <p className="text-xs text-red-400 mt-2 ml-8">{erros.codigoCondutaAceito}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 4 - Assinatura Digital */}
            {etapaAtual === 4 && (
              <motion.div
                key="etapa4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Assinatura Digital</h2>
                  <p className="text-sm text-[#6b7c95]">
                    Utilize o campo abaixo para registrar sua assinatura digital.
                  </p>
                </div>

                <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-6">
                  <div className="mb-4">
                    <p className="text-sm text-[#8ba3c7] mb-2">
                      Assine no campo abaixo usando o mouse ou toque:
                    </p>
                    <div className={`relative border-2 rounded-lg overflow-hidden ${
                      erros.assinatura ? 'border-red-500' : 'border-[#1e3a5f]'
                    }`}>
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={200}
                        className="w-full h-48 bg-[#0a0f1a] cursor-crosshair touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                      <div className="absolute bottom-2 left-2 right-2 border-b border-dashed border-[#1e3a5f]/50" />
                    </div>
                    {erros.assinatura && (
                      <p className="text-xs text-red-400 mt-2">{erros.assinatura}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={limparAssinatura}
                    className="text-sm text-[#6b7c95] hover:text-white transition-colors"
                  >
                    Limpar assinatura
                  </button>
                </div>

                <div className="bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 rounded-lg p-4">
                  <p className="text-sm text-[#8ba3c7]">
                    <strong className="text-white">Importante:</strong> Ao assinar, você confirma
                    que todas as informações fornecidas são verdadeiras e concorda com todos
                    os termos e condições apresentados anteriormente.
                  </p>
                </div>

                {/* Resumo */}
                <div className="bg-[#060a12] border border-[#1e3a5f]/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Resumo do Cadastro</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#6b7c95]">Nome:</p>
                      <p className="text-white">{formData.nome || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7c95]">Email:</p>
                      <p className="text-white">{formData.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7c95]">CPF:</p>
                      <p className="text-white">{formData.cpf || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7c95]">Telefone:</p>
                      <p className="text-white">{formData.telefone || '-'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-[#1e3a5f]/30">
            {etapaAtual > 1 ? (
              <button
                type="button"
                onClick={etapaAnterior}
                className="flex items-center gap-2 text-[#8ba3c7] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
            ) : (
              <div />
            )}

            {etapaAtual < 4 ? (
              <button
                type="button"
                onClick={proximaEtapa}
                className="flex items-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-6 py-3 rounded font-semibold hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
              >
                Próximo
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={enviando}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-50"
              >
                {enviando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Finalizar Cadastro
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-[#4a5568] mt-8">
          BSDSAN - BsDeveloper Softwares de Alto Nível<br />
          Programa de Certificação em Qualidade de Software
        </p>
      </div>
    </main>
  );
}
