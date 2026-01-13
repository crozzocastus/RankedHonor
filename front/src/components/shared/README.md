# Shared Components / Componentes Compartilhados

## English

This directory contains components that are shared across multiple features and pages.

### Purpose

Shared components are reusable components that:

- Are used in multiple features or pages
- Don't belong to a specific feature domain
- Combine UI components for common patterns
- May have some business logic but remain general-purpose

### Current Components

- **Hero.tsx** - Hero section component used across pages
- **LiveFeed.tsx** - Live activity/match feed component
- **MatchmakingPanel.tsx** - Matchmaking interface component

### When to Use Shared Components

Place components here when they:

- Are used in 2+ different feature areas
- Provide common functionality across features
- Are too specific for UI library but too general for features
- Implement cross-cutting concerns

### Difference from UI Components

- **UI components** are primitive building blocks (buttons, inputs)
- **Shared components** are composed, reusable patterns (hero sections, feeds)
- **Feature components** are specific to business domains

### Example

```tsx
// Shared component used in multiple pages
import { Hero } from '@/components/shared/Hero';

// In landing page
<Hero title="Welcome" subtitle="Start your journey" />

// In dashboard
<Hero title="Dashboard" subtitle="Your stats" />
```

---

## Português

Este diretório contém componentes compartilhados entre múltiplas features e páginas.

### Propósito

Componentes compartilhados são componentes reutilizáveis que:

- São usados em múltiplas features ou páginas
- Não pertencem a um domínio específico de feature
- Combinam componentes UI para padrões comuns
- Podem ter alguma lógica de negócio mas permanecem de propósito geral

### Componentes Atuais

- **Hero.tsx** - Componente de seção hero usado em várias páginas
- **LiveFeed.tsx** - Componente de feed de atividade/partidas ao vivo
- **MatchmakingPanel.tsx** - Componente de interface de matchmaking

### Quando Usar Componentes Compartilhados

Coloque componentes aqui quando eles:

- São usados em 2+ áreas de features diferentes
- Fornecem funcionalidade comum entre features
- São muito específicos para biblioteca UI mas muito gerais para features
- Implementam preocupações transversais

### Diferença dos Componentes UI

- **Componentes UI** são blocos de construção primitivos (botões, inputs)
- **Componentes compartilhados** são padrões compostos e reutilizáveis (seções hero, feeds)
- **Componentes de features** são específicos para domínios de negócio

### Exemplo

```tsx
// Componente compartilhado usado em múltiplas páginas
import { Hero } from '@/components/shared/Hero';

// Na landing page
<Hero title="Bem-vindo" subtitle="Comece sua jornada" />

// No dashboard
<Hero title="Dashboard" subtitle="Suas estatísticas" />
```
