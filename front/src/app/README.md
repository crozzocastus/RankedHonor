# App Directory / Diretório App

## English

This directory contains the Next.js 13+ App Router structure, which defines the application's routes, pages, and layouts.

### Purpose

The App Router uses the file system to define routes:

- Each folder is a route segment
- `page.tsx` files create publicly accessible pages
- `layout.tsx` files define shared UI for route segments
- Route groups `(name)` organize without affecting URL structure

### Structure

- **globals.css** - Global styles for the entire application
- **layout.tsx** - Root layout wrapping all pages
- **page.tsx** - Home page (landing page)
- **(auth)/** - Authentication routes group (login, register)
- **(dashboard)/** - Dashboard routes group (dashboard, profile, ranked)

### Route Groups

Route groups `(name)` allow you to:

- Organize routes logically without affecting URLs
- Apply different layouts to different route groups
- Keep related routes together

### Example Routes

- `/` → `page.tsx` (Landing page)
- `/login` → `(auth)/login/page.tsx`
- `/register` → `(auth)/register/page.tsx`
- `/dashboard` → `(dashboard)/dashboard/page.tsx`
- `/profile` → `(dashboard)/profile/page.tsx`
- `/ranked` → `(dashboard)/ranked/page.tsx`

---

## Português

Este diretório contém a estrutura do Next.js 13+ App Router, que define as rotas, páginas e layouts da aplicação.

### Propósito

O App Router usa o sistema de arquivos para definir rotas:

- Cada pasta é um segmento de rota
- Arquivos `page.tsx` criam páginas publicamente acessíveis
- Arquivos `layout.tsx` definem UI compartilhada para segmentos de rota
- Grupos de rotas `(nome)` organizam sem afetar estrutura de URL

### Estrutura

- **globals.css** - Estilos globais para toda a aplicação
- **layout.tsx** - Layout raiz envolvendo todas as páginas
- **page.tsx** - Página inicial (landing page)
- **(auth)/** - Grupo de rotas de autenticação (login, registro)
- **(dashboard)/** - Grupo de rotas do dashboard (dashboard, perfil, ranked)

### Grupos de Rotas

Grupos de rotas `(nome)` permitem:

- Organizar rotas logicamente sem afetar URLs
- Aplicar layouts diferentes a grupos diferentes de rotas
- Manter rotas relacionadas juntas

### Exemplo de Rotas

- `/` → `page.tsx` (Página inicial)
- `/login` → `(auth)/login/page.tsx`
- `/register` → `(auth)/register/page.tsx`
- `/dashboard` → `(dashboard)/dashboard/page.tsx`
- `/profile` → `(dashboard)/profile/page.tsx`
- `/ranked` → `(dashboard)/ranked/page.tsx`
