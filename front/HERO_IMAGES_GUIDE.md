# Guia Rápido: Adicionar Imagens dos Heróis

## 📁 Estrutura de Diretórios

Adicione as imagens dos heróis em:
```
front/public/icons/heroes/
├── knights/
├── vikings/
├── samurai/
├── wu-lin/
└── outlanders/
```

## 🎨 Especificações de Imagens

### Formatos Aceitos
- **SVG** (recomendado) - escalável, tamanho pequeno
- **PNG** (alternativa) - mínimo 80x80px, recomendado 128x128px ou maior
- **WebP/AVIF** - Next.js converterá automaticamente

### Convenção de Nomes
Use **ID em inglês lowercase com hífens**:
- ✅ `warden.svg` ou `warden.png`
- ✅ `black-prior.svg`
- ✅ `varangian-guard.png`
- ❌ ~~`Black Prior.png`~~
- ❌ ~~`black_prior.jpg`~~

## 📝 Lista Completa de Arquivos Necessários

### Knights (Cavaleiros) - 9 arquivos
```bash
knights/warden.svg
knights/peacekeeper.svg
knights/conqueror.svg
knights/lawbringer.svg
knights/centurion.svg
knights/gladiator.svg
knights/black-prior.svg
knights/warmonger.svg
knights/gryphon.svg
```

### Vikings - 8 arquivos
```bash
vikings/raider.svg
vikings/warlord.svg
vikings/berserker.svg
vikings/valkyrie.svg
vikings/highlander.svg
vikings/shaman.svg
vikings/jormungandr.svg
vikings/varangian-guard.svg
```

### Samurai (Samurais) - 9 arquivos
```bash
samurai/kensei.svg
samurai/shugoki.svg
samurai/orochi.svg
samurai/nobushi.svg
samurai/shinobi.svg
samurai/aramusha.svg
samurai/hitokiri.svg
samurai/kyoshin.svg
samurai/sohei.svg
```

### Wu Lin - 5 arquivos
```bash
wu-lin/tiandi.svg
wu-lin/nuxia.svg
wu-lin/jiang-jun.svg
wu-lin/shaolin.svg
wu-lin/zhanhu.svg
```

### Outlanders - 6 arquivos
```bash
outlanders/pirate.svg
outlanders/medjay.svg
outlanders/afeera.svg
outlanders/ocelotl.svg
outlanders/khatun.svg
outlanders/virtuosa.svg
```

## 🔧 Testando

### Método 1: Adicionar algumas imagens de teste
```bash
# Exemplo com Knights
cd front/public/icons/heroes/knights
# Copie suas imagens aqui com os nomes corretos
```

### Método 2: Criar placeholders SVG simples
```bash
# Cria um SVG placeholder para warden
cat > knights/warden.svg << 'EOF'
<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" fill="#ea580c"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="24" fill="white">W</text>
</svg>
EOF
```

## ✅ Verificação

Após adicionar as imagens:

1. **Registre um novo usuário** escolhendo uma facção
2. **Vá para o perfil** e clique na imagem do avatar
3. **Veja o AvatarPicker** mostrando os heróis da sua facção
4. **Selecione um herói** e veja a imagem atualizar

### Comportamento de Fallback

Se a imagem não existir:
1. ⚙️ Tenta carregar `{hero-id}.svg`
2. ⚙️ Se falhar, tenta `{hero-id}.png`
3. ⚙️ Se ambos falharem, mostra círculo com **2 primeiras letras** do nome do herói

Exemplo: Se `warden.svg` não existir, mostra círculo laranja com "WA"

## 🎯 Prioridades

Se não tiver todas as imagens ainda, comece com os **vanguardeiros** (avatares padrão):
1. `knights/warden.svg` ⭐
2. `vikings/raider.svg` ⭐
3. `samurai/kensei.svg` ⭐
4. `wu-lin/tiandi.svg` ⭐
5. `outlanders/pirate.svg` ⭐

## 📦 Fontes de Imagens

### Opções
- Extrair do jogo For Honor (assets oficiais)
- Criar ícones customizados em SVG
- Usar fan art com licença adequada
- Wiki do For Honor (verificar licença)
- Encomender designer para criar set completo

### Recomendações de Estilo
- Fundo transparente ou sólido
- Cores vibrantes que se destaquem no fundo escuro
- Estilo consistente entre todos os heróis
- Foco na silhueta/emblema do herói

## 🚀 Deploy

Depois de adicionar as imagens:
```bash
cd /home/crozzo/Documentos/GitHub/RankedHonor/front
npm run build
npm run dev  # Testa localmente
```

As imagens serão otimizadas automaticamente pelo Next.js!
