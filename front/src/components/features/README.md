# Features Components / Componentes de Features

## English

This directory contains feature-specific components organized by business domain.

### Purpose

Feature components encapsulate specific functionality and business logic related to core application features. They:

- Contain business logic specific to a feature
- May use multiple UI components
- Can manage local state and side effects
- Are composed to create full features

### Structure

- **auth/** - Authentication components (login forms, registration, auth modals)
- **profile/** - User profile components (profile display, edit forms, stats)
- **ranking/** - Ranking and leaderboard components

### When to Use

Create feature components when:

- Logic is specific to a business domain
- Component needs feature-specific state management
- You're combining multiple UI components for a feature
- Component implements specific business rules

### Example Structure

```
features/
  auth/
    AuthModal.tsx       # Main authentication modal
    LoginForm.tsx       # Login form (if split)
    RegisterForm.tsx    # Registration form (if split)
  profile/
    UserProfile.tsx     # User profile display
    ProfileEditor.tsx   # Profile editing interface
    StatsDisplay.tsx    # Statistics visualization
  ranking/
    RankingBoard.tsx    # Leaderboard display
    RankCard.tsx        # Individual rank card
```

---

## Português

Este diretório contém componentes específicos de features organizados por domínio de negócio.

### Propósito

Componentes de features encapsulam funcionalidade específica e lógica de negócio relacionada às features principais da aplicação. Eles:

- Contêm lógica de negócio específica de uma feature
- Podem usar múltiplos componentes UI
- Podem gerenciar estado local e efeitos colaterais
- São compostos para criar features completas

### Estrutura

- **auth/** - Componentes de autenticação (formulários de login, registro, modais de auth)
- **profile/** - Componentes de perfil do usuário (exibição de perfil, formulários de edição, estatísticas)
- **ranking/** - Componentes de ranking e tabelas de líderes

### Quando Usar

Crie componentes de features quando:

- A lógica é específica de um domínio de negócio
- O componente precisa de gerenciamento de estado específico da feature
- Você está combinando múltiplos componentes UI para uma feature
- O componente implementa regras de negócio específicas

### Exemplo de Estrutura

```
features/
  auth/
    AuthModal.tsx       # Modal principal de autenticação
    LoginForm.tsx       # Formulário de login (se dividido)
    RegisterForm.tsx    # Formulário de registro (se dividido)
  profile/
    UserProfile.tsx     # Exibição do perfil do usuário
    ProfileEditor.tsx   # Interface de edição de perfil
    StatsDisplay.tsx    # Visualização de estatísticas
  ranking/
    RankingBoard.tsx    # Exibição da tabela de líderes
    RankCard.tsx        # Card individual de rank
```
