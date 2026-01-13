# GitHub Actions Workflows

Este diretório contém todos os workflows de CI/CD para o projeto RankedHonor.

## 📋 Workflows Ativos

### Frontend

#### `ci-frontend.yml`
Pipeline de integração contínua para o frontend Next.js.

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`
- Apenas quando há mudanças em `front/**`

**Jobs:**
1. **lint** - ESLint, Prettier, Type checking
2. **test** - Testes com Vitest e cobertura
3. **build** - Build do Next.js

**Node.js:** 20.x | **Cache:** npm

---

#### `cd-frontend.yml`
Pipeline de deploy contínuo para o frontend.

**Triggers:**
- Push para `main` (produção)
- Pull requests (preview deploys)
- Manual dispatch

**Environments:**
- **production** - Deploy para Vercel (produção)
- **preview** - Deploy de preview para PRs

**Secrets necessários:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_API_URL`

---

### Segurança

#### `security.yml`
Scanning de segurança automático.

**Triggers:**
- Push/PR para `main` ou `develop`
- Agendado diariamente às 2am UTC

**Jobs:**
1. **npm-audit** - Vulnerabilidades em dependências npm
2. **secret-scanning** - Detecção de secrets com Gitleaks
3. **dependency-review** - Análise de dependências em PRs
4. **codeql** - Análise estática de código (SAST)

---

### Dependências

#### `dependabot.yml`
Atualização automática de dependências.

**Configuração:**
- **npm (frontend)** - Semanalmente (segunda, 9am)
- **GitHub Actions** - Mensalmente
- PRs agrupados por categoria (radix-ui, react, next, dev-deps)

---

## 🚧 Workflows Template (Futuros)

### Backend Rust - `ci-backend-rust.yml.template`

Pipeline preparado para backend Rust.

**Quando ativar:**
1. Renomear arquivo removendo `.template`
2. Criar diretório `back/rust/`
3. Configurar `Cargo.toml`

**Inclui:**
- `cargo fmt`, `cargo clippy`
- Testes com cobertura (tarpaulin)
- Build release
- Cache de dependências

---

### Backend Python - `ci-backend-python.yml.template`

Pipeline preparado para backend Python.

**Quando ativar:**
1. Renomear arquivo removendo `.template`
2. Criar diretório `back/python/`
3. Configurar `requirements.txt` e `requirements-dev.txt`

**Inclui:**
- Black (formatação)
- isort (imports)
- Flake8 (linting)
- mypy (type checking)
- pytest com cobertura
- Matrix: Python 3.11 e 3.12

---

### Launcher - `ci-launcher.yml.template`

Pipeline preparado para aplicação launcher (Electron/Tauri).

**Quando ativar:**
1. Renomear arquivo removendo `.template`
2. Criar diretório `launcher/`
3. Configurar package.json

**Inclui:**
- Build multi-plataforma (Linux, Windows, macOS)
- Testes cross-platform
- Artifacts por sistema operacional

---

## 🔧 Configuração Local

### Pré-requisitos
```bash
cd front
npm install
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento

# Qualidade de código
npm run lint             # ESLint
npm run format           # Prettier (escrever)
npm run format:check     # Prettier (apenas verificar)
npm run type-check       # TypeScript

# Testes
npm run test             # Rodar testes
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com cobertura

# Build
npm run build            # Build de produção
npm run start            # Iniciar servidor de produção
```

### Git Hooks (Husky)

**Pre-commit:**
- Roda `lint-staged` automaticamente
- Formata código (Prettier)
- Executa ESLint em arquivos modificados

---

## 📊 Badges de Status

Adicione ao README principal:

```markdown
![CI Frontend](https://github.com/crozzo/RankedHonor/actions/workflows/ci-frontend.yml/badge.svg)
![Security](https://github.com/crozzo/RankedHonor/actions/workflows/security.yml/badge.svg)
![CD Frontend](https://github.com/crozzo/RankedHonor/actions/workflows/cd-frontend.yml/badge.svg)
```

---

## 🎯 Roadmap CI/CD

### ✅ Implementado
- [x] CI Frontend (lint, test, build)
- [x] CD Frontend (Vercel)
- [x] Security scanning
- [x] Dependabot
- [x] Husky + lint-staged
- [x] Vitest + Testing Library
- [x] Templates para backend/launcher

### 🔮 Próximos Passos
- [ ] Backend Rust pipeline
- [ ] Backend Python pipeline
- [ ] Launcher pipeline
- [ ] Docker containerization
- [ ] E2E tests (Playwright)
- [ ] Performance monitoring (Lighthouse CI)
- [ ] Visual regression testing

---

## 🛠️ Troubleshooting

### Erro: "npm audit" falhou
```bash
# Verificar vulnerabilidades localmente
cd front && npm audit

# Corrigir automaticamente (pode ter breaking changes)
npm audit fix
```

### Erro: Coverage abaixo do mínimo
```bash
# Ver relatório de cobertura
npm run test:coverage
# Abrir relatório HTML
open front/coverage/index.html
```

### Erro: Build do Next.js
```bash
# Limpar cache e reconstruir
rm -rf front/.next
npm run build
```

---

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vitest Guide](https://vitest.dev/guide/)
- [Dependabot Configuration](https://docs.github.com/code-security/dependabot)
