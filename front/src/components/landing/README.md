# Landing Components / Componentes da Landing Page

## English

This directory contains all components specific to the landing/home page.

### Purpose
Landing components create the marketing and promotional sections of the home page:
- Showcase product features and benefits
- Engage visitors and encourage sign-ups
- Provide information about the game/platform
- Display social proof and community content

### Current Components

- **ContentCreators.tsx** - Showcase content creators and streamers
- **FinalCTA.tsx** - Final call-to-action section
- **Footer.tsx** - Landing page footer (specific to landing)
- **GameModes.tsx** - Display available game modes
- **Header.tsx** - Landing page header with navigation
- **HeroSection.tsx** - Main hero section with primary CTA
- **LauncherSection.tsx** - Information about the launcher/app
- **MainFeed.tsx** - Main activity/news feed
- **QuickActions.tsx** - Quick action buttons/links
- **RankingsSection.tsx** - Preview of ranking system
- **Sidebar.tsx** - Landing page sidebar with widgets

### Organization
Each component represents a distinct section of the landing page, making it easy to:
- Reorder sections
- A/B test different layouts
- Maintain and update individual sections
- Reuse components on other marketing pages

### Usage Example
```tsx
// app/page.tsx (Landing Page)
import { HeroSection } from '@/components/landing/HeroSection';
import { GameModes } from '@/components/landing/GameModes';
import { RankingsSection } from '@/components/landing/RankingsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <GameModes />
      <RankingsSection />
      <FinalCTA />
    </>
  );
}
```

---

## Português

Este diretório contém todos os componentes específicos da página inicial/landing.

### Propósito
Componentes de landing criam as seções de marketing e promocionais da página inicial:
- Mostrar recursos e benefícios do produto
- Engajar visitantes e encorajar cadastros
- Fornecer informações sobre o jogo/plataforma
- Exibir prova social e conteúdo da comunidade

### Componentes Atuais

- **ContentCreators.tsx** - Mostrar criadores de conteúdo e streamers
- **FinalCTA.tsx** - Seção final de call-to-action
- **Footer.tsx** - Rodapé da landing page (específico da landing)
- **GameModes.tsx** - Exibir modos de jogo disponíveis
- **Header.tsx** - Cabeçalho da landing page com navegação
- **HeroSection.tsx** - Seção hero principal com CTA primário
- **LauncherSection.tsx** - Informações sobre o launcher/app
- **MainFeed.tsx** - Feed principal de atividades/notícias
- **QuickActions.tsx** - Botões/links de ações rápidas
- **RankingsSection.tsx** - Prévia do sistema de ranking
- **Sidebar.tsx** - Sidebar da landing page com widgets

### Organização
Cada componente representa uma seção distinta da landing page, facilitando:
- Reordenar seções
- Fazer testes A/B de diferentes layouts
- Manter e atualizar seções individuais
- Reutilizar componentes em outras páginas de marketing

### Exemplo de Uso
```tsx
// app/page.tsx (Landing Page)
import { HeroSection } from '@/components/landing/HeroSection';
import { GameModes } from '@/components/landing/GameModes';
import { RankingsSection } from '@/components/landing/RankingsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <GameModes />
      <RankingsSection />
      <FinalCTA />
    </>
  );
}
```
