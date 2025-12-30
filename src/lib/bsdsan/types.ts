// Tipos do Sistema BSDSAN

export interface Analista {
  id: string;
  codigo: string;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
  formacao?: string;
  experiencia?: string;
  foto?: string;
  matricula: string;
  nivel: 'I' | 'II' | 'III' | 'SENIOR';
  status: 'pendente' | 'ativo' | 'inativo';
  dataCredenciamento?: string;
  dataCadastro: string;
  assinaturaDigital?: string;
  termosAceitos: boolean;
}

export interface Missao {
  id: string;
  protocolo: string;
  titulo: string;
  descricao: string;
  sistema: string;
  versao?: string;
  classificacao: 'normal' | 'prioritaria' | 'urgente';
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  analistaId: string;
  analistaNome?: string;
  dataEmissao: string;
  dataLimite: string;
  dataConclusao?: string;
  instrucoes: string[];
  urlSistema?: string;
  observacoes?: string;
  relatorio?: string;
  ocorrencias?: Ocorrencia[];
}

export interface Ocorrencia {
  id: string;
  missaoId: string;
  tipo: 'bug' | 'melhoria' | 'duvida' | 'outro';
  gravidade: 'baixa' | 'media' | 'alta' | 'critica';
  titulo: string;
  descricao: string;
  passos?: string;
  evidencia?: string;
  status: 'aberta' | 'em_analise' | 'resolvida';
  dataRegistro: string;
}

export interface Comunicado {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'informativo' | 'importante' | 'urgente';
  destinatarioId?: string; // null = todos
  dataEnvio: string;
  lido: boolean;
}

export interface Documento {
  id: string;
  tipo: 'certificado' | 'termo' | 'ordem_servico' | 'reconhecimento';
  titulo: string;
  analistaId: string;
  missaoId?: string;
  dataEmissao: string;
  conteudo: string;
}

export interface Estatisticas {
  totalAnalistas: number;
  analistasAtivos: number;
  totalMissoes: number;
  missoesConcluidas: number;
  missoesEmAndamento: number;
  totalOcorrencias: number;
  taxaSucesso: number;
}

export interface ConfiguracoesSistema {
  nomeEmpresa: string;
  sigla: string;
  slogan: string;
  corPrimaria: string;
  corSecundaria: string;
  emailContato: string;
  telefone: string;
  endereco: string;
}
