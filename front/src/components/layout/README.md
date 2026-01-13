# Layout Components / Componentes de Layout

## English

This directory contains structural layout components that define the page structure and navigation.

### Purpose

Layout components provide the structural foundation for pages:

- Define page structure and navigation
- Ensure consistent layout across pages
- Handle responsive design
- Manage navigation state and user interactions

### Current Components

- **Header.tsx** - Main application header with navigation
- **Footer.tsx** - Application footer with links and info
- **Navbar.tsx** - Primary navigation component

### Usage

Layout components are typically used in Next.js layout files:

```tsx
// app/layout.tsx or app/(dashboard)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Best Practices

- Keep layout components focused on structure
- Handle responsive design with mobile-first approach
- Use semantic HTML elements (header, nav, footer, main)
- Manage navigation state efficiently
- Consider accessibility (ARIA labels, keyboard navigation)

---

## Português

Este diretório contém componentes de layout estrutural que definem a estrutura da página e navegação.

### Propósito

Componentes de layout fornecem a fundação estrutural para páginas:

- Definem estrutura de página e navegação
- Garantem layout consistente entre páginas
- Lidam com design responsivo
- Gerenciam estado de navegação e interações do usuário

### Componentes Atuais

- **Header.tsx** - Cabeçalho principal da aplicação com navegação
- **Footer.tsx** - Rodapé da aplicação com links e informações
- **Navbar.tsx** - Componente de navegação primária

### Uso

Componentes de layout são tipicamente usados em arquivos de layout do Next.js:

```tsx
// app/layout.tsx ou app/(dashboard)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Boas Práticas

- Mantenha componentes de layout focados em estrutura
- Lide com design responsivo com abordagem mobile-first
- Use elementos HTML semânticos (header, nav, footer, main)
- Gerencie estado de navegação eficientemente
- Considere acessibilidade (labels ARIA, navegação por teclado)
