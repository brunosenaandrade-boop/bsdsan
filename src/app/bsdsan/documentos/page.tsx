'use client';

import { useSearchParams } from 'next/navigation';
import { useBSDSANStore } from '@/lib/bsdsan/store';
import { FileText, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DocumentosPage() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo');
  const id = searchParams.get('id');

  const { analistas, missoes } = useBSDSANStore();

  const analista = analistas.find((a) => a.id === id);
  const missao = missoes.find((m) => m.id === id);

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  // Carta de Convocação
  if (tipo === 'convocacao' && analista) {
    return (
      <div className="min-h-screen bg-white">
        {/* Botões de ação (não aparecem na impressão) */}
        <div className="print:hidden fixed top-4 right-4 flex gap-2">
          <Link
            href="/bsdsan/comando/analistas"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>

        {/* Documento */}
        <div className="max-w-[21cm] mx-auto p-[2cm] min-h-[29.7cm] font-serif text-black">
          {/* Cabeçalho */}
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <h1 className="text-2xl font-bold tracking-wider mb-1">BSDSAN</h1>
            <p className="text-sm tracking-widest text-gray-600">
              BSDEVELOPER SOFTWARES DE ALTO NÍVEL
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Programa de Certificação em Qualidade de Software
            </p>
          </div>

          {/* Protocolo */}
          <div className="text-right text-sm text-gray-600 mb-8">
            <p>Protocolo nº BSDSAN/CV/{new Date().getFullYear()}/{Math.floor(Math.random() * 9000) + 1000}</p>
            <p>Tubarão, SC, {dataAtual}</p>
          </div>

          {/* Destinatário */}
          <div className="mb-8">
            <p className="font-semibold">À Senhora</p>
            <p className="text-lg font-bold">{analista.nome}</p>
          </div>

          {/* Assunto */}
          <div className="mb-8">
            <p className="font-semibold">
              ASSUNTO: Convocação para o Programa de Analistas de Qualidade
            </p>
          </div>

          {/* Corpo */}
          <div className="space-y-4 text-justify leading-relaxed">
            <p>Prezada Senhora,</p>

            <p>
              Após análise criteriosa de seu perfil profissional, temos a honra de comunicar
              que Vossa Senhoria foi <strong>SELECIONADA</strong> para integrar o Programa
              de Analistas de Qualidade de Software, instituído pela BSDSAN - BsDeveloper
              Softwares de Alto Nível.
            </p>

            <p>
              O referido programa visa assegurar a excelência dos sistemas digitais
              desenvolvidos, contando apenas com profissionais de comprovada capacidade
              analítica e compromisso com a qualidade.
            </p>

            <p>
              Sua participação é considerada de <strong>ALTA RELEVÂNCIA</strong> para o
              desenvolvimento tecnológico e sucesso dos projetos sob nossa certificação.
            </p>

            <p>
              Solicitamos que Vossa Senhoria acesse o Portal de Credenciamento no endereço
              eletrônico abaixo para efetuar seu cadastro formal:
            </p>

            <div className="bg-gray-100 p-4 rounded text-center my-6">
              <p className="text-sm text-gray-600 mb-2">Portal de Acesso:</p>
              <p className="font-mono font-bold">bsdsan.bsdeveloper.com.br/acesso</p>
            </div>

            <div className="bg-gray-100 p-4 rounded text-center my-6">
              <p className="text-sm text-gray-600 mb-2">Código de Acesso Pessoal:</p>
              <p className="font-mono font-bold text-xl tracking-widest">{analista.codigo}</p>
            </div>

            <p>
              Este código é pessoal e intransferível. Guarde-o em local seguro, pois será
              necessário para todos os acessos ao sistema.
            </p>

            <p>
              Colocamo-nos à disposição para quaisquer esclarecimentos que se façam necessários.
            </p>
          </div>

          {/* Despedida */}
          <div className="mt-12">
            <p>Atenciosamente,</p>

            <div className="mt-16">
              <div className="border-t border-black w-64 pt-2">
                <p className="font-bold">Bruno Sena</p>
                <p className="text-sm">Diretor-Presidente</p>
                <p className="text-sm text-gray-600">BSDSAN - BsDeveloper Softwares de Alto Nível</p>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="absolute bottom-[2cm] left-[2cm] right-[2cm] text-center text-xs text-gray-400 border-t pt-4">
            <p>BSDSAN - BsDeveloper Softwares de Alto Nível</p>
            <p>contato@bsdeveloper.com.br | bsdsan.bsdeveloper.com.br</p>
          </div>
        </div>
      </div>
    );
  }

  // Ordem de Serviço
  if (tipo === 'ordem' && missao) {
    const analistaMissao = analistas.find((a) => a.id === missao.analistaId);

    return (
      <div className="min-h-screen bg-white">
        {/* Botões de ação */}
        <div className="print:hidden fixed top-4 right-4 flex gap-2">
          <Link
            href="/bsdsan/comando/missoes"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>

        {/* Documento */}
        <div className="max-w-[21cm] mx-auto p-[1.5cm] min-h-[29.7cm] font-serif text-black">
          {/* Header com borda dupla */}
          <div className="border-4 border-double border-gray-800 p-4 mb-6">
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-wider">
                BSDSAN - BSDEVELOPER SOFTWARES DE ALTO NÍVEL
              </h1>
              <h2 className="text-lg font-bold mt-2 tracking-widest">
                ORDEM DE SERVIÇO Nº {missao.protocolo}
              </h2>
            </div>
          </div>

          {/* Classificação */}
          <div className="flex justify-between items-center mb-6">
            <div className={`px-4 py-2 border-2 ${
              missao.classificacao === 'urgente'
                ? 'border-red-600 text-red-600'
                : missao.classificacao === 'prioritaria'
                ? 'border-orange-600 text-orange-600'
                : 'border-gray-600 text-gray-600'
            } font-bold uppercase`}>
              {missao.classificacao === 'urgente' && '█ URGENTE █'}
              {missao.classificacao === 'prioritaria' && '▓ PRIORITÁRIA ▓'}
              {missao.classificacao === 'normal' && 'NORMAL'}
            </div>
            <div className="text-right text-sm">
              <p>Data de Emissão: {new Date(missao.dataEmissao).toLocaleDateString('pt-BR')}</p>
              <p className="font-bold">Prazo: {new Date(missao.dataLimite).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          {/* Destinatário */}
          <div className="border border-gray-400 p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 uppercase">Destinatária:</p>
                <p className="font-bold">{analistaMissao?.nome || 'N/A'}</p>
                <p className="text-sm">Analista de Qualidade - Nível {analistaMissao?.nivel || 'I'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Matrícula:</p>
                <p className="font-mono">{analistaMissao?.matricula || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Sistema */}
          <div className="border border-gray-400 p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 uppercase">Sistema:</p>
                <p className="font-bold">{missao.sistema || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase">Versão:</p>
                <p className="font-mono">{missao.versao || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <h3 className="font-bold border-b-2 border-gray-800 pb-1 mb-3 uppercase">
              Descrição da Atribuição
            </h3>
            <p className="text-justify leading-relaxed">{missao.descricao}</p>
          </div>

          {/* Instruções */}
          {missao.instrucoes && missao.instrucoes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold border-b-2 border-gray-800 pb-1 mb-3 uppercase">
                Instruções
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                {missao.instrucoes.map((inst, i) => (
                  <li key={i} className="leading-relaxed">{inst}</li>
                ))}
              </ol>
            </div>
          )}

          {/* URL */}
          {missao.urlSistema && (
            <div className="bg-gray-100 p-3 mb-6 text-center">
              <p className="text-xs text-gray-600 uppercase mb-1">Endereço do Sistema:</p>
              <p className="font-mono">{missao.urlSistema}</p>
            </div>
          )}

          {/* Observações */}
          <div className="border-t-2 border-gray-800 pt-4 mt-8">
            <p className="text-sm italic">
              Sua contribuição é fundamental para garantir a excelência dos sistemas digitais.
              O Instituto conta com seu comprometimento e dedicação.
            </p>
          </div>

          {/* Assinatura */}
          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <div className="border-t border-black w-48 pt-2">
                <p className="font-bold">Bruno Sena</p>
                <p className="text-sm">Diretor de Operações</p>
              </div>
              <div className="mt-4 border-2 border-gray-400 w-24 h-24 mx-auto flex items-center justify-center">
                <span className="text-xs text-gray-400">SELO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Certificado de Credenciamento
  if (tipo === 'certificado' && analista && analista.status === 'ativo') {
    return (
      <div className="min-h-screen bg-white">
        {/* Botões de ação */}
        <div className="print:hidden fixed top-4 right-4 flex gap-2">
          <Link
            href="/bsdsan/comando/analistas"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>

        {/* Certificado - Paisagem */}
        <div className="max-w-[29.7cm] mx-auto p-[2cm] min-h-[21cm] font-serif text-black relative">
          {/* Bordas decorativas */}
          <div className="absolute inset-[1cm] border-4 border-double border-amber-600" />
          <div className="absolute inset-[1.3cm] border border-amber-400" />

          {/* Conteúdo */}
          <div className="relative z-10 text-center pt-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-amber-700 tracking-widest mb-2">
                CERTIFICADO
              </h1>
              <p className="text-lg tracking-wider text-gray-600">
                de Credenciamento Oficial
              </p>
            </div>

            {/* Brasão/Logo */}
            <div className="w-24 h-24 mx-auto mb-8 border-4 border-amber-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-700">BS</span>
            </div>

            {/* Texto principal */}
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg mb-4">
                A <strong>BSDSAN - BsDeveloper Softwares de Alto Nível</strong>
              </p>
              <p className="text-lg mb-6">certifica que</p>
              <p className="text-3xl font-bold text-amber-800 border-b-2 border-amber-600 pb-2 mb-6">
                {analista.nome}
              </p>
              <p className="text-lg leading-relaxed">
                concluiu com êxito o processo de credenciamento e está oficialmente
                habilitada como <strong>Analista de Qualidade - Nível {analista.nivel}</strong>,
                podendo exercer suas atribuições conforme as normas e protocolos
                estabelecidos por esta instituição.
              </p>
            </div>

            {/* Dados */}
            <div className="flex justify-center gap-12 mb-8 text-sm">
              <div>
                <p className="text-gray-500">Matrícula</p>
                <p className="font-mono font-bold">{analista.matricula}</p>
              </div>
              <div>
                <p className="text-gray-500">Data de Credenciamento</p>
                <p className="font-bold">
                  {new Date(analista.dataCredenciamento || '').toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Válido até</p>
                <p className="font-bold">31 de dezembro de {new Date().getFullYear() + 1}</p>
              </div>
            </div>

            {/* Assinaturas */}
            <div className="flex justify-around mt-16">
              <div className="text-center">
                <div className="border-t-2 border-gray-800 w-48 pt-2">
                  <p className="font-bold">Bruno Sena</p>
                  <p className="text-sm text-gray-600">Diretor-Presidente</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-gray-800 w-48 pt-2">
                  <p className="font-bold">{analista.nome}</p>
                  <p className="text-sm text-gray-600">Analista Credenciada</p>
                </div>
              </div>
            </div>

            {/* Código de verificação */}
            <div className="absolute bottom-[1.5cm] left-1/2 -translate-x-1/2 text-xs text-gray-400">
              <p>Código de Verificação: {analista.codigo}</p>
              <p>Verifique a autenticidade em bsdsan.bsdeveloper.com.br/verificar</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Página de seleção de documentos
  return (
    <div className="min-h-screen bg-[#0a0f1a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/bsdsan/comando"
            className="inline-flex items-center gap-2 text-[#6b7c95] hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Comando
          </Link>
          <h1 className="text-2xl font-bold text-white">Documentos para Impressão</h1>
          <p className="text-[#6b7c95]">Selecione um documento para gerar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Carta de Convocação */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <FileText className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Carta de Convocação</h3>
            <p className="text-sm text-[#6b7c95] mb-4">
              Documento formal convidando o analista para o programa.
            </p>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = `/bsdsan/documentos?tipo=convocacao&id=${e.target.value}`;
                }
              }}
              className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Selecione um analista...</option>
              {analistas.map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>

          {/* Ordem de Serviço */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <FileText className="w-10 h-10 text-orange-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Ordem de Serviço</h3>
            <p className="text-sm text-[#6b7c95] mb-4">
              Documento formal com detalhes da missão atribuída.
            </p>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = `/bsdsan/documentos?tipo=ordem&id=${e.target.value}`;
                }
              }}
              className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Selecione uma missão...</option>
              {missoes.map((m) => (
                <option key={m.id} value={m.id}>{m.titulo} ({m.protocolo})</option>
              ))}
            </select>
          </div>

          {/* Certificado */}
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-xl p-6">
            <FileText className="w-10 h-10 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Certificado</h3>
            <p className="text-sm text-[#6b7c95] mb-4">
              Certificado oficial de credenciamento.
            </p>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = `/bsdsan/documentos?tipo=certificado&id=${e.target.value}`;
                }
              }}
              className="w-full bg-[#060a12] border border-[#1e3a5f]/50 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Selecione um analista...</option>
              {analistas.filter(a => a.status === 'ativo').map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
