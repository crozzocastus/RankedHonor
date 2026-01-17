# 🚀 RankedHonor Launcher

O **RankedHonor Launcher** é o componente central da plataforma - um aplicativo desktop leve e não-invasivo que detecta quando você está jogando For Honor, captura automaticamente os resultados das suas partidas via screenshot + OCR/IA local, e envia os dados para a plataforma para análise.

## 🎯 O Que Faz

### Detecção Automática
- Detecta quando For Honor está rodando no seu sistema
- Monitora apenas a janela do jogo (não acessa arquivos ou memória)
- Identifica automaticamente a tela de resultados

### Captura Não-Invasiva
- Captura screenshot da tela de resultados
- Processa localmente com OCR/IA (privacidade garantida)
- Extrai dados de **todos os 8 jogadores** da partida

### Sincronização Inteligente
- Envia dados para a plataforma via HTTPS
- Apenas usuários cadastrados são contabilizados (modelo opt-in)
- Validação cruzada quando múltiplos usuários estão na mesma partida

### Interface Mínima
- System tray icon discreta
- Notificações não-intrusivas
- Configurações simples

---

## 📥 Instalação

### Requisitos do Sistema

**Windows:**
- Windows 10 ou superior (64-bit)
- 100 MB de espaço em disco
- For Honor instalado

**macOS:**
- macOS 11 (Big Sur) ou superior
- 100 MB de espaço em disco
- For Honor instalado

**Linux:**
- Ubuntu 20.04+ / Fedora 36+ / Arch Linux
- 100 MB de espaço em disco
- For Honor instalado via Proton/Wine

### Download

**Versão Atual:** v0.1.0-alpha (Em desenvolvimento)

```bash
# Ainda não disponível para download
# Coming soon: https://rankedhonor.gg/launcher
```

### Instalação Manual (Desenvolvimento)

```bash
# Clone o repositório
git clone https://github.com/crozzo/RankedHonor.git
cd RankedHonor/launcher

# Instale dependências do Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Instale dependências do Tauri
# Windows: Instale WebView2 (geralmente já vem com Win11)
# macOS: Sem dependências adicionais
# Linux: sudo apt install libwebkit2gtk-4.0-dev libgtk-3-dev

# Build
cargo build --release

# Run
cargo tauri dev
```

---

## 🎮 Como Usar

### Primeira Vez

