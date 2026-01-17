# 📚 Índice de Documentação - RankedHonor

Bem-vindo à documentação completa do **RankedHonor**, uma plataforma de estatísticas avançadas e comunidade para jogadores de For Honor.

## 🎯 Documentos Principais

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Visão e Objetivos](docs/VISAO_E_OBJETIVOS.md) | ✅ Completo | Propósito da plataforma, público-alvo, diferenciais e roadmap |
| [Status do Projeto](docs/STATUS_PROJETO.md) | ✅ Completo | Estado atual de desenvolvimento e próximos passos |
| [Privacidade e Ética](docs/PRIVACIDADE_E_ETICA.md) | ✅ Completo | Modelo opt-in, políticas de privacidade e conformidade legal |
| [Modelo de Negócio](docs/monetizacao/MODELO_DE_NEGOCIO.md) | ✅ Completo | Planos gratuitos, premium e estratégia de monetização |

## 🏗️ Arquitetura

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Visão Geral da Arquitetura](docs/arquitetura/VISAO_GERAL.md) | ✅ Completo | Arquitetura completa do sistema com diagramas |
| [Backend - Arquitetura Detalhada](back/docs/ARCHITECTURE.md) | 🚧 Atualizado | Arquitetura backend com serviços Rust e Python |
| [Backend - Especificação da API](back/docs/API_SPEC.md) | 🚧 Atualizado | Endpoints REST completos com exemplos |
| [Estratégia de Banco de Dados](back/database/DATABASE.md) | ✅ Completo | MySQL, MongoDB e Redis - quando usar cada um |

## 🖥️ Launcher (Tauri)

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Launcher - README](launcher/README.md) | ✅ Completo | Visão geral e guia de início rápido |
| [Especificação Técnica](docs/launcher/ESPECIFICACAO_TECNICA.md) | ✅ Completo | Detalhes técnicos: OCR, detecção, comunicação com backend |

## 🎮 Features da Plataforma

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Sistema de Métricas](docs/features/SISTEMA_METRICAS.md) | ✅ Completo | Análises oferecidas: rankings, desempenho, comparações |
| [Validação de Dados](docs/features/VALIDACAO_DE_DADOS.md) | ✅ Completo | Validação cruzada de partidas entre múltiplos usuários |
| [Sistema de Clãs](docs/features/SISTEMA_CLAS.md) | ✅ Completo | Estrutura de clãs, hierarquia e rankings |
| [Sistema de Torneios](docs/features/SISTEMA_TORNEIOS.md) | ✅ Completo | Criação, gestão e monetização de torneios |
| [Feed Social](docs/features/FEED_SOCIAL.md) | ✅ Completo | Posts, interações, notificações e moderação |
| [Sistema Premium](docs/features/SISTEMA_PREMIUM.md) | ✅ Completo | Benefícios para jogadores competitivos e criadores |

## 🔗 Integrações com Redes Sociais

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Integração Twitch](docs/integracoes/TWITCH.md) | ✅ Completo | OAuth, compartilhamento automático, analytics |
| [Integração YouTube](docs/integracoes/YOUTUBE.md) | ✅ Completo | Upload de highlights, embeddings, analytics |
| [Integração Instagram](docs/integracoes/INSTAGRAM.md) | ✅ Completo | Stories, posts automáticos, badges |
| [Integração TikTok](docs/integracoes/TIKTOK.md) | ✅ Completo | Clips curtos, trending, crescimento de audiência |

## 💻 Frontend (Next.js)

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Frontend - README](front/README.md) | ✅ Completo | Setup, stack tecnológico e scripts |
| [Sistema de Facções](front/FACTION_SYSTEM_IMPLEMENTATION.md) | ✅ Completo | 37 heróis, 5 facções, implementação completa |
| [Exemplos de Facções](front/FACTION_SYSTEM_EXAMPLES.md) | ✅ Completo | Casos de uso e exemplos de código |
| [Guia de Ícones de Heróis](front/HERO_ICONS_IMPLEMENTATION.md) | ✅ Completo | Pipeline de processamento de ícones |
| [Guia de Imagens de Heróis](front/HERO_IMAGES_GUIDE.md) | ✅ Completo | Especificações e convenções de imagens |
| [Estrutura de Código](front/src/README.md) | ✅ Completo | Organização de componentes, hooks, services, etc. |

