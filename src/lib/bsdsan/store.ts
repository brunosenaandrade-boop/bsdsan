'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Analista, Missao, Comunicado, Ocorrencia } from './types';

// API do Google Sheets
const API_URL = 'https://script.google.com/macros/s/AKfycbyzhyw9u2f2W39Z-Yensav3ie6H2KS_oUqa45bLlgGpJeJgfRAjV3echKfaWSSf6vlUBA/exec';

// Função para fazer requisições à API
async function apiRequest(params: Record<string, string>): Promise<unknown> {
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  const response = await fetch(url.toString());
  return response.json();
}

interface BSDSANStore {
  // Estado
  analistas: Analista[];
  analistaLogado: Analista | null;
  missoes: Missao[];
  comunicados: Comunicado[];
  adminLogado: boolean;
  loading: boolean;
  initialized: boolean;

  // Inicialização
  inicializar: () => Promise<void>;
  recarregar: () => Promise<void>;

  // Ações - Analistas
  cadastrarAnalista: (dados: Partial<Analista>) => Promise<Analista>;
  aprovarAnalista: (id: string) => Promise<void>;
  loginAnalista: (codigo: string) => Promise<Analista | null>;
  logoutAnalista: () => void;
  atualizarAnalista: (id: string, dados: Partial<Analista>) => Promise<void>;

  // Ações - Missões
  criarMissao: (dados: Omit<Missao, 'id' | 'protocolo' | 'dataEmissao' | 'status' | 'ocorrencias'>) => Promise<Missao>;
  atualizarMissao: (id: string, dados: Partial<Missao>) => Promise<void>;
  concluirMissao: (id: string, relatorio: string) => Promise<void>;

  // Ações - Ocorrências
  registrarOcorrencia: (missaoId: string, dados: Omit<Ocorrencia, 'id' | 'missaoId' | 'dataRegistro' | 'status'>) => Promise<void>;

  // Ações - Comunicados
  enviarComunicado: (dados: Omit<Comunicado, 'id' | 'dataEnvio' | 'lido'>) => Promise<void>;
  marcarComoLido: (id: string) => Promise<void>;

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
      loading: false,
      initialized: false,

      // Inicializar - carrega dados do Google Sheets
      inicializar: async () => {
        if (get().initialized) return;

        set({ loading: true });
        try {
          const [analistas, missoes, comunicados, ocorrencias] = await Promise.all([
            apiRequest({ action: 'read', sheet: 'analistas' }),
            apiRequest({ action: 'read', sheet: 'missoes' }),
            apiRequest({ action: 'read', sheet: 'comunicados' }),
            apiRequest({ action: 'read', sheet: 'ocorrencias' }),
          ]);

          // Associar ocorrências às missões
          const missoesComOcorrencias = (missoes as Missao[]).map((m) => ({
            ...m,
            ocorrencias: (ocorrencias as Ocorrencia[]).filter((o) => o.missaoId === m.id),
          }));

          set({
            analistas: analistas as Analista[],
            missoes: missoesComOcorrencias,
            comunicados: comunicados as Comunicado[],
            initialized: true,
            loading: false,
          });
        } catch (error) {
          console.error('Erro ao inicializar:', error);
          set({ loading: false });
        }
      },

      // Recarregar dados
      recarregar: async () => {
        set({ initialized: false });
        await get().inicializar();
      },

