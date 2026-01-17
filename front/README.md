# RankedHonor - Frontend

![CI Frontend](https://github.com/crozzo/RankedHonor/actions/workflows/ci-frontend.yml/badge.svg)
![Security](https://github.com/crozzo/RankedHonor/actions/workflows/security.yml/badge.svg)
![CD Frontend](https://github.com/crozzo/RankedHonor/actions/workflows/cd-frontend.yml/badge.svg)

Frontend do RankedHonor - Plataforma de jogos competitivos com ranking e matchmaking.

## 🚀 Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Runtime:** React 19.2.3
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **UI Components:** Radix UI
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint, Prettier, Husky

## 📦 Getting Started

### Prerequisites

- Node.js 20.x ou superior
- npm, yarn, pnpm ou bun

### Installation

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

### Development

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm run start
```

## 🧪 Testing

```bash
# Rodar testes
npm run test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

## 🎨 Code Quality

```bash
# Linting
npm run lint

# Formatação (escrever)
npm run format

# Formatação (verificar apenas)
npm run format:check

# Type checking
npm run type-check
```

## 🔧 Git Hooks

O projeto usa Husky para git hooks automáticos:

- **pre-commit:** Roda lint-staged (ESLint + Prettier em arquivos modificados)

## � Code Organization Guidelines

Para manter o código legível e manutenível, seguimos estas diretrizes:

### File Size Limit
- **Máximo recomendado:** ~200 linhas por arquivo
- **Razão:** Arquivos menores são mais fáceis de entender, testar e manter
- **Quando refatorar:** Se um arquivo ultrapassar 200-250 linhas, considere dividir em componentes menores ou extrair lógica para utilitários/services

### Component Structure
- Extrair lógica complexa para hooks customizados
- Mover helpers/utilitários para `lib/utils/`
- Separar componentes grandes em subcomponentes
- Usar services para gerenciamento de dados e cache

### Benefits
- ✅ Melhor legibilidade e navegabilidade
- ✅ Facilita code reviews
- ✅ Reduz acoplamento e melhora testabilidade
- ✅ Promove reutilização de código
- ✅ Facilita manutenção futura

## �📁 Project Structure

```
front/
├── .github/          # GitHub Actions workflows
├── .husky/           # Git hooks
├── public/           # Assets estáticos
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # Componentes React
│   ├── contexts/     # React Contexts
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Bibliotecas e configurações
│   ├── services/     # API services
│   ├── types/        # TypeScript types
│   └── utils/        # Utilitários
├── vitest.config.ts  # Configuração Vitest
└── package.json
```

## 🌍 Environment Variables

Veja [.env.example](.env.example) para todas as variáveis disponíveis.

**Principais:**
- `NEXT_PUBLIC_APP_NAME` - Nome da aplicação
- `NEXT_PUBLIC_API_URL` - URL base da API backend

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)

## 🚢 Deploy

Deploy automático via GitHub Actions para Vercel em push para `main`.

Para deploy manual:
```bash
npm run build
```

Consulte [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

