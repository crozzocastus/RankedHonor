# Utils Directory / Diretório de Utilitários

## English

This directory contains utility functions and helper modules used throughout the application.

### Purpose

Utility functions are pure, reusable functions that:

- Perform common operations (formatting, validation, etc.)
- Don't depend on React or component state
- Can be easily tested in isolation
- Promote code reuse and maintainability

### Common Utilities to Add

- Date/time formatting functions
- String manipulation helpers
- Number formatters (currency, percentages, etc.)
- Data transformation utilities
- Validation helpers
- Array/object manipulation functions

### Usage Example

```tsx
// Example utility function
export function formatWinRate(wins: number, total: number): string {
  return ((wins / total) * 100).toFixed(1) + "%";
}

// In component
import { formatWinRate } from "@/utils/stats";
const winRate = formatWinRate(50, 100); // "50.0%"
```

### Best Practices

- Keep functions pure (same input = same output)
- Export individual functions, not default exports
- Add JSDoc comments for complex functions
- Write unit tests for utilities
- Group related utilities in separate files

---

## Português

Este diretório contém funções utilitárias e módulos auxiliares usados em toda a aplicação.

### Propósito

Funções utilitárias são funções puras e reutilizáveis que:

- Executam operações comuns (formatação, validação, etc.)
- Não dependem de React ou estado de componente
- Podem ser facilmente testadas isoladamente
- Promovem reuso de código e manutenibilidade

### Utilitários Comuns para Adicionar

- Funções de formatação de data/hora
- Auxiliares de manipulação de strings
- Formatadores de números (moeda, porcentagens, etc.)
- Utilitários de transformação de dados
- Auxiliares de validação
- Funções de manipulação de arrays/objetos

### Exemplo de Uso

```tsx
// Exemplo de função utilitária
export function formatWinRate(wins: number, total: number): string {
  return ((wins / total) * 100).toFixed(1) + "%";
}

// No componente
import { formatWinRate } from "@/utils/stats";
const winRate = formatWinRate(50, 100); // "50.0%"
```

### Boas Práticas

- Mantenha funções puras (mesma entrada = mesma saída)
- Exporte funções individuais, não exportações default
- Adicione comentários JSDoc para funções complexas
- Escreva testes unitários para utilitários
- Agrupe utilitários relacionados em arquivos separados
