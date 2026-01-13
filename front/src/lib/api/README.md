# API Directory / Diretório API

## English

This directory contains API client configuration and related utilities.

### Purpose
The API directory centralizes:
- HTTP client setup (Axios, Fetch, etc.)
- Base URL configuration
- Request/response interceptors
- API endpoint definitions
- Common API utilities

### Typical Contents

1. **client.ts / http.ts**
   - Configure HTTP client
   - Set base URL from environment variables
   - Add default headers
   - Setup authentication headers

2. **interceptors.ts**
   - Request interceptors (add tokens, logging)
   - Response interceptors (error handling, data transformation)

3. **endpoints.ts**
   - Define API endpoint constants
   - Type-safe endpoint builders

### Example Setup
```typescript
// lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Português

Este diretório contém configuração do cliente API e utilitários relacionados.

### Propósito
O diretório API centraliza:
- Setup de cliente HTTP (Axios, Fetch, etc.)
- Configuração de URL base
- Interceptadores de request/response
- Definições de endpoints da API
- Utilitários comuns de API

### Conteúdos Típicos

1. **client.ts / http.ts**
   - Configurar cliente HTTP
   - Definir URL base de variáveis de ambiente
   - Adicionar headers padrão
   - Setup de headers de autenticação

2. **interceptors.ts**
   - Interceptadores de request (adicionar tokens, logging)
   - Interceptadores de response (tratamento de erro, transformação de dados)

3. **endpoints.ts**
   - Definir constantes de endpoints da API
   - Construtores de endpoints type-safe

### Exemplo de Setup
```typescript
// lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar token de auth às requisições
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
