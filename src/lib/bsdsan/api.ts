// API do Google Sheets para BSDSAN
const API_URL = 'https://script.google.com/macros/s/AKfycbyzhyw9u2f2W39Z-Yensav3ie6H2KS_oUqa45bLlgGpJeJgfRAjV3echKfaWSSf6vlUBA/exec';

// Função genérica para fazer requisições
async function apiRequest(params: Record<string, string>): Promise<unknown> {
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  return response.json();
}

// Ler dados de uma aba
export async function readSheet(sheet: string): Promise<unknown[]> {
  const result = await apiRequest({ action: 'read', sheet });
  return Array.isArray(result) ? result : [];
}

// Criar registro
export async function createRecord(sheet: string, data: Record<string, unknown>): Promise<unknown> {
  return apiRequest({
    action: 'create',
    sheet,
    data: JSON.stringify(data),
  });
}

// Atualizar registro
export async function updateRecord(sheet: string, id: string, data: Record<string, unknown>): Promise<unknown> {
  return apiRequest({
    action: 'update',
    sheet,
    id,
    data: JSON.stringify(data),
  });
}

// Deletar registro
export async function deleteRecord(sheet: string, id: string): Promise<unknown> {
  return apiRequest({
    action: 'delete',
    sheet,
    id,
  });
}

// Login do analista
export async function loginAnalista(codigo: string): Promise<{ success: boolean; analista?: unknown; error?: string }> {
  const result = await apiRequest({
    action: 'login',
    codigo,
  });
  return result as { success: boolean; analista?: unknown; error?: string };
}

// Login do admin
export async function loginAdmin(senha: string): Promise<{ success: boolean }> {
  const result = await apiRequest({
    action: 'loginAdmin',
    senha,
  });
  return result as { success: boolean };
}
