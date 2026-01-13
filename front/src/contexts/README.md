# Contexts Directory / Diretório de Contextos

## English

This directory contains React Context providers for managing global application state.

### Purpose
React Contexts provide a way to share data across the component tree without manually passing props through every level. This is ideal for:
- Authentication state
- User preferences
- Theme settings
- Global UI state

### Current Contexts

- **AuthContext.tsx** - Manages user authentication state, login/logout functions, and user profile data

### Usage Example
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      {user ? `Welcome ${user.nickname}` : 'Please login'}
    </div>
  );
}
```

### Best Practices
- Keep contexts focused on a single concern
- Provide meaningful default values
- Create custom hooks for easier consumption
- Avoid overusing contexts for frequently changing data

---

## Português

Este diretório contém provedores de React Context para gerenciar estado global da aplicação.

### Propósito
React Contexts fornecem uma maneira de compartilhar dados através da árvore de componentes sem passar props manualmente por cada nível. Isso é ideal para:
- Estado de autenticação
- Preferências do usuário
- Configurações de tema
- Estado global da UI

### Contextos Atuais

- **AuthContext.tsx** - Gerencia estado de autenticação do usuário, funções de login/logout e dados do perfil

### Exemplo de Uso
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MeuComponente() {
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      {user ? `Bem-vindo ${user.nickname}` : 'Faça login'}
    </div>
  );
}
```

### Boas Práticas
- Mantenha contextos focados em uma única responsabilidade
- Forneça valores padrão significativos
- Crie hooks customizados para facilitar o consumo
- Evite usar contextos em excesso para dados que mudam frequentemente
