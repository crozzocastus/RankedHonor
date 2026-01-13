# Dashboard Components / Componentes do Dashboard

## English

This directory contains components specific to the dashboard section of the application.

### Purpose
Dashboard components provide the interface for authenticated users to:
- View their stats and progress
- Access quick actions
- See personalized content
- Navigate dashboard features

### Current Components

- **DashboardHero.tsx** - Hero section for dashboard with user stats and highlights

### Usage
Dashboard components are used within the dashboard pages:

```tsx
// app/(dashboard)/dashboard/page.tsx
import { DashboardHero } from '@/components/dashboard/DashboardHero';

export default function DashboardPage() {
  return (
    <div>
      <DashboardHero />
      {/* Other dashboard sections */}
    </div>
  );
}
```

### Future Components
Consider adding:
- StatsOverview - Overview cards with key statistics
- RecentMatches - List of recent matches
- QuickActions - Dashboard-specific action buttons
- Achievements - Achievement display

---

## Português

Este diretório contém componentes específicos da seção dashboard da aplicação.

### Propósito
Componentes do dashboard fornecem a interface para usuários autenticados:
- Visualizar suas estatísticas e progresso
- Acessar ações rápidas
- Ver conteúdo personalizado
- Navegar pelas features do dashboard

### Componentes Atuais

- **DashboardHero.tsx** - Seção hero do dashboard com estatísticas e destaques do usuário

### Uso
Componentes do dashboard são usados dentro das páginas do dashboard:

```tsx
// app/(dashboard)/dashboard/page.tsx
import { DashboardHero } from '@/components/dashboard/DashboardHero';

export default function DashboardPage() {
  return (
    <div>
      <DashboardHero />
      {/* Outras seções do dashboard */}
    </div>
  );
}
```

### Componentes Futuros
Considere adicionar:
- StatsOverview - Cards de overview com estatísticas principais
- RecentMatches - Lista de partidas recentes
- QuickActions - Botões de ação específicos do dashboard
- Achievements - Exibição de conquistas