1. **Baixe e instale** o launcher
2. **Faça login** com sua conta RankedHonor (crie uma em [rankedhonor.gg](https://rankedhonor.gg))
3. **Vincule sua conta** do For Honor (nome de usuário Ubisoft/For Honor)
4. **Pronto!** O launcher agora detectará automaticamente suas partidas

### Uso Diário

1. **Deixe o launcher rodando** em background (system tray)
2. **Jogue For Honor** normalmente
3. **Ao fim de cada partida**, o launcher:
   - Detecta a tela de resultados
   - Captura screenshot automaticamente
   - Processa OCR localmente
   - Envia dados ao backend
   - Notifica você do sucesso
4. **Veja suas stats** em tempo real no site

### Configurações

Acesse via system tray icon → Settings:

- **Auto-start:** Iniciar com o sistema
- **Notifications:** Ativar/desativar notificações
- **Screenshot quality:** Qualidade da captura (Alta/Média)
- **OCR language:** Idioma do jogo (EN/PT/ES/FR/DE/IT/RU/JP/KR)
- **Privacy:** Opt-out temporário (pausar coleta)

---

## 🔒 Privacidade e Segurança

### O Que Coletamos

✅ **Coletamos:**
- Screenshot da **tela de resultados** apenas
- Dados extraídos: nomes de jogadores, heróis, scores, modo
- Timestamp da partida
- Seu username vinculado

❌ **NÃO coletamos:**
- Arquivos do jogo
- Memória do processo
- Teclas pressionadas
- Chat ou comunicações
- Dados pessoais além do username

### Como Funciona

1. **Detecção por processo:** Verificamos apenas se `ForHonor.exe` está rodando
2. **Captura de tela pública:** Apenas o que você vê na tela
3. **OCR local:** Processamento 100% no seu computador
4. **Modelo opt-in:** Apenas usuários cadastrados são rastreados
5. **HTTPS:** Todos dados enviados criptografados

### Você Está no Controle

- **Pause a qualquer momento:** Clique no icon → Pause
- **Delete seus dados:** Vá em Settings → Delete my data
- **Desinstale:** Remove tudo, sem rastros

**100% legal e ético.** Não violamos ToS da Ubisoft.

---

## ⚙️ Tecnologias

- **[Tauri 2.x](https://tauri.app/)** - Framework para apps desktop
- **Rust** - Core logic (detecção, captura, OCR)
- **WebView** - UI leve (HTML/CSS/JS)
- **Tesseract OCR** - Extração de texto (ou modelo ML customizado)
- **reqwest** - Cliente HTTP para comunicação com backend

### Por Que Tauri?

- **Leve:** ~5-10 MB vs ~100+ MB do Electron
- **Rápido:** Binário nativo compilado
- **Integração Rust:** Reutiliza código do `rust-core`
- **Cross-platform:** Windows, macOS, Linux com um código
- **Seguro:** Sandboxing e permissões granulares

---

## 🛠️ Desenvolvimento

### Estrutura de Arquivos

```
launcher/
├── src-tauri/              # Backend Rust
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── game_detector.rs # Detecta For Honor
│   │   ├── screen_capture.rs # Captura de tela
│   │   ├── ocr_processor.rs  # OCR/IA
│   │   ├── api_client.rs     # Comunica com backend
│   │   ├── config.rs         # Configurações do app
│   │   └── tray.rs           # System tray icon
│   ├── Cargo.toml
│   ├── tauri.conf.json      # Config do Tauri
│   └── icons/               # App icons
├── src/                    # Frontend (WebView)
│   ├── index.html
│   ├── styles.css
│   └── main.js
└── README.md               # Este arquivo
```

### Comandos Úteis

```bash
# Desenvolvimento (hot reload)
cargo tauri dev

# Build de produção
cargo tauri build

# Testes
cargo test

# Lint
cargo clippy

# Format
cargo fmt
```

### Variáveis de Ambiente

Crie um `.env` em `launcher/`:

```env
API_BASE_URL=http://localhost:8080
WS_BASE_URL=ws://localhost:8001
LOG_LEVEL=info
OCR_MODEL_PATH=./models/tesseract
```

---

## 🐛 Troubleshooting

### Launcher não detecta For Honor

**Solução:**
1. Certifique-se que For Honor está rodando
2. Verifique se o processo se chama `ForHonor.exe` (Task Manager)
3. Tente reiniciar o launcher
4. Se persistir, abra uma issue com logs

### OCR não funciona / dados incorretos

**Solução:**
1. Verifique se o idioma do jogo está configurado corretamente
2. Aumente a qualidade do screenshot nas Settings
3. Certifique-se que a tela de resultados está completamente visível
4. Reporte dados incorretos (ajuda a melhorar o modelo)

### Erro ao enviar dados

**Solução:**
1. Verifique sua conexão com internet
2. Confirme que está logado no launcher
3. Verifique se sua conta RankedHonor está ativa
4. Veja logs em `%APPDATA%/rankedhonor/logs/launcher.log`

### Alto uso de CPU/RAM

**Solução:**
1. Reduza qualidade do screenshot
2. Aumente intervalo de polling (Advanced settings)
3. Feche outros programas pesados durante jogo

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [docs/guias/CONTRIBUINDO.md](../docs/guias/CONTRIBUINDO.md).

**Áreas que precisam de ajuda:**
- Melhorar precisão do OCR
- Suporte para mais idiomas
- Otimização de performance
- Testes em diferentes sistemas
- UI/UX improvements

---

## 📋 Roadmap

### v0.1.0 - Alpha (Q2 2026)
- [x] Estrutura básica do projeto
- [ ] Detecção de processo For Honor
- [ ] Captura de screenshot
- [ ] OCR básico (apenas inglês)
- [ ] Envio de dados ao backend
- [ ] System tray icon

### v0.2.0 - Beta (Q3 2026)
- [ ] Suporte multi-idioma (EN, PT, ES, FR, DE)
- [ ] Validação cruzada
- [ ] Notificações melhoradas
- [ ] Auto-update
- [ ] Configurações avançadas

### v1.0.0 - Release (Q4 2026)
- [ ] OCR com IA (precisão 98%+)
- [ ] Suporte completo Windows/macOS/Linux
- [ ] Dashboard integrado no launcher
- [ ] Replay viewer básico
- [ ] Performance otimizada

---

## 📞 Suporte

- **Discord:** (em breve)
- **Email:** support@rankedhonor.gg
- **Issues:** [GitHub Issues](https://github.com/crozzo/RankedHonor/issues)
- **Docs:** [Especificação Técnica](../docs/launcher/ESPECIFICACAO_TECNICA.md)

---

## 📜 Licença

Ver [LICENSE](../LICENSE) na raiz do projeto.

**Disclaimer:** Este projeto não é afiliado, associado, autorizado, endossado ou de qualquer forma oficialmente conectado com Ubisoft Entertainment ou For Honor. Todos os nomes de produtos, logos e marcas são propriedade de seus respectivos donos.

---

**Última atualização:** Janeiro 2026  
**Versão:** 0.1.0-alpha  
**Status:** 📋 Em desenvolvimento
