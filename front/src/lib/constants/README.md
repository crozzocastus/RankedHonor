# Constants Directory / Diretório de Constantes

## English

This directory contains application-wide constant values organized by domain.

### Purpose

Constants provide:

- Single source of truth for fixed values
- Easy maintenance and updates
- Type safety for configuration values
- Clear separation of configuration from logic

### Current Constants

- **auth.constants.ts** - Authentication-related constants
  - Storage keys
  - Session timeouts
  - API delays (for mocks)
  - Default values (region, avatar, etc.)

### Best Practices

1. **Organization**
   - Group related constants in separate files
   - Use descriptive file names (e.g., `auth.constants.ts`, `game.constants.ts`)

2. **Naming Conventions**
   - Use UPPER_SNAKE_CASE for constants: `AUTH_STORAGE_KEY`
   - Use descriptive names that explain purpose
   - Prefix related constants: `API_BASE_URL`, `API_TIMEOUT`

3. **Types**
   - Use `as const` for literal types
   - Create enums for related constant groups
   - Export types alongside constants when needed

### Example

```typescript
// auth.constants.ts
export const AUTH_STORAGE_KEY = "forHonorUser";
export const AUTH_SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

// game.constants.ts
export const GAME_MODES = ["Duel", "Brawl", "Dominion"] as const;
export type GameMode = (typeof GAME_MODES)[number];

export const MAX_PLAYERS = {
  Duel: 2,
  Brawl: 4,
  Dominion: 8,
} as const;
```

---

## Português

Este diretório contém valores constantes da aplicação organizados por domínio.

### Propósito

Constantes fornecem:

- Fonte única de verdade para valores fixos
- Fácil manutenção e atualizações
- Type safety para valores de configuração
- Separação clara de configuração da lógica

### Constantes Atuais

- **auth.constants.ts** - Constantes relacionadas à autenticação
  - Chaves de armazenamento
  - Timeouts de sessão
  - Delays de API (para mocks)
  - Valores padrão (região, avatar, etc.)

### Boas Práticas

1. **Organização**
   - Agrupe constantes relacionadas em arquivos separados
   - Use nomes de arquivo descritivos (ex: `auth.constants.ts`, `game.constants.ts`)

2. **Convenções de Nomenclatura**
   - Use UPPER_SNAKE_CASE para constantes: `AUTH_STORAGE_KEY`
   - Use nomes descritivos que explicam o propósito
   - Prefixe constantes relacionadas: `API_BASE_URL`, `API_TIMEOUT`

3. **Tipos**
   - Use `as const` para tipos literais
   - Crie enums para grupos de constantes relacionadas
   - Exporte tipos junto com constantes quando necessário

### Exemplo

```typescript
// auth.constants.ts
export const AUTH_STORAGE_KEY = "forHonorUser";
export const AUTH_SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

// game.constants.ts
export const GAME_MODES = ["Duelo", "Briga", "Domínio"] as const;
export type GameMode = (typeof GAME_MODES)[number];

export const MAX_PLAYERS = {
  Duelo: 2,
  Briga: 4,
  Domínio: 8,
} as const;
```
