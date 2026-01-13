# Hooks Directory / Diretório de Hooks

## English

This directory contains custom React hooks for encapsulating and reusing component logic.

### Purpose

Custom hooks allow you to extract component logic into reusable functions. They:

- Follow React hooks rules (start with "use")
- Can use other hooks internally
- Make code more maintainable and testable
- Promote DRY (Don't Repeat Yourself) principles

### Current Hooks

- **useLocalStorage.ts** - Hook for managing localStorage with React state synchronization
- **index.ts** - Barrel export file for easy imports

### Usage Example

```tsx
import { useLocalStorage } from "@/hooks";

function MyComponent() {
  const [value, setValue] = useLocalStorage("key", "defaultValue");

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### Best Practices

- Name hooks with "use" prefix (e.g., `useAuth`, `useWindowSize`)
- Keep hooks focused and single-purpose
- Document parameters and return values
- Test hooks independently
- Consider extracting complex logic from components into hooks

---

## Português

Este diretório contém hooks React customizados para encapsular e reutilizar lógica de componentes.

### Propósito

Hooks customizados permitem extrair lógica de componentes em funções reutilizáveis. Eles:

- Seguem as regras dos hooks React (começam com "use")
- Podem usar outros hooks internamente
- Tornam o código mais manutenível e testável
- Promovem princípios DRY (Don't Repeat Yourself)

### Hooks Atuais

- **useLocalStorage.ts** - Hook para gerenciar localStorage com sincronização de estado React
- **index.ts** - Arquivo de exportação barrel para imports fáceis

### Exemplo de Uso

```tsx
import { useLocalStorage } from "@/hooks";

function MeuComponente() {
  const [valor, setValor] = useLocalStorage("chave", "valorPadrao");

  return <input value={valor} onChange={(e) => setValor(e.target.value)} />;
}
```

### Boas Práticas

- Nomeie hooks com prefixo "use" (ex: `useAuth`, `useWindowSize`)
- Mantenha hooks focados e com propósito único
- Documente parâmetros e valores de retorno
- Teste hooks independentemente
- Considere extrair lógica complexa de componentes para hooks
