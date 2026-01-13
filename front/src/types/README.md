# Types Directory / Diretório de Tipos

## English

This directory contains TypeScript type definitions and interfaces used throughout the application.

### Purpose

Centralized type definitions provide:

- Type safety across the application
- Clear data structure contracts
- Better IDE autocomplete and IntelliSense
- Documentation of data shapes
- Reusable type definitions

### Current Types

- **user.ts** - User and UserStats interfaces
  - User profile structure
  - Game statistics structure
  - Profile visibility settings

- **auth.ts** - Authentication-related types
  - AuthContext interface
  - Authentication function signatures

- **index.ts** - Barrel export file for easy imports

### Best Practices

1. **Organization**
   - Group related types in domain-specific files
   - Use index.ts for convenient imports
   - Keep types close to where they're used

2. **Naming Conventions**
   - Use PascalCase for interfaces and types: `User`, `UserStats`
   - Prefix interfaces with "I" only if needed: `IUserService`
   - Suffix with descriptive names: `AuthContextType`, `LoginResponse`

3. **Interface vs Type**
   - Use `interface` for object shapes (can be extended)
   - Use `type` for unions, intersections, and primitives

   ```typescript
   interface User {
     id: string;
     name: string;
   }

   type Status = "active" | "inactive" | "pending";
   ```

4. **Documentation**
   - Add JSDoc comments for complex types
   - Document required vs optional properties
   - Explain business logic constraints

### Example Structure

```typescript
// types/user.ts
export interface User {
  id: string;
  nickname: string;
  email: string;
  stats?: UserStats;
}

export interface UserStats {
  wins: number;
  losses: number;
  winRate: number;
}

// types/index.ts
export type { User, UserStats } from "./user";
export type { AuthContextType } from "./auth";
```

### Usage

```tsx
import type { User } from "@/types";
// or
import type { User } from "@/types/user";

function UserProfile({ user }: { user: User }) {
  return <div>{user.nickname}</div>;
}
```

---

## Português

Este diretório contém definições de tipos TypeScript e interfaces usadas em toda a aplicação.

### Propósito

Definições de tipos centralizadas fornecem:

- Type safety em toda a aplicação
- Contratos claros de estrutura de dados
- Melhor autocomplete e IntelliSense da IDE
- Documentação de formatos de dados
- Definições de tipo reutilizáveis

### Tipos Atuais

- **user.ts** - Interfaces User e UserStats
  - Estrutura de perfil do usuário
  - Estrutura de estatísticas do jogo
  - Configurações de visibilidade do perfil

- **auth.ts** - Tipos relacionados à autenticação
  - Interface AuthContext
  - Assinaturas de funções de autenticação

- **index.ts** - Arquivo de exportação barrel para imports fáceis

### Boas Práticas

1. **Organização**
   - Agrupe tipos relacionados em arquivos específicos de domínio
   - Use index.ts para imports convenientes
   - Mantenha tipos próximos de onde são usados

2. **Convenções de Nomenclatura**
   - Use PascalCase para interfaces e tipos: `User`, `UserStats`
   - Prefixe interfaces com "I" apenas se necessário: `IUserService`
   - Sufixe com nomes descritivos: `AuthContextType`, `LoginResponse`

3. **Interface vs Type**
   - Use `interface` para formas de objetos (podem ser estendidas)
   - Use `type` para uniões, interseções e primitivos

   ```typescript
   interface User {
     id: string;
     name: string;
   }

   type Status = "ativo" | "inativo" | "pendente";
   ```

4. **Documentação**
   - Adicione comentários JSDoc para tipos complexos
   - Documente propriedades obrigatórias vs opcionais
   - Explique restrições de lógica de negócio

### Exemplo de Estrutura

```typescript
// types/user.ts
export interface User {
  id: string;
  nickname: string;
  email: string;
  stats?: UserStats;
}

export interface UserStats {
  wins: number;
  losses: number;
  winRate: number;
}

// types/index.ts
export type { User, UserStats } from "./user";
export type { AuthContextType } from "./auth";
```

### Uso

```tsx
import type { User } from "@/types";
// ou
import type { User } from "@/types/user";

function UserProfile({ user }: { user: User }) {
  return <div>{user.nickname}</div>;
}
```
