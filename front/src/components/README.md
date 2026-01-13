# Components Directory / Diretório de Componentes

## English

This directory contains all React components organized by feature, purpose, and reusability.

### Purpose

Components are the building blocks of the React application. This directory is organized to:

- Separate concerns by feature and responsibility
- Promote component reusability
- Make it easy to locate and maintain components
- Follow a clear architectural pattern

### Structure

- **dashboard/** - Dashboard-specific components
- **features/** - Feature-based components (auth, profile, ranking)
- **figma/** - Components imported or designed from Figma
- **landing/** - Landing page components
- **layout/** - Layout components (Header, Footer, Navbar)
- **shared/** - Shared components used across multiple features
- **ui/** - Base UI components library (shadcn/ui)

### Organization Principles

1. **ui/** - Primitive, reusable UI components (buttons, inputs, cards)
2. **shared/** - Composed components used in multiple features
3. **features/** - Feature-specific components with business logic
4. **layout/** - Page structure components
5. **landing/** - Marketing/promotional page components

### Component Naming

- Use PascalCase for component files: `UserProfile.tsx`
- Match component name with filename
- Use descriptive, clear names

---

## Português

Este diretório contém todos os componentes React organizados por feature, propósito e reusabilidade.

### Propósito

Componentes são os blocos de construção da aplicação React. Este diretório é organizado para:

- Separar responsabilidades por feature e responsabilidade
- Promover reusabilidade de componentes
- Facilitar localização e manutenção de componentes
- Seguir um padrão arquitetural claro

### Estrutura

- **dashboard/** - Componentes específicos do dashboard
- **features/** - Componentes baseados em features (auth, profile, ranking)
- **figma/** - Componentes importados ou desenhados do Figma
- **landing/** - Componentes da página inicial
- **layout/** - Componentes de layout (Header, Footer, Navbar)
- **shared/** - Componentes compartilhados usados em múltiplas features
- **ui/** - Biblioteca de componentes UI base (shadcn/ui)

### Princípios de Organização

1. **ui/** - Componentes UI primitivos e reutilizáveis (botões, inputs, cards)
2. **shared/** - Componentes compostos usados em múltiplas features
3. **features/** - Componentes específicos de features com lógica de negócio
4. **layout/** - Componentes de estrutura de página
5. **landing/** - Componentes de páginas de marketing/promocionais

### Nomenclatura de Componentes

- Use PascalCase para arquivos de componente: `UserProfile.tsx`
- Combine nome do componente com nome do arquivo
- Use nomes descritivos e claros
