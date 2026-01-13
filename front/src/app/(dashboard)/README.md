# Dashboard Routes Group / Grupo de Rotas do Dashboard

## English

This route group contains all authenticated user dashboard pages.

### Purpose

- Groups all dashboard-related pages
- Applies shared dashboard layout with navigation
- Requires authentication to access
- The `(dashboard)` folder name doesn't appear in URLs

### Pages

- **dashboard/** - Main dashboard page with overview and quick actions
- **profile/** - User profile management and statistics
- **ranked/** - Ranked matchmaking and leaderboards

### Features

- Shared dashboard layout with header, sidebar, navigation
- Authentication protection (redirects to login if not authenticated)
- Consistent navigation between dashboard sections
- User context available to all pages

### URL Structure

- `/dashboard` - Main dashboard
- `/profile` - User profile
- `/ranked` - Ranked matches

Note: The `(dashboard)` folder name is not part of the URL

---

## Português

Este grupo de rotas contém todas as páginas do dashboard de usuários autenticados.

### Propósito

- Agrupa todas as páginas relacionadas ao dashboard
- Aplica layout compartilhado do dashboard com navegação
- Requer autenticação para acessar
- O nome da pasta `(dashboard)` não aparece nas URLs

### Páginas

- **dashboard/** - Página principal do dashboard com visão geral e ações rápidas
- **profile/** - Gerenciamento de perfil do usuário e estatísticas
- **ranked/** - Matchmaking ranqueado e tabelas de líderes

### Funcionalidades

- Layout compartilhado do dashboard com cabeçalho, sidebar, navegação
- Proteção de autenticação (redireciona para login se não autenticado)
- Navegação consistente entre seções do dashboard
- Contexto do usuário disponível para todas as páginas

### Estrutura de URLs

- `/dashboard` - Dashboard principal
- `/profile` - Perfil do usuário
- `/ranked` - Partidas ranqueadas

Nota: O nome da pasta `(dashboard)` não faz parte da URL
