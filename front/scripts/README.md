# Guia de Adição de Ícones de Heróis

Este guia explica como adicionar e processar ícones de heróis para o projeto RankedHonor.

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Encontrando Imagens](#encontrando-imagens)
4. [Processando Ícones](#processando-ícones)
5. [Adicionando ao Projeto](#adicionando-ao-projeto)
6. [Documentando Créditos](#documentando-créditos)
7. [Testando](#testando)

---

## 🎯 Visão Geral

O RankedHonor permite que usuários selecionem ícones de heróis do For Honor como avatar de perfil. Os ícones devem:

- Focar no **rosto/capacete** característico de cada herói
- Ter **128x128px** de tamanho
- Usar **fundo transparente** (PNG)
- Manter **consistência visual** entre todos os heróis
- Estar **otimizados** para web (tamanho de arquivo reduzido)

### Heróis Prioritários

Comece com os heróis padrão de cada facção:

1. **Knights**: Warden
2. **Vikings**: Raider
3. **Samurai**: Kensei
4. **Wu Lin**: Tiandi
5. **Outlanders**: Pirate

---

## ⚙️ Pré-requisitos

As ferramentas necessárias já estão instaladas:

- ✅ **ImageMagick** (para redimensionamento e edição)
- ✅ **pngquant** (para otimização)

Para verificar:

```bash
convert --version
pngquant --version
```

---

## 🔍 Encontrando Imagens

### Fontes Recomendadas

#### 1. **For Honor Wiki** (Fandom)
- URL: https://forhonor.fandom.com/
- Busque por cada herói (ex: "Warden", "Raider")
- Verifique a licença (geralmente CC BY-SA)
- Baixe imagens do rosto/capacete

#### 2. **DeviantArt** (Creative Commons)
```
1. Acesse: https://www.deviantart.com/
2. Busque: "For Honor [hero name] icon" ou "For Honor [hero name] helmet"
3. Filtros → License → Creative Commons
4. Verifique a licença específica de cada obra
5. Baixe e credite o artista
```

#### 3. **Wikimedia Commons**
- URL: https://commons.wikimedia.org/
- Busque: "For Honor" ou nomes específicos de heróis
- Todas as imagens são domínio público ou CC

#### 4. **ArtStation**
- URL: https://www.artstation.com/
- Busque: "For Honor heroes"
- **IMPORTANTE**: Sempre verifique a licença e peça permissão ao artista

#### 5. **Google Images** (com filtro de licença)
```
1. Busque: "For Honor [hero name] helmet"
2. Ferramentas → Direitos de uso → Creative Commons
3. Sempre verifique a licença na fonte original
```

### Termos de Busca Efetivos

- `For Honor warden icon`
- `For Honor raider helmet face`
- `For Honor kensei mask portrait`
- `For Honor hero icons pack`

### ⚠️ Licenças Aceitas

✅ **Permitidas**:
- CC0 (Domínio Público)
- CC BY (Atribuição)
- CC BY-SA (Atribuição-CompartilhaIgual)
- Permissão explícita do artista

❌ **Evitar**:
- Assets oficiais da Ubisoft (copyright)
- "Todos os direitos reservados"
- Imagens sem licença clara

---

## 🎨 Processando Ícones

### Usando o Script Automático

O script `process-hero-icons.sh` automatiza todo o processamento:

#### Processar Um Arquivo

```bash
cd /home/crozzo/Documentos/GitHub/RankedHonor/front

# Sintaxe básica
./scripts/process-hero-icons.sh input.png output.png

# Exemplo: Processar ícone do Warden
./scripts/process-hero-icons.sh ~/Downloads/warden-raw.png public/icons/heroes/knights/warden.png
```

#### Processar Múltiplos Arquivos (Batch)

```bash
# Organize suas imagens brutas em um diretório
mkdir -p ~/forhonor-raw-icons
# (coloque todos os arquivos brutos nesta pasta)

# Processe tudo de uma vez
./scripts/process-hero-icons.sh -b ~/forhonor-raw-icons/

# Os arquivos processados estarão em: ~/forhonor-raw-icons/processed/
```

#### Opções Avançadas

```bash
# Tamanho customizado (256x256px)
./scripts/process-hero-icons.sh -s 256 input.png output.png

# Qualidade específica (0-100)
./scripts/process-hero-icons.sh -q 95 input.png output.png

# Combinando opções
./scripts/process-hero-icons.sh -s 256 -q 95 input.png output.png

# Ver todas as opções
./scripts/process-hero-icons.sh --help
```

### O Que o Script Faz

1. **Redimensiona** para 128x128px mantendo proporção
2. **Centraliza** a imagem no canvas
3. **Aplica fundo transparente**
4. **Otimiza** com pngquant (reduz tamanho ~50-70%)
5. **Valida** o resultado

---

## 📁 Adicionando ao Projeto

### Estrutura de Diretórios

```
front/public/icons/heroes/
├── CREDITS.md
├── README.md
├── knights/
│   ├── warden.png
│   ├── peacekeeper.png
│   ├── conqueror.png
│   └── ...
├── vikings/
│   ├── raider.png
│   ├── warlord.png
│   └── ...
├── samurai/
│   ├── kensei.png
│   ├── shugoki.png
│   └── ...
├── wu-lin/
│   ├── tiandi.png
│   ├── jiang-jun.png
│   └── ...
└── outlanders/
    ├── pirate.png
    ├── medjay.png
    └── ...
```

### Convenção de Nomes

- Use **lowercase** (minúsculas)
- Use **hífens** para espaços: `black-prior.png`, `jiang-jun.png`
- Use nomes em **inglês** (IDs do sistema)
- Extensão: `.png` (SVG também suportado, mas PNG preferível para fanart)

### Lista Completa de IDs

**Knights**: warden, peacekeeper, conqueror, lawbringer, centurion, gladiator, black-prior, warmonger, gryphon

**Vikings**: raider, warlord, berserker, valkyrie, highlander, shaman, jormungandr, varangian-guard

**Samurai**: kensei, shugoki, orochi, nobushi, shinobi, aramusha, hitokiri, kyoshin, sohei

**Wu Lin**: tiandi, jiang-jun, nuxia, shaolin, zhanhu

**Outlanders**: pirate, medjay, afeera, ocelotl, khatun, virtuosa

---

## 📝 Documentando Créditos

**IMPORTANTE**: Sempre documente a fonte de cada ícone em `CREDITS.md`

### Exemplo de Entrada

```markdown
### Warden
- **Arquivo**: `knights/warden.png`
- **Artista**: John Doe
- **Fonte**: https://www.deviantart.com/johndoe/art/warden-icon-12345
- **Licença**: CC BY 4.0
- **Data de Adição**: 14/01/2026
- **Notas**: Modificado para 128x128px, otimizado
```

### Quando Adicionar Créditos

1. **Imediatamente** após adicionar cada ícone
2. Mesmo para imagens CC0/domínio público (boa prática)
3. Inclua **link direto** para a fonte original
4. Se modificou a imagem, mencione em "Notas"

---

## 🧪 Testando

### 1. Verificar Arquivo

```bash
# Ver informações da imagem
identify public/icons/heroes/knights/warden.png

# Deve mostrar: warden.png PNG 128x128 ...

# Ver tamanho do arquivo
du -h public/icons/heroes/knights/warden.png

# Idealmente < 20KB por ícone
```

### 2. Testar no Navegador

```bash
# Iniciar o servidor de desenvolvimento
cd /home/crozzo/Documentos/GitHub/RankedHonor/front
npm run dev
```

1. Acesse http://localhost:3000
2. Faça login ou registre-se
3. Vá para a página de perfil (`/profile`)
4. Clique no avatar para abrir o seletor
5. Verifique se o ícone aparece corretamente
6. Teste a seleção e salvamento

### 3. Verificar Fallback

Se um ícone estiver faltando, o sistema deve:
- Tentar carregar `.svg` primeiro
- Tentar carregar `.png` se SVG falhar
- Mostrar círculo com gradiente e iniciais se ambos falharem

---

## 📊 Checklist de Qualidade

Antes de considerar um ícone pronto:

- [ ] Imagem focada no rosto/capacete do herói
- [ ] 128x128px de tamanho
- [ ] Fundo transparente (PNG)
- [ ] Tamanho de arquivo < 20KB
- [ ] Nome do arquivo correto (lowercase, hífens)
- [ ] Localização correta na pasta da facção
- [ ] Créditos documentados em CREDITS.md
- [ ] Testado no navegador (visível e carregando)
- [ ] Consistente visualmente com outros ícones

---

## 🎯 Workflow Completo (Exemplo: Warden)

```bash
# 1. Baixe a imagem
# (Manual: navegue até a fonte e baixe)

# 2. Processe a imagem
cd /home/crozzo/Documentos/GitHub/RankedHonor/front
./scripts/process-hero-icons.sh ~/Downloads/warden-fanart.png public/icons/heroes/knights/warden.png

# 3. Verifique o resultado
identify public/icons/heroes/knights/warden.png
du -h public/icons/heroes/knights/warden.png

# 4. Documente os créditos
nano public/icons/heroes/CREDITS.md
# (Adicione a entrada do Warden)

# 5. Teste no navegador
npm run dev
# (Acesse http://localhost:3000/profile)

# 6. Commit
git add public/icons/heroes/knights/warden.png
git add public/icons/heroes/CREDITS.md
git commit -m "feat: adiciona ícone do herói Warden"
```

---

## 🔄 Processamento em Lote (Todos os Heróis)

Se você tiver muitas imagens prontas:

```bash
# 1. Organize as imagens brutas
mkdir -p ~/forhonor-icons-raw/{knights,vikings,samurai,wu-lin,outlanders}

# Coloque cada imagem na pasta correta com nome correto:
# ~/forhonor-icons-raw/knights/warden.png
# ~/forhonor-icons-raw/vikings/raider.png
# etc.

# 2. Processe cada facção
./scripts/process-hero-icons.sh -b ~/forhonor-icons-raw/knights/
./scripts/process-hero-icons.sh -b ~/forhonor-icons-raw/vikings/
./scripts/process-hero-icons.sh -b ~/forhonor-icons-raw/samurai/
./scripts/process-hero-icons.sh -b ~/forhonor-icons-raw/wu-lin/
./scripts/process-hero-icons.sh -b ~/forhonor-icons-raw/outlanders/

# 3. Mova os processados para o projeto
cp ~/forhonor-icons-raw/knights/processed/*.png public/icons/heroes/knights/
cp ~/forhonor-icons-raw/vikings/processed/*.png public/icons/heroes/vikings/
cp ~/forhonor-icons-raw/samurai/processed/*.png public/icons/heroes/samurai/
cp ~/forhonor-icons-raw/wu-lin/processed/*.png public/icons/heroes/wu-lin/
cp ~/forhonor-icons-raw/outlanders/processed/*.png public/icons/heroes/outlanders/

# 4. Documente TODOS os créditos em CREDITS.md
# 5. Teste tudo no navegador
```

---

## ❓ FAQ

**P: Posso usar screenshots do jogo?**
R: Tecnicamente sim, mas não é ideal. Prefira fanart com licença apropriada. Screenshots podem ter problemas de copyright.

**P: E se não encontrar fanart para um herói específico?**
R: Você pode:
1. Criar um ícone simples/minimalista
2. Usar um placeholder temporário
3. Pedir permissão a artistas do For Honor
4. Comissionar um artista (se houver orçamento)

**P: Preciso processar com o script?**
R: Sim! O script garante consistência visual e otimização. Mesmo que a imagem já tenha 128x128px, rode pelo script.

**P: Posso usar SVG em vez de PNG?**
R: Sim, o sistema suporta SVG (e até prefere), mas para fanart geralmente PNG é mais fácil de obter.

**P: O que fazer se o herói não tem capacete visível?**
R: Foque no rosto/máscara/característica visual mais icônica do herói.

---

## 📞 Ajuda

Se encontrar problemas:

1. Verifique se as ferramentas estão instaladas: `convert --version && pngquant --version`
2. Revise o output do script (mensagens de erro são descritivas)
3. Confira se o nome do arquivo está correto (lowercase, hífens)
4. Teste a imagem original em um visualizador antes de processar
5. Verifique permissões de arquivo: `ls -la public/icons/heroes/knights/`

---

**Última Atualização**: 14/01/2026