      // Cadastrar novo analista
      cadastrarAnalista: async (dados) => {
        set({ loading: true });
        try {
          // Gerar código e matrícula localmente
          const codigo = `BSDSAN-${Date.now().toString(36).toUpperCase()}`;
          const matricula = `AQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;

          const result = await apiRequest({
            action: 'create',
            sheet: 'analistas',
            data: JSON.stringify({
              codigo,
              matricula,
              nome: dados.nome || '',
              email: dados.email || '',
              cpf: dados.cpf || '',
              telefone: dados.telefone || '',
              endereco: dados.endereco || '',
              formacao: dados.formacao || '',
              experiencia: dados.experiencia || '',
              assinatura: dados.assinaturaDigital || '',
              status: 'pendente',
              nivel: 'I',
              dataCadastro: new Date().toISOString(),
              termosAceitos: true,
            }),
          });

          // Usar dados retornados ou criar objeto local
          const novoAnalista: Analista = (result as Analista)?.id ? (result as Analista) : {
            id: `local-${Date.now()}`,
            codigo,
            matricula,
            nome: dados.nome || '',
            email: dados.email || '',
            cpf: dados.cpf,
            telefone: dados.telefone,
            endereco: dados.endereco,
            formacao: dados.formacao,
            experiencia: dados.experiencia,
            assinaturaDigital: dados.assinaturaDigital,
            status: 'pendente',
            nivel: 'I',
            dataCadastro: new Date().toISOString(),
            termosAceitos: true,
          };

          set((state) => ({
            analistas: [...state.analistas, novoAnalista],
            loading: false,
          }));

          return novoAnalista;
        } catch (error) {
          console.error('Erro ao cadastrar:', error);
          set({ loading: false });
          throw error;
        }
      },

      // Aprovar analista
      aprovarAnalista: async (id) => {
        set({ loading: true });
        try {
          await apiRequest({
            action: 'update',
            sheet: 'analistas',
            id,
            data: JSON.stringify({
              status: 'ativo',
              dataCredenciamento: new Date().toISOString(),
            }),
          });

          set((state) => ({
            analistas: state.analistas.map((a) =>
              a.id === id
                ? { ...a, status: 'ativo', dataCredenciamento: new Date().toISOString() }
                : a
            ),
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao aprovar:', error);
          set({ loading: false });
        }
      },

      // Login do analista
      loginAnalista: async (codigo) => {
        set({ loading: true });
        try {
          const result = await apiRequest({
            action: 'login',
            codigo,
          }) as { success: boolean; analista?: Analista };

          if (result.success && result.analista) {
            set({ analistaLogado: result.analista, loading: false });
            return result.analista;
          }

          set({ loading: false });
          return null;
        } catch (error) {
          console.error('Erro no login:', error);
          set({ loading: false });
          return null;
        }
      },

      // Logout do analista
      logoutAnalista: () => {
        set({ analistaLogado: null });
      },

      // Atualizar analista
      atualizarAnalista: async (id, dados) => {
        set({ loading: true });
        try {
          await apiRequest({
            action: 'update',
            sheet: 'analistas',
            id,
            data: JSON.stringify(dados),
          });

          set((state) => ({
            analistas: state.analistas.map((a) =>
              a.id === id ? { ...a, ...dados } : a
            ),
            analistaLogado:
              state.analistaLogado?.id === id
                ? { ...state.analistaLogado, ...dados }
                : state.analistaLogado,
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao atualizar:', error);
          set({ loading: false });
        }
      },

      // Criar missão
      criarMissao: async (dados) => {
        set({ loading: true });
        try {
          const result = await apiRequest({
            action: 'create',
            sheet: 'missoes',
            data: JSON.stringify({
              titulo: dados.titulo,
              descricao: dados.descricao,
              sistema: dados.sistema,
              versao: dados.versao,
              urlSistema: dados.urlSistema,
              classificacao: dados.classificacao,
              analistaId: dados.analistaId,
              dataLimite: dados.dataLimite,
              instrucoes: Array.isArray(dados.instrucoes) ? dados.instrucoes.join('; ') : dados.instrucoes,
            }),
          });

          const novaMissao = { ...(result as Missao), ocorrencias: [] };

          set((state) => ({
            missoes: [...state.missoes, novaMissao],
            loading: false,
          }));

          return novaMissao;
        } catch (error) {
          console.error('Erro ao criar missão:', error);
          set({ loading: false });
          throw error;
        }
      },

      // Atualizar missão
      atualizarMissao: async (id, dados) => {
        set({ loading: true });
        try {
          await apiRequest({
            action: 'update',
            sheet: 'missoes',
            id,
            data: JSON.stringify(dados),
          });

          set((state) => ({
            missoes: state.missoes.map((m) =>
              m.id === id ? { ...m, ...dados } : m
            ),
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao atualizar missão:', error);
          set({ loading: false });
        }
      },

      // Concluir missão
      concluirMissao: async (id, relatorio) => {
        set({ loading: true });
        try {
          await apiRequest({
            action: 'update',
            sheet: 'missoes',
            id,
            data: JSON.stringify({
              status: 'concluida',
              relatorioFinal: relatorio,
              dataConclusao: new Date().toISOString(),
            }),
          });

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
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao concluir missão:', error);
          set({ loading: false });
        }
      },

      // Registrar ocorrência
      registrarOcorrencia: async (missaoId, dados) => {
        set({ loading: true });
        try {
          const result = await apiRequest({
            action: 'create',
            sheet: 'ocorrencias',
            data: JSON.stringify({
              missaoId,
              tipo: dados.tipo,
              gravidade: dados.gravidade,
              titulo: dados.titulo,
              descricao: dados.descricao,
              passos: dados.passos,
              evidencia: dados.evidencia,
            }),
          });

          const novaOcorrencia = result as Ocorrencia;

          set((state) => ({
            missoes: state.missoes.map((m) =>
              m.id === missaoId
                ? { ...m, ocorrencias: [...(m.ocorrencias || []), novaOcorrencia] }
                : m
            ),
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao registrar ocorrência:', error);
          set({ loading: false });
        }
      },

      // Enviar comunicado
      enviarComunicado: async (dados) => {
        set({ loading: true });
        try {
          const result = await apiRequest({
            action: 'create',
            sheet: 'comunicados',
            data: JSON.stringify({
              titulo: dados.titulo,
              mensagem: dados.mensagem,
              tipo: dados.tipo,
              destinatarioId: dados.destinatarioId || '',
            }),
          });

          const novoComunicado = result as Comunicado;

          set((state) => ({
            comunicados: [...state.comunicados, novoComunicado],
            loading: false,
          }));
        } catch (error) {
          console.error('Erro ao enviar comunicado:', error);
          set({ loading: false });
        }
      },

      // Marcar comunicado como lido
      marcarComoLido: async (id) => {
        try {
          await apiRequest({
            action: 'update',
            sheet: 'comunicados',
            id,
            data: JSON.stringify({ lido: true }),
          });

          set((state) => ({
            comunicados: state.comunicados.map((c) =>
              c.id === id ? { ...c, lido: true } : c
            ),
          }));
        } catch (error) {
          console.error('Erro ao marcar como lido:', error);
        }
      },

      // Login admin
      loginAdmin: (senha) => {
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
      partialize: (state) => ({
        analistaLogado: state.analistaLogado,
        adminLogado: state.adminLogado,
      }),
    }
  )
);
