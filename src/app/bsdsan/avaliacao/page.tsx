'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Brain,
  Loader2,
} from 'lucide-react';

// 30 questões psicológicas e de atenção
const questoes = [
  {
    id: 1,
    categoria: 'Atenção',
    pergunta: 'Qual número completa a sequência: 2, 4, 8, 16, __?',
    opcoes: ['24', '30', '32', '36'],
    correta: 2,
  },
  {
    id: 2,
    categoria: 'Percepção',
    pergunta: 'Se você encontrar um erro pequeno em um documento importante, qual seria sua primeira ação?',
    opcoes: [
      'Ignorar, pois é pequeno',
      'Corrigir imediatamente sem avisar',
      'Documentar e reportar o erro',
      'Perguntar a outra pessoa se é importante',
    ],
    correta: 2,
  },
  {
    id: 3,
    categoria: 'Lógica',
    pergunta: 'Se todos os analistas são detalhistas, e Maria é analista, então:',
    opcoes: [
      'Maria pode não ser detalhista',
      'Maria é detalhista',
      'Maria é a mais detalhista',
      'Não é possível afirmar nada',
    ],
    correta: 1,
  },
  {
    id: 4,
    categoria: 'Atenção',
    pergunta: 'Quantos "F" existem na frase: "FINISHED FILES ARE THE RESULT OF YEARS OF SCIENTIFIC STUDY"?',
    opcoes: ['3', '4', '5', '6'],
    correta: 3,
  },
  {
    id: 5,
    categoria: 'Comportamento',
    pergunta: 'Ao trabalhar em uma tarefa complexa, você prefere:',
    opcoes: [
      'Começar imediatamente e ajustar no caminho',
      'Planejar detalhadamente antes de iniciar',
      'Pedir ajuda antes de começar',
      'Dividir em partes menores e fazer aos poucos',
    ],
    correta: 3,
  },
  {
    id: 6,
    categoria: 'Memória',
    pergunta: 'Você acabou de ler: "O analista verificou 47 páginas em 3 horas". Quantas páginas foram verificadas?',
    opcoes: ['45', '47', '50', '43'],
    correta: 1,
  },
  {
    id: 7,
    categoria: 'Lógica',
    pergunta: 'Se A é maior que B, e B é maior que C, qual é a relação entre A e C?',
    opcoes: ['A é igual a C', 'A é menor que C', 'A é maior que C', 'Não é possível determinar'],
    correta: 2,
  },
  {
    id: 8,
    categoria: 'Percepção',
    pergunta: 'Em um sistema com 100 funcionalidades, encontrar 1 erro representa:',
    opcoes: ['Falha total do sistema', 'Taxa de erro de 1%', 'Sistema perfeito', 'Necessidade de refazer tudo'],
    correta: 1,
  },
  {
    id: 9,
    categoria: 'Comportamento',
    pergunta: 'Quando você comete um erro no trabalho, sua reação natural é:',
    opcoes: [
      'Esconder para não parecer incompetente',
      'Admitir, corrigir e aprender com ele',
      'Culpar as circunstâncias',
      'Esperar que ninguém perceba',
    ],
    correta: 1,
  },
  {
    id: 10,
    categoria: 'Atenção',
    pergunta: 'Qual palavra está escrita incorretamente: Análise, Qualidade, Prosesso, Sistema?',
    opcoes: ['Análise', 'Qualidade', 'Prosesso', 'Sistema'],
    correta: 2,
  },
  {
    id: 11,
    categoria: 'Lógica',
    pergunta: 'Um teste foi executado 5 vezes. Nas 4 primeiras, funcionou perfeitamente. Na quinta, falhou. O teste é:',
    opcoes: ['100% confiável', 'Totalmente falho', 'Inconsistente e precisa investigação', 'Bom o suficiente'],
    correta: 2,
  },
  {
    id: 12,
    categoria: 'Percepção',
    pergunta: 'Ao revisar um documento, você encontra uma vírgula fora do lugar. Você:',
    opcoes: [
      'Ignora, pois não afeta o sentido',
      'Corrige, pois detalhes importam',
      'Deixa para outra pessoa decidir',
      'Marca como erro grave',
    ],
    correta: 1,
  },
  {
    id: 13,
    categoria: 'Comportamento',
    pergunta: 'Diante de um prazo apertado, você geralmente:',
    opcoes: [
      'Fica paralisado pelo estresse',
      'Prioriza e foca no essencial',
      'Desiste antes de tentar',
      'Reclama da situação',
    ],
    correta: 1,
  },
  {
    id: 14,
    categoria: 'Atenção',
    pergunta: 'Qual é o resultado de 15 + 27 - 12?',
    opcoes: ['28', '30', '32', '34'],
    correta: 1,
  },
  {
    id: 15,
    categoria: 'Memória',
    pergunta: 'Na questão 6, qual era o número de horas mencionado?',
    opcoes: ['2 horas', '3 horas', '4 horas', '5 horas'],
    correta: 1,
  },
  {
    id: 16,
    categoria: 'Lógica',
    pergunta: 'Se um bug aparece apenas às terças-feiras, a melhor abordagem é:',
    opcoes: [
      'Ignorar nos outros dias',
      'Investigar o que acontece às terças',
      'Declarar o sistema como falho',
      'Esperar o bug desaparecer',
    ],
    correta: 1,
  },
  {
    id: 17,
    categoria: 'Percepção',
    pergunta: 'Em uma lista de 1000 itens, encontrar 3 erros significa que você:',
    opcoes: [
      'Falhou completamente',
      'Encontrou 0,3% de problemas',
      'Deve refazer toda a lista',
      'Não é bom no trabalho',
    ],
    correta: 1,
  },
  {
    id: 18,
    categoria: 'Comportamento',
    pergunta: 'Quando recebe feedback negativo, você:',
    opcoes: [
      'Fica na defensiva imediatamente',
      'Analisa se há algo válido para melhorar',
      'Ignora completamente',
      'Leva para o lado pessoal',
    ],
    correta: 1,
  },
  {
    id: 19,
    categoria: 'Atenção',
    pergunta: 'Identifique o padrão: AB, CD, EF, __?',
    opcoes: ['GH', 'HI', 'FG', 'GI'],
    correta: 0,
  },
  {
    id: 20,
    categoria: 'Lógica',
    pergunta: 'Se um sistema funciona 99% do tempo, ele é:',
    opcoes: [
      'Perfeito',
      'Aceitável mas com margem para melhoria',
      'Completamente falho',
      'Impossível de usar',
    ],
    correta: 1,
  },
  {
    id: 21,
    categoria: 'Percepção',
    pergunta: 'Qual destas cores está escrita com a cor errada: AZUL, VERDE, VERMELHO, AMARELO?',
    opcoes: [
      'Todas estão corretas',
      'É impossível saber sem ver as cores',
      'Todas estão erradas',
      'AZUL está errado',
    ],
    correta: 1,
  },
  {
    id: 22,
    categoria: 'Comportamento',
    pergunta: 'Você prefere trabalhar:',
    opcoes: [
      'Sozinho, sem interrupções',
      'Em equipe, colaborando',
      'Depende da tarefa',
      'Não tenho preferência',
    ],
    correta: 2,
  },
  {
    id: 23,
    categoria: 'Atenção',
    pergunta: 'Quantas vezes a letra "A" aparece nesta pergunta?',
    opcoes: ['6', '7', '8', '9'],
    correta: 2,
  },
  {
    id: 24,
    categoria: 'Memória',
    pergunta: 'Qual foi a categoria da questão número 10?',
    opcoes: ['Lógica', 'Percepção', 'Atenção', 'Comportamento'],
    correta: 2,
  },
  {
    id: 25,
    categoria: 'Lógica',
    pergunta: 'Todo erro tem uma causa. Se não encontramos a causa, significa que:',
    opcoes: [
      'O erro não existe',
      'Precisamos investigar mais',
      'Devemos ignorar o erro',
      'O sistema é perfeito',
    ],
    correta: 1,
  },
  {
    id: 26,
    categoria: 'Percepção',
    pergunta: 'Um botão que às vezes não funciona é:',
    opcoes: [
      'Aceitável',
      'Um problema que precisa ser resolvido',
      'Normal em sistemas complexos',
      'Culpa do usuário',
    ],
    correta: 1,
  },
  {
    id: 27,
    categoria: 'Comportamento',
    pergunta: 'Ao terminar uma tarefa importante, você:',
    opcoes: [
      'Entrega imediatamente',
      'Revisa pelo menos uma vez antes',
      'Pede para outra pessoa revisar',
      'Assume que está perfeito',
    ],
    correta: 1,
  },
  {
    id: 28,
    categoria: 'Atenção',
    pergunta: 'Qual número não pertence à sequência: 2, 4, 6, 9, 10, 12?',
    opcoes: ['4', '6', '9', '10'],
    correta: 2,
  },
  {
    id: 29,
    categoria: 'Lógica',
    pergunta: 'Se um teste passou em desenvolvimento mas falhou em produção, o problema está:',
    opcoes: [
      'No teste',
      'Na diferença entre os ambientes',
      'No desenvolvedor',
      'No sistema de produção',
    ],
    correta: 1,
  },
  {
    id: 30,
    categoria: 'Comportamento',
    pergunta: 'Qual qualidade você considera mais importante para um analista de qualidade?',
    opcoes: [
      'Velocidade',
      'Atenção aos detalhes',
      'Simpatia',
      'Experiência prévia',
    ],
    correta: 1,
  },
];

