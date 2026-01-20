# Guia de Contribuição - RankedHonor

Bem-vindo(a) ao RankedHonor! Este guia tem como objetivo padronizar o onboarding e facilitar a contribuição de novos desenvolvedores para o frontend, backend e launcher.

## Tópicos Obrigatórios em Cada README
- Visão Geral do Projeto
- Stack Tecnológico
- Estrutura de Pastas
- Setup do Ambiente
- Como Rodar/Testar
- Fluxo de Contribuição
- Próximos Passos / Funcionalidades em Falta
- Contato e Suporte

## Como Contribuir
1. **Escolha uma stack:** Frontend (Next.js), Backend (Python/Rust), Launcher (Tauri).
2. **Leia o README da stack escolhida.**
3. **Veja a lista de funcionalidades em falta/próximos passos** (abaixo e no Project Board).
4. **Abra uma issue ou comente em uma existente** para sinalizar interesse.
5. **Crie um fork/branch, desenvolva e envie um Pull Request.**
6. **Descreva claramente o que foi feito e relacione com a issue/milestone.**

## Project Board
- As tarefas e funcionalidades pendentes estão organizadas no [Project Board do GitHub](https://github.com/crozzo/RankedHonor/projects).
- Sempre consulte o board para ver prioridades e status.

## Funcionalidades em Falta / Próximos Passos
### Frontend
- Integração real com backend (substituir mocks)
- Sistema de autenticação completo (NextAuth)
- Testes unitários (>70% coverage)
- Otimização de performance (Lighthouse >90)
- Acessibilidade (a11y)

### Backend Python
- Endpoints de autenticação
- Endpoint POST /matches/submit
- Sistema de validação cruzada
- Cálculo de estatísticas básicas
- Rankings globais (top 100)
- API de perfis públicos

### Backend Rust
- Game server operacional
- WebSocket server para real-time
- Processamento de MMR
- Auth library integrada

### Launcher
- Detecção de processo For Honor
- Captura de screenshot
- OCR básico (Tesseract)
- UI de login/configurações
- Integração com backend
- System tray icon

## Dúvidas e Suporte
Abra uma issue ou entre em contato com @crozzo.

---

Consulte também:
- [README principal](../../README.md)
- [Status do Projeto](../STATUS_PROJETO.md)
- [Visão Geral da Arquitetura](../arquitetura/VISAO_GERAL.md)
