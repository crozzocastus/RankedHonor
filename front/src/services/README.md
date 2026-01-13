# Services Directory / Diretório de Serviços

## English

This directory contains service layer modules that handle business logic and API interactions.

### Purpose

Services provide:

- Abstraction layer between components and data sources
- Business logic implementation
- API call encapsulation
- Data transformation and validation
- Mock data management (during development)

### Current Services

- **auth.service.ts** - Authentication service
  - User login/registration
  - User data management
  - LocalStorage operations
  - Mock user data for development

### Service Layer Benefits

1. **Separation of Concerns**
   - Components focus on UI
   - Services handle data and logic
   - Easier to test and maintain

2. **Reusability**
   - Same service used by multiple components
   - Consistent data handling across app
   - Single place to update logic

3. **Abstraction**
   - Hide implementation details
   - Easy to switch from mock to real API
   - Consistent interface regardless of data source

### Example Service Structure

```typescript
// services/auth.service.ts
export async function loginUser(nickname: string, password: string): Promise<User | null> {
  // API call or mock implementation
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ nickname, password }),
  });
  return response.json();
}

export function getSavedUser(): User | null {
  // LocalStorage operations
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
```

### Usage in Components

```tsx
import { loginUser } from "@/services/auth.service";

function LoginComponent() {
  const handleLogin = async () => {
    const user = await loginUser(nickname, password);
    if (user) {
      // Handle successful login
    }
  };
}
```

---

## Português

Este diretório contém módulos de camada de serviço que lidam com lógica de negócio e interações com API.

### Propósito

Serviços fornecem:

- Camada de abstração entre componentes e fontes de dados
- Implementação de lógica de negócio
- Encapsulamento de chamadas de API
- Transformação e validação de dados
- Gerenciamento de dados mock (durante desenvolvimento)

### Serviços Atuais

- **auth.service.ts** - Serviço de autenticação
  - Login/registro de usuário
  - Gerenciamento de dados do usuário
  - Operações de LocalStorage
  - Dados de usuário mock para desenvolvimento

### Benefícios da Camada de Serviço

1. **Separação de Responsabilidades**
   - Componentes focam em UI
   - Serviços lidam com dados e lógica
   - Mais fácil de testar e manter

2. **Reusabilidade**
   - Mesmo serviço usado por múltiplos componentes
   - Tratamento consistente de dados na app
   - Lugar único para atualizar lógica

3. **Abstração**
   - Ocultar detalhes de implementação
   - Fácil trocar de mock para API real
   - Interface consistente independente da fonte de dados

### Exemplo de Estrutura de Serviço

```typescript
// services/auth.service.ts
export async function loginUser(nickname: string, password: string): Promise<User | null> {
  // Chamada de API ou implementação mock
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ nickname, password }),
  });
  return response.json();
}

export function getSavedUser(): User | null {
  // Operações de LocalStorage
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
```

### Uso em Componentes

```tsx
import { loginUser } from "@/services/auth.service";

function LoginComponent() {
  const handleLogin = async () => {
    const user = await loginUser(nickname, password);
    if (user) {
      // Lidar com login bem-sucedido
    }
  };
}
```
