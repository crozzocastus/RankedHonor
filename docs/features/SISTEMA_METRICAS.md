# 📊 Sistema de Métricas - RankedHonor

## Visão Geral

O Sistema de Métricas do RankedHonor oferece análises detalhadas e comparativas que não existem no For Honor oficial, permitindo que jogadores entendam exatamente seu nível de performance e onde podem melhorar.

## Métricas Básicas (Gratuitas)

### Rankings Globais
- **Top 100 por herói** - Ranking dos melhores jogadores com cada um dos 37 heróis
- **Top 100 geral** - Melhores jogadores da plataforma
- **Ranking de clãs** - Top 50 clãs por performance média

### Estatísticas Pessoais
- **Win/Loss Ratio** por herói e modo de jogo
- **KDA** (Kills/Deaths/Assists) geral e por herói
- **Tempo jogado** total e por herói
- **Heróis mais jogados** (top 5)
- **Performance vs média global** (% acima ou abaixo)

### Comparações Básicas
- **Percentil global** - "Você está no top 15% dos jogadores"
- **Comparação com médias** - Performance relativa em cada métrica

## Métricas Avançadas (Premium)

### Rankings Detalhados
- **Rankings regionais** - Europa, América do Norte, América do Sul, Ásia, Oceania
- **Rankings por servidor** - Seu servidor específico
- **Rankings por modo** - Duels, Brawls, Dominion, Breach, etc.
- **Rankings históricos** - Evolução da sua posição ao longo do tempo

### Análises Profundas
- **Performance por herói** (todas 37 análises individuais):
  - Win rate, KDA, tempo jogado
  - Matchups favoráveis/desfavoráveis
  - Performance em diferentes mapas
  - Tendências temporais (últimos 7/30/90 dias)
  
- **Performance por modo de jogo**:
  - Dominion: Pontos capturados, mortes em zona, K/D
  - Duels: Win streak máximo, performance vs diferentes heróis
  - Breach: Dano ao comandante, defesas bem-sucedidas
  
- **Análise de oponentes**:
  - Win rate contra heróis específicos
  - Performance contra jogadores de diferentes níveis
  - Identificação de "nemeses" (jogadores que te derrotam frequentemente)

### Tendências e Predições
- **Gráficos de progressão** - MMR, win rate, KDA ao longo de semanas/meses/anos
- **Análise de picos e quedas** - "Sua performance melhorou 15% nos últimos 30 dias"
- **Predição de MMR** - Baseada em performance recente
- **Recomendações de melhoria** - "Você perde 70% das lutas contra Kensei, pratique este matchup"

### Heatmaps e Padrões
- **Melhores/piores mapas** para você
- **Melhores/piores horários** - Performance por hora do dia/dia da semana
- **Session tracking** - Performance em sessões longas vs curtas
- **Streaks** - Identificação de win/loss streaks e causas

## Métricas Comparativas Únicas

### Contextualizadas
- **Desempenho relativo por herói**: "Você é 25% melhor que a média com Warden"
- **Posição por herói**: "Você é o 437º melhor Lawbringer globalmente"
- **Comparação regional**: "Você está no top 5% da América do Sul, mas top 18% globalmente"

### Multi-dimensional
- **Radar charts** comparando múltiplas métricas simultaneamente
- **Score composto** considerando win rate, KDA, consistência, tempo jogado
- **Tier lists personalizadas** - Seus melhores heróis rankeados

## Integração com Validação Cruzada

### Níveis de Confiança
Cada métrica mostra seu nível de confiança:
- ✅ **Alta (95%+)**: Validada por 3+ usuários
- ⚠️ **Média (80-95%)**: Validada por 1-2 usuários
- 📋 **Baixa (<80%)**: Apenas seu registro

### Dados Agregados
Quanto mais usuários RankedHonor na mesma partida, mais precisa a métrica:
- **1 usuário**: Dados básicos
- **2-3 usuários**: Validação cruzada, alta confiança
- **4+ usuários**: Dados premium desbloqueados (posições, movimentação)

## Visualizações

### Dashboards
- **Dashboard principal**: Overview com métricas-chave
- **Dashboard por herói**: Deep dive em um herói específico
- **Dashboard comparativo**: Você vs amigos/rivais

### Gráficos Suportados
- Line charts (tendências temporais)
- Bar charts (comparações)
- Radar charts (multi-dimensional)
- Heatmaps (mapas/horários)
- Pie charts (distribuição)

## Exportação de Dados (Premium)

### Formatos
- **CSV** - Para análise em Excel/Google Sheets
- **JSON** - Para desenvolvedores/integrações
- **PDF** - Relatórios formatados para impressão

### Frequência
- **Sob demanda** - Export manual quando quiser
- **Agendado** - Reports automáticos semanais/mensais por email

## API Pessoal (Premium)

Acesse suas métricas programaticamente:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.rankedhonor.gg/v1/users/me/stats/heroes/warden
```

Ideal para:
- Overlays customizados para stream
- Bots de Discord personalizados
- Dashboards customizados

## Métricas de Comunidade

### Agregadas
- **Meta atual**: Heróis mais jogados, win rates médios
- **Tier lists comunitárias**: Baseadas em dados reais
- **Tendências**: Heróis em ascensão/queda

### Rankings de Clãs
- Performance média do clã
- Membros mais ativos
- Comparação com outros clãs

---

**Ver também:**
- [Sistema de Validação de Dados](VALIDACAO_DE_DADOS.md)
- [Sistema Premium](SISTEMA_PREMIUM.md)
- [Modelo de Negócio](../monetizacao/MODELO_DE_NEGOCIO.md)
