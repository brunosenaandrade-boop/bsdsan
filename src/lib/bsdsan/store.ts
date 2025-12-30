'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Analista, Missao, Comunicado, Ocorrencia } from './types';

// Gera código de acesso único
function gerarCodigo(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = 'BSDSAN-';
  for (let i = 0; i < 8; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}

// Gera matrícula
function gerarMatricula(): string {
  const ano = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `AQ-${ano}-${num}`;
}

// Gera protocolo
function gerarProtocolo(): string {
  const ano = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `OS-${ano}/${num}`;
}

interface BSDSANStore {
  // Analistas
  analistas: Analista[];
  analistaLogado: Analista | null;

  // Missões
  missoes: Missao[];

  // Comunicados
  comunicados: Comunicado[];

  // Admin
  adminLogado: boolean;

  // Ações - Analistas
  cadastrarAnalista: (dados: Partial<Analista>) => Analista;
  aprovarAnalista: (id: string) => void;
  loginAnalista: (codigo: string) => Analista | null;
  logoutAnalista: () => void;
  atualizarAnalista: (id: string, dados: Partial<Analista>) => void;

  // Ações - Missões
  criarMissao: (dados: Omit<Missao, 'id' | 'protocolo' | 'dataEmissao' | 'status'>) => Missao;
  atualizarMissao: (id: string, dados: Partial<Missao>) => void;
  concluirMissao: (id: string, relatorio: string) => void;

  // Ações - Ocorrências
  registrarOcorrencia: (missaoId: string, dados: Omit<Ocorrencia, 'id' | 'missaoId' | 'dataRegistro' | 'status'>) => void;

  // Ações - Comunicados
  enviarComunicado: (dados: Omit<Comunicado, 'id' | 'dataEnvio' | 'lido'>) => void;
  marcarComoLido: (id: string) => void;

  // Ações - Admin
  loginAdmin: (senha: string) => boolean;
  logoutAdmin: () => void;

  // Utilitários
  getMissoesAnalista: (analistaId: string) => Missao[];
  getComunicadosAnalista: (analistaId: string) => Comunicado[];
  getEstatisticas: () => {
    totalAnalistas: number;
    analistasAtivos: number;
    totalMissoes: number;
    missoesConcluidas: number;
    missoesEmAndamento: number;
    totalOcorrencias: number;
  };
}

export const useBSDSANStore = create<BSDSANStore>()(
  persist(
    (set, get) => ({
      analistas: [],
      analistaLogado: null,
      missoes: [],
      comunicados: [],
      adminLogado: false,

      // Cadastrar novo analista
      cadastrarAnalista: (dados) => {
        const novoAnalista: Analista = {
          id: crypto.randomUUID(),
          codigo: gerarCodigo(),
          nome: dados.nome || '',
          email: dados.email || '',
          cpf: dados.cpf,
          telefone: dados.telefone,
          endereco: dados.endereco,
          formacao: dados.formacao,
          experiencia: dados.experiencia,
          foto: dados.foto,
          matricula: gerarMatricula(),
          nivel: 'I',
          status: 'pendente',
          dataCadastro: new Date().toISOString(),
          assinaturaDigital: dados.assinaturaDigital,
          termosAceitos: dados.termosAceitos || false,
        };

        set((state) => ({
          analistas: [...state.analistas, novoAnalista],
        }));

        return novoAnalista;
      },

      // Aprovar analista
      aprovarAnalista: (id) => {
        set((state) => ({
          analistas: state.analistas.map((a) =>
            a.id === id
              ? { ...a, status: 'ativo', dataCredenciamento: new Date().toISOString() }
              : a
          ),
        }));
      },

      // Login do analista
      loginAnalista: (codigo) => {
        const analista = get().analistas.find(
          (a) => a.codigo === codigo && a.status === 'ativo'
        );
        if (analista) {
          set({ analistaLogado: analista });
          return analista;
        }
        return null;
      },

      // Logout do analista
      logoutAnalista: () => {
        set({ analistaLogado: null });
      },

      // Atualizar analista
      atualizarAnalista: (id, dados) => {
        set((state) => ({
          analistas: state.analistas.map((a) =>
            a.id === id ? { ...a, ...dados } : a
          ),
          analistaLogado:
            state.analistaLogado?.id === id
              ? { ...state.analistaLogado, ...dados }
              : state.analistaLogado,
        }));
      },

      // Criar missão
      criarMissao: (dados) => {
        const novaMissao: Missao = {
          ...dados,
          id: crypto.randomUUID(),
          protocolo: gerarProtocolo(),
          dataEmissao: new Date().toISOString(),
          status: 'pendente',
          ocorrencias: [],
        };

        set((state) => ({
          missoes: [...state.missoes, novaMissao],
        }));

        return novaMissao;
      },

      // Atualizar missão
      atualizarMissao: (id, dados) => {
        set((state) => ({
          missoes: state.missoes.map((m) =>
            m.id === id ? { ...m, ...dados } : m
          ),
        }));
      },

      // Concluir missão
      concluirMissao: (id, relatorio) => {
        set((state) => ({
          missoes: state.missoes.map((m) =>
            m.id === id
              ? {
                  ...m,
                  status: 'concluida',
                  relatorio,
                  dataConclusao: new Date().toISOString(),
                }
              : m
          ),
        }));
      },

      // Registrar ocorrência
      registrarOcorrencia: (missaoId, dados) => {
        const novaOcorrencia: Ocorrencia = {
          ...dados,
          id: crypto.randomUUID(),
          missaoId,
          dataRegistro: new Date().toISOString(),
          status: 'aberta',
        };

        set((state) => ({
          missoes: state.missoes.map((m) =>
            m.id === missaoId
              ? { ...m, ocorrencias: [...(m.ocorrencias || []), novaOcorrencia] }
              : m
          ),
        }));
      },

      // Enviar comunicado
      enviarComunicado: (dados) => {
        const novoComunicado: Comunicado = {
          ...dados,
          id: crypto.randomUUID(),
          dataEnvio: new Date().toISOString(),
          lido: false,
        };

        set((state) => ({
          comunicados: [...state.comunicados, novoComunicado],
        }));
      },

      // Marcar comunicado como lido
      marcarComoLido: (id) => {
        set((state) => ({
          comunicados: state.comunicados.map((c) =>
            c.id === id ? { ...c, lido: true } : c
          ),
        }));
      },

      // Login admin
      loginAdmin: (senha) => {
        // Senha padrão: bsdsan2024
        if (senha === 'bsdsan2024') {
          set({ adminLogado: true });
          return true;
        }
        return false;
      },

      // Logout admin
      logoutAdmin: () => {
        set({ adminLogado: false });
      },

      // Obter missões do analista
      getMissoesAnalista: (analistaId) => {
        return get().missoes.filter((m) => m.analistaId === analistaId);
      },

      // Obter comunicados do analista
      getComunicadosAnalista: (analistaId) => {
        return get().comunicados.filter(
          (c) => !c.destinatarioId || c.destinatarioId === analistaId
        );
      },

      // Obter estatísticas
      getEstatisticas: () => {
        const { analistas, missoes } = get();
        const totalOcorrencias = missoes.reduce(
          (acc, m) => acc + (m.ocorrencias?.length || 0),
          0
        );

        return {
          totalAnalistas: analistas.length,
          analistasAtivos: analistas.filter((a) => a.status === 'ativo').length,
          totalMissoes: missoes.length,
          missoesConcluidas: missoes.filter((m) => m.status === 'concluida').length,
          missoesEmAndamento: missoes.filter((m) => m.status === 'em_andamento').length,
          totalOcorrencias,
        };
      },
    }),
    {
      name: 'bsdsan-storage',
    }
  )
);
