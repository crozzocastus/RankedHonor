# RankedHonor

![CI Frontend](https://github.com/crozzo/RankedHonor/actions/workflows/ci-frontend.yml/badge.svg)
![Security](https://github.com/crozzo/RankedHonor/actions/workflows/security.yml/badge.svg)

> Plataforma de jogos competitivos com sistema de ranking, matchmaking e integração com streaming.

## 📋 Sobre o Projeto

RankedHonor é uma plataforma completa para jogos competitivos que oferece:

- 🎮 **Sistema de Ranking** - Rankings dinâmicos e progressão competitiva
- ⚔️ **Matchmaking** - Sistema inteligente de emparelhamento de jogadores
- 📺 **Integração com Streaming** - Conecte com Twitch e outras plataformas
- 👥 **Comunidade** - Sistema social e perfis de jogadores
- 🚀 **Game Launcher** - Cliente dedicado para melhor experiência

## 🏗️ Arquitetura (Monorepo)

```
RankedHonor/
├── front/          # Frontend Next.js (✅ Ativo)
├── back/           # Backend Rust + Python (🚧 Futuro)
└── launcher/       # Game Launcher (🚧 Futuro)
```

### Status dos Componentes

| Componente | Status | Stack | CI/CD |
|------------|--------|-------|-------|
| **Frontend** | ✅ Ativo | Next.js 16 + React 19 + TypeScript | ✅ Configurado |
| **Backend** | 🚧 Planejado | Rust + Python | 📋 Template pronto |
| **Launcher** | 🚧 Planejado | Electron/Tauri | 📋 Template pronto |

## 🚀 Quick Start

### Frontend

```bash
cd front
npm install
cp .env.example .env
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Backend (Futuro)

```bash
cd back
# Instruções serão adicionadas quando implementado
```

### Launcher (Futuro)

```bash
cd launcher
# Instruções serão adicionadas quando implementado
```

## 🔧 Tech Stack

### Frontend (Atual)
- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **Components:** Radix UI
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier

### Backend (Planejado)
- **Core:** Rust (performance crítica, game server)
- **API Services:** Python (FastAPI/Django)
- **Database:** PostgreSQL + Redis
- **Real-time:** WebSockets

### Launcher (Planejado)
- **Framework:** Electron ou Tauri
- **Language:** TypeScript
- **Features:** Auto-updates, game installation, overlay

## 🔄 CI/CD

O projeto possui pipelines completas de CI/CD configuradas:

### ✅ Ativos
- **CI Frontend** - Lint, test, build automático
- **CD Frontend** - Deploy automático para Vercel
- **Security** - Scanning diário de vulnerabilidades
- **Dependabot** - Atualização automática de dependências

### 📋 Templates Prontos
- Backend Rust pipeline
- Backend Python pipeline
- Launcher multi-plataforma pipeline

Ver documentação completa em [.github/README.md](.github/README.md)

## 🧪 Testing

```bash
cd front
npm run test              # Rodar testes
npm run test:coverage     # Com cobertura
```

**Cobertura mínima configurada:** 70%

## 📦 Scripts Disponíveis

### Frontend
```bash
npm run dev           # Desenvolvimento
npm run build         # Build de produção
npm run lint          # ESLint
npm run format        # Prettier
npm run type-check    # TypeScript check
npm run test          # Vitest
```

## 🔐 Segurança

- ✅ Dependabot ativo para atualizações automáticas
- ✅ Gitleaks para detecção de secrets
- ✅ CodeQL para análise estática (SAST)
- ✅ Dependency review em PRs
- ✅ npm audit em CI

## 🌍 Environment Variables

Cada componente possui seu `.env.example`:

- [front/.env.example](front/.env.example)
- `back/.env.example` (futuro)
- `launcher/.env.example` (futuro)

## 📚 Documentação

- [Frontend README](front/README.md)
- [CI/CD Documentation](.github/README.md)
- Backend README (futuro)
- Launcher README (futuro)

## 🗺️ Roadmap

### ✅ Fase 1 - Frontend (Concluído)
- [x] Setup Next.js com TypeScript
- [x] UI Components (Radix UI)
- [x] Sistema de rotas e layouts
- [x] CI/CD completo
- [x] Testing infrastructure

### 🚧 Fase 2 - Backend (Em Planejamento)
- [ ] Setup Rust + Python
- [ ] Sistema de autenticação
- [ ] API REST + GraphQL
- [ ] WebSocket server
- [ ] Database schema
- [ ] CI/CD backend

### 🔮 Fase 3 - Launcher (Futuro)
- [ ] Cliente desktop
- [ ] Auto-updater
- [ ] Game installation manager
- [ ] In-game overlay
- [ ] CI/CD multi-plataforma

### 🎯 Fase 4 - Integrations
- [ ] Twitch/YouTube integration
- [ ] Discord bot
- [ ] Análise de replays
- [ ] Sistema de torneios

## 🤝 Contribuindo

```bash
# 1. Fork o projeto
# 2. Crie uma branch
git checkout -b feature/nome-da-feature

# 3. Commit suas mudanças
git commit -m 'feat: adiciona nova feature'

# 4. Push para a branch
git push origin feature/nome-da-feature

# 5. Abra um Pull Request
```

**Convenção de commits:** [Conventional Commits](https://www.conventionalcommits.org/)

## 📝 License

Este projeto está sob licença MIT. Ver [LICENSE](LICENSE) para mais detalhes.

## 👥 Authors

- **crozzo** - Desenvolvedor Principal

## 🔗 Links

- **Website:** (em breve)
- **Discord:** (em breve)
- **Twitter:** (em breve)

---

**Status do Projeto:** 🚧 Em Desenvolvimento Ativo

Última atualização: Janeiro 2026
