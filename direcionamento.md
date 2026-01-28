# 📦 Briefing Técnico: Sistema de Previsão de Preços de Fertilizantes (Zona da Mata MG)

## 🌟 Objetivo

Construir um sistema web responsivo para monitorar, prever e explicar variações no preço dos principais fertilizantes comercializados pela Heringer na região da Zona da Mata Mineira (Manhuaçu, Sericita - MG). A ferramenta ajudará revendedores locais a decidir **quando comprar** com base em **indicadores econômicos, logísticos e de mercado**.

---

## 📚 Funcionalidades do Sistema

### 1. Dashboard (Resumo Geral)

* Exibir preço estimado atual por fertilizante (ex: 20-00-20, 25-00-30).
* Previsão de variação: alta / queda / estável.
* Justificativa da previsão (ex: "queda no dólar").
* Data da última atualização.

### 2. Tela de Histórico e Indicadores

* Gráficos com evolução de preços por fertilizante.
* Gráficos dos principais indicadores monitorados (câmbio, ureia internacional, enxofre, etc.).
* Link para fonte dos dados.

### 3. Tela de Previsão Detalhada

* Tendência futura por fertilizante (em tabela/gráfico).
* Nível de confiança da previsão.
* Justificativas automáticas com base nos dados.

### 4. Alertas e Notificações

* Opção de marcar fertilizantes para alerta.
* Alerta enviado por email quando previsão indicar alta.

### 5. Admin (futuro)

* Interface para inserir previsões manuais.

---

## 🚀 Tecnologias Recomendadas (100% Gratuitas)

### Frontend

* **Next.js** (React) → otimizador para Vercel.
* **Tailwind CSS** → estilização responsiva.
* **Shadcn/ui** → biblioteca de componentes.
* **Recharts** ou **Chart.js** → gráficos.
* **React Query** → gerenciamento de chamadas a API e cache.

### Backend / Integração

* **Next.js API Routes** ou **Supabase Edge Functions**.
* **Vercel Scheduler** → agendar tarefas de atualização.

### Banco de Dados

* **Supabase (PostgreSQL + Auth)**

#### Tabelas sugeridas

* `fertilizantes`: id, nome, formulação (ex: 20-00-20), cultura indicada.
* `precos`: id_fertilizante, data, valor, origem.
* `indicadores`: tipo, data, valor, origem.
* `previsoes`: id_fertilizante, data, tendencia, justificativa, nivel_confiança.

---

## 📊 Indicadores a Monitorar

### 1. Preço internacional dos nutrientes (US$/ton)

* **Ureia**, **MAP**, **KCl**.
* Fontes: [Index Mundi](https://indexmundi.com), [Trading Economics](https://tradingeconomics.com).

### 2. Câmbio (USD/BRL)

* Fonte: [AwesomeAPI](https://docs.awesomeapi.com.br/), [Banco Central](https://www.bcb.gov.br/).

### 3. Preço do Enxofre (S)

* Impacta fertilizantes fosfatados simples.
* Fonte: GlobalFert (manchetes), Argus (se público).

### 4. Preço do Gás Natural

* Impacta fertilizantes nitrogenados (ureia).
* Fonte: [US EIA](https://www.eia.gov/), Trading Economics.

### 5. Exportações / Geopolítica

* China (MAP), Rússia/Bielorrússia (KCl).
* Fontes: Agrolink, Canal Rural, FAO, USDA.

### 6. Calendário Agrícola / Demanda

* Datas de safra e safrinha.
* Relação de troca (milho/café vs. adubo).
* Fonte: CONAB, Cepea, INMET.

### 7. Frete Mínimo e Logística

* Piso do frete rodoviário.
* Fonte: ANTT, Canal Rural.

---

## 🔄 Lógica de Previsão (Exemplo MVP)

* Se dólar cair > 3% em 7 dias → prever queda.
* Se MAP subir > 5% e China segue travada → prever alta.
* Se gás natural + enxofre em alta → alerta para fosfatados.
* Exibir previsão com frase explicativa + fonte.

---

## 📊 Fertilizantes Mais Usados (região Zona da Mata MG)

| Nome Comercial | Formulação NPK | Uso Principal                 |
| -------------- | -------------- | ----------------------------- |
| 20-00-20       | NPK 20-00-20   | Café, milho                   |
| 25-00-30       | NPK 25-00-30   | Cafeicultura intensiva        |
| 04-14-08       | NPK 04-14-08   | Plantio de café novo          |
| 20-05-20       | NPK 20-05-20   | Café e pastagens              |
| 15-15-15       | NPK 15-15-15   | Uso geral (frutas, HF, milho) |

(Obs: Essa lista pode ser atualizada com base nos produtos mais vendidos pela Heringer na região)

---

## 🌌 MVP Recomendado

* Dashboard com previsões e justificativas.
* 3 fertilizantes com histórico de preço e previsão.
* 5 indicadores econômicos com coleta automática (via API gratuita).
* Layout responsivo (mobile/desktop).
* Armazenamento de dados no Supabase.
* Agendamento de tarefas de atualização automática (cron).

---

## 💪 Futuro (escalável)

* Autenticação de usuários.
* Alertas por email personalizados.
* Previsão com modelo estatístico/ML leve (TensorFlow.js).
* Cadastro de novos fertilizantes ou indicadores via painel admin.
