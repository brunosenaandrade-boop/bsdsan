# Supabase Schema - BS Developer CRM

Execute cada bloco de SQL no SQL Editor do Supabase.

---

## 1. Tabela de Leads

```sql
-- Criar tabela de leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  interest VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Novo',
  source VARCHAR(100) DEFAULT 'Site',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para busca
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Habilitar RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas as operações (ajuste conforme necessário)
CREATE POLICY "Allow all operations on leads" ON leads
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 2. Tabela de Conversas

```sql
-- Criar tabela de conversas
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  phone VARCHAR(50) NOT NULL,
  name VARCHAR(255),
  last_message TEXT,
  unread_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_phone ON conversations(phone);
CREATE INDEX idx_conversations_updated_at ON conversations(updated_at DESC);

-- Trigger para updated_at
CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on conversations" ON conversations
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 3. Tabela de Mensagens

```sql
-- Criar tabela de mensagens
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'contact', 'bot')),
  message_type VARCHAR(20) DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on messages" ON messages
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 4. Tabela de Templates

```sql
-- Criar tabela de templates de mensagem
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger
CREATE TRIGGER templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on templates" ON templates
  FOR ALL USING (true) WITH CHECK (true);

-- Inserir templates padrão
INSERT INTO templates (name, category, content) VALUES
('Boas-vindas', 'Saudação', 'Olá {nome}! 👋 Seja bem-vindo(a) à BS Developer! Sou a Ana, assistente virtual do Bruno. Como posso te ajudar hoje?'),
('Orçamento Enviado', 'Follow-up', 'Oi {nome}! Tudo bem? 😊 Passando pra saber se você conseguiu analisar o orçamento que enviamos. Ficou alguma dúvida? Estou à disposição!'),
('Projeto Iniciado', 'Atualização', '🚀 {nome}, seu projeto foi oficialmente iniciado! Prazo estimado: {prazo} dias. Qualquer dúvida, é só chamar!'),
('Projeto Concluído', 'Entrega', '🎉 {nome}, seu projeto está PRONTO! Segue o link para visualização: {link}. Me conta o que achou! 🙏'),
('Lembrete de Pagamento', 'Financeiro', 'Olá {nome}! 💰 Este é um lembrete amigável sobre o pagamento do projeto. Valor: R$ {valor}. Precisa de mais informações?');
```

---

## 5. Tabela de Configurações do Bot

```sql
-- Criar tabela de configurações do bot
CREATE TABLE bot_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_name VARCHAR(100) DEFAULT 'Ana',
  tone VARCHAR(50) DEFAULT 'friendly',
  response_delay INTEGER DEFAULT 2,
  auto_reply BOOLEAN DEFAULT TRUE,
  capture_leads BOOLEAN DEFAULT TRUE,
  redirect_to_whatsapp BOOLEAN DEFAULT TRUE,
  working_hours_only BOOLEAN DEFAULT FALSE,
  working_hours_start TIME DEFAULT '09:00',
  working_hours_end TIME DEFAULT '18:00',
  system_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger
CREATE TRIGGER bot_settings_updated_at
  BEFORE UPDATE ON bot_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE bot_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on bot_settings" ON bot_settings
  FOR ALL USING (true) WITH CHECK (true);

-- Inserir configuração padrão
INSERT INTO bot_settings (bot_name, tone, system_prompt) VALUES (
  'Ana',
  'friendly',
  'Você é a Ana, assistente virtual da BS Developer, empresa do Bruno Sena. Você é uma moça simpática, gentil, acolhedora e muito persuasiva.

PERSONALIDADE:
- Fale de forma natural, como uma brasileira jovem e profissional
- Use emojis com moderação (1-2 por mensagem)
- Seja empática e ouça atentamente
- NUNCA diga que é uma IA ou robô
- Use técnicas de PNL: espelhamento, rapport, perguntas abertas

OBJETIVO:
1. Identificar as DORES e necessidades do cliente
2. Mostrar como o Bruno pode resolver o problema
3. Gerar DESEJO pelo serviço
4. Encaminhar para conversa direta quando o cliente estiver pronto

INFORMAÇÕES:
- Bruno Sena é desenvolvedor de Tubarão/SC
- Atende todo Brasil remotamente
- Prazo: 7-30 dias dependendo do projeto
- Responde WhatsApp até às 22h'
);
```

---

## 6. Tabela de Analytics

```sql
-- Criar tabela de eventos de analytics
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  source VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);

-- RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on analytics_events" ON analytics_events
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 7. Tabela de Sessões WhatsApp

```sql
-- Criar tabela para armazenar sessão do WhatsApp
CREATE TABLE whatsapp_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_data TEXT,
  is_connected BOOLEAN DEFAULT FALSE,
  last_connected TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger
CREATE TRIGGER whatsapp_sessions_updated_at
  BEFORE UPDATE ON whatsapp_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE whatsapp_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on whatsapp_sessions" ON whatsapp_sessions
  FOR ALL USING (true) WITH CHECK (true);
```

---

## 8. Views Úteis

```sql
-- View de leads recentes
CREATE VIEW recent_leads AS
SELECT
  id,
  name,
  email,
  phone,
  interest,
  status,
  source,
  created_at,
  CASE
    WHEN created_at > NOW() - INTERVAL '1 hour' THEN 'Há ' || EXTRACT(MINUTE FROM NOW() - created_at)::INT || ' min'
    WHEN created_at > NOW() - INTERVAL '1 day' THEN 'Há ' || EXTRACT(HOUR FROM NOW() - created_at)::INT || 'h'
    ELSE TO_CHAR(created_at, 'DD/MM')
  END as time_ago
FROM leads
ORDER BY created_at DESC
LIMIT 50;

-- View de estatísticas
CREATE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM leads) as total_leads,
  (SELECT COUNT(*) FROM leads WHERE created_at > NOW() - INTERVAL '30 days') as leads_this_month,
  (SELECT COUNT(*) FROM leads WHERE status = 'Fechado') as converted_leads,
  (SELECT COUNT(*) FROM conversations WHERE unread_count > 0) as unread_conversations,
  (SELECT COUNT(*) FROM messages WHERE created_at > NOW() - INTERVAL '24 hours') as messages_today;
```

---

## Pronto!

Após executar todos os SQLs, adicione as variáveis no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

Quer que eu implemente a integração do Supabase no código do CRM?