## 🦀 Backend (Rust + Python)

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Backend - README](back/README.md) | 🚧 Skeleton | Visão geral dos serviços backend |
| [Python API - README](back/python-api/README.md) | 🚧 Skeleton | FastAPI com uv - endpoints planejados |
| [Rust Core - README](back/rust-core/README.md) | 🚧 Skeleton | Serviços de alta performance em Rust |

## 📖 Guias para Desenvolvedores

| Documento | Status | Descrição |
|-----------|--------|-----------|
| [Guia de Contribuição](docs/guias/CONTRIBUINDO.md) | ✅ Completo | Workflow Git, padrões de código, code review |
| [Configuração de Ambiente](docs/guias/AMBIENTE.md) | ✅ Completo | Setup completo para desenvolvimento local |
| [Estratégia de Testes](CI_CD_IMPLEMENTATION.md) | ✅ Completo | CI/CD, testes automatizados, GitHub Actions |

## 🗂️ Estrutura de Pastas

```
RankedHonor/
├── docs/                           # 📚 Documentação centralizada
│   ├── arquitetura/               # Arquitetura do sistema
│   ├── launcher/                  # Especificações do launcher
│   ├── features/                  # Documentação de features
│   ├── integracoes/               # Integrações com redes sociais
│   ├── monetizacao/               # Modelo de negócio
│   └── guias/                     # Guias para desenvolvedores
├── front/                         # Frontend Next.js (✅ 85% completo)
│   ├── src/                       # Código-fonte
│   ├── public/                    # Assets estáticos
│   └── scripts/                   # Scripts de processamento
├── back/                          # Backend (📋 10% completo)
│   ├── python-api/                # API REST em Python/FastAPI
│   ├── rust-core/                 # Serviços core em Rust
│   ├── database/                  # Schemas e migrations
│   └── docs/                      # Documentação técnica
└── launcher/                      # Launcher Tauri (📋 0% - próximo)
```

## 🔍 Legenda de Status

- ✅ **Completo** - Documentação finalizada e código implementado
- 🚧 **Em Desenvolvimento** - Código em progresso, documentação atualizada
- 📋 **Planejado** - Documentação completa, implementação pendente
- ⚠️ **Skeleton** - Estrutura básica criada, aguardando implementação

## 🚀 Por Onde Começar?

### Para Novos Desenvolvedores
1. Leia [Visão e Objetivos](docs/VISAO_E_OBJETIVOS.md) para entender o propósito
2. Configure o ambiente com [Guia de Ambiente](docs/guias/AMBIENTE.md)
3. Veja [Status do Projeto](docs/STATUS_PROJETO.md) para saber em que fase estamos
4. Consulte [Guia de Contribuição](docs/guias/CONTRIBUINDO.md) antes de contribuir

### Para Entender a Arquitetura
1. Comece com [Visão Geral da Arquitetura](docs/arquitetura/VISAO_GERAL.md)
2. Aprofunde-se em [Backend - Arquitetura](back/docs/ARCHITECTURE.md)
3. Entenda o fluxo de dados no [Launcher - Especificação](docs/launcher/ESPECIFICACAO_TECNICA.md)

### Para Trabalhar no Frontend
1. Siga o [Frontend README](front/README.md)
2. Entenda o [Sistema de Facções](front/FACTION_SYSTEM_IMPLEMENTATION.md)
3. Explore a [Estrutura de Código](front/src/README.md)

### Para Desenvolver o Launcher
1. Comece com [Launcher README](launcher/README.md)
2. Estude a [Especificação Técnica](docs/launcher/ESPECIFICACAO_TECNICA.md)
3. Revise [Privacidade e Ética](docs/PRIVACIDADE_E_ETICA.md)

## 📊 Progresso Geral do Projeto

| Componente | Documentação | Implementação |
|------------|--------------|---------------|
| Frontend | ✅ 95% | ✅ 85% |
| Launcher | ✅ 100% | 📋 0% |
| Backend | ✅ 100% | 📋 10% |
| CI/CD | ✅ 100% | ✅ 100% |
| Integrações | ✅ 100% | 📋 0% |

---

**Última atualização:** Janeiro 2026  
**Mantenedores:** [@crozzo](https://github.com/crozzo) e equipe

Para dúvidas ou sugestões, abra uma issue ou consulte o [Guia de Contribuição](docs/guias/CONTRIBUINDO.md).