export default function AvaliacaoPage() {
  const [etapa, setEtapa] = useState<'boas-vindas' | 'avaliacao' | 'concluido'>('boas-vindas');
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(new Array(30).fill(null));
  const [tempoInicio, setTempoInicio] = useState<Date | null>(null);
  const [enviando, setEnviando] = useState(false);

  const iniciarAvaliacao = () => {
    setEtapa('avaliacao');
    setTempoInicio(new Date());
  };

  const selecionarResposta = (opcaoIndex: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = opcaoIndex;
    setRespostas(novasRespostas);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const finalizarAvaliacao = async () => {
    setEnviando(true);

    // Salvar no localStorage para o admin ver
    const avaliacao = {
      candidato: 'Cristina',
      codigo: 'BSDSAN-CRISTINA-2025',
      dataRealizacao: new Date().toISOString(),
      tempoInicio: tempoInicio?.toISOString(),
      tempoFim: new Date().toISOString(),
      respostas: respostas.map((r, i) => ({
        questao: i + 1,
        categoria: questoes[i].categoria,
        pergunta: questoes[i].pergunta,
        respostaSelecionada: r !== null ? questoes[i].opcoes[r] : 'Não respondida',
        indiceResposta: r,
      })),
      pontuacao: respostas.reduce((acc: number, r, i) => {
        return acc + (r !== null && r === questoes[i].correta ? 1 : 0);
      }, 0),
      totalQuestoes: questoes.length,
    };

    // Salvar no localStorage
    const avaliacoes = JSON.parse(localStorage.getItem('bsdsan-avaliacoes') || '[]');
    avaliacoes.push(avaliacao);
    localStorage.setItem('bsdsan-avaliacoes', JSON.stringify(avaliacoes));

    await new Promise(r => setTimeout(r, 2000));
    setEnviando(false);
    setEtapa('concluido');
  };

  const questoesRespondidas = respostas.filter(r => r !== null).length;
  const progresso = (questoesRespondidas / questoes.length) * 100;

  // Tela de boas-vindas
  if (etapa === 'boas-vindas') {
    return (
      <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-10 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-[#0a0f1a]" />
            </div>

            <h1 className="text-3xl font-playfair font-bold text-white mb-4">
              Seja Bem-Vinda, Cristina
            </h1>
            <p className="text-xl text-[#c9a227] mb-6">
              Ao Seu Processo de Avaliação
            </p>

            <div className="bg-[#060a12] border border-[#1e3a5f]/50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#c9a227]" />
                Instruções Importantes
              </h2>
              <ul className="space-y-3 text-[#8ba3c7]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">•</span>
                  A avaliação contém <strong className="text-white">30 questões</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">•</span>
                  Responda com calma e atenção
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">•</span>
                  Você pode navegar entre as questões antes de finalizar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">•</span>
                  Não há tempo limite, mas recomendamos 30-45 minutos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">•</span>
                  Suas respostas serão analisadas pela equipe de certificação
                </li>
              </ul>
            </div>

            <button
              onClick={iniciarAvaliacao}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-10 py-4 rounded-lg font-semibold text-lg hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
            >
              Iniciar Avaliação
              <ChevronRight className="w-6 h-6" />
            </button>

            <p className="text-xs text-[#4a5568] mt-8">
              BSDSAN - Diretoria de Certificação e Qualidade
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  // Tela de conclusão
  if (etapa === 'concluido') {
    return (
      <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-10 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl font-playfair font-bold text-white mb-4">
              Avaliação Concluída
            </h1>

            <p className="text-[#8ba3c7] mb-8 text-lg">
              Suas respostas foram registradas com sucesso e serão analisadas
              pela nossa equipe de especialistas em certificação.
            </p>

            <div className="bg-[#060a12] border border-[#1e3a5f]/50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-xs text-[#6b7c95] uppercase tracking-wider mb-1">Questões Respondidas</p>
                  <p className="text-2xl font-bold text-white">{questoesRespondidas} / {questoes.length}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7c95] uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-semibold text-[#c9a227]">Em Análise</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
              <p className="text-blue-400">
                <strong>Próximos Passos:</strong> Você receberá o resultado da avaliação
                por email em até 48 horas úteis. Fique atenta à sua caixa de entrada
                e também à pasta de spam.
              </p>
            </div>

            <p className="text-sm text-[#6b7c95]">
              Protocolo de Avaliação: BSDSAN/AV/2025/{Date.now().toString().slice(-6)}
            </p>

            <p className="text-xs text-[#4a5568] mt-8">
              BSDSAN - Diretoria de Certificação e Qualidade<br />
              Obrigado por participar do processo seletivo
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  // Tela de avaliação
  const questao = questoes[questaoAtual];

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d1424] border-b border-[#1e3a5f]/30 z-50">
        <div className="h-full max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#8b7355] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0a0f1a]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Avaliação BSDSAN</p>
              <p className="text-xs text-[#6b7c95]">Cristina</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-[#6b7c95]">Progresso</p>
              <p className="text-sm font-semibold text-white">{questoesRespondidas}/{questoes.length}</p>
            </div>
            <div className="w-32 h-2 bg-[#1e3a5f]/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c9a227] to-[#f4d03f] transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={questaoAtual}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0d1424] border border-[#1e3a5f]/30 rounded-2xl p-8"
            >
              {/* Categoria e número */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-[#1e3a5f]/30 rounded-full text-xs text-[#8ba3c7] uppercase tracking-wider">
                  {questao.categoria}
                </span>
                <span className="text-sm text-[#6b7c95]">
                  Questão {questaoAtual + 1} de {questoes.length}
                </span>
              </div>

              {/* Pergunta */}
              <h2 className="text-xl font-semibold text-white mb-8 leading-relaxed">
                {questao.pergunta}
              </h2>

              {/* Opções */}
              <div className="space-y-3">
                {questao.opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => selecionarResposta(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      respostas[questaoAtual] === index
                        ? 'bg-[#c9a227]/10 border-[#c9a227] text-white'
                        : 'bg-[#060a12] border-[#1e3a5f]/30 text-[#8ba3c7] hover:border-[#1e3a5f] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          respostas[questaoAtual] === index
                            ? 'bg-[#c9a227] text-[#0a0f1a]'
                            : 'bg-[#1e3a5f]/30 text-[#6b7c95]'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{opcao}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navegação de questões */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {questoes.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuestaoAtual(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  index === questaoAtual
                    ? 'bg-[#c9a227] text-[#0a0f1a]'
                    : respostas[index] !== null
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#1e3a5f]/20 text-[#6b7c95] hover:bg-[#1e3a5f]/40'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0d1424] border-t border-[#1e3a5f]/30 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={questaoAnterior}
            disabled={questaoAtual === 0}
            className="flex items-center gap-2 px-6 py-3 text-[#8ba3c7] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          {questaoAtual === questoes.length - 1 ? (
            <button
              onClick={finalizarAvaliacao}
              disabled={enviando || questoesRespondidas < questoes.length}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enviando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Finalizar Avaliação
                </>
              )}
            </button>
          ) : (
            <button
              onClick={proximaQuestao}
              className="flex items-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#a08520] text-[#0a0f1a] px-8 py-3 rounded-lg font-semibold hover:from-[#d4af37] hover:to-[#b8960c] transition-all"
            >
              Próxima
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}
