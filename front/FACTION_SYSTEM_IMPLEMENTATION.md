# Sistema de Facções e Heróis - Implementação Completa

## ✅ Implementação Finalizada

Sistema completo de facções do For Honor com 37 heróis organizados em 5 facções, permitindo seleção obrigatória de facção no registro e escolha de avatar de herói restrita à facção do usuário.

---

## 📋 Componentes Implementados

### 1. **Constantes de Jogo** (`src/lib/constants/game.constants.ts`)
- ✅ Type `Faction`: "Knights" | "Vikings" | "Samurai" | "Wu Lin" | "Outlanders"
- ✅ Type `HeroClass`: "Vanguardeiro" | "Assassino" | "Pesado" | "Híbrido"
- ✅ Interface `Hero` com id, name, faction, heroClass, releaseOrder
- ✅ `ALL_HEROES`: Array completo com 37 heróis
  - Knights: 9 heróis (Warden → Gryphon)
  - Vikings: 8 heróis (Raider → Varangian Guard)
  - Samurai: 9 heróis (Kensei → Sohei)
  - Wu Lin: 5 heróis (Tiandi → Zhanhu)
  - Outlanders: 6 heróis (Pirate → Virtuosa)
- ✅ `FACTION_NAMES`: Tradução PT-BR das facções
- ✅ `DEFAULT_HEROES_BY_FACTION`: Vanguardeiro de cada facção
- ✅ Funções helper: `getHeroesByFaction()`, `getHeroById()`, `getHeroFaction()`
- ✅ Cache em localStorage: `saveFactionToCache()`, `saveAvatarToCache()`

### 2. **Tipos Atualizados**
- ✅ `User` interface: Campo `faction: Faction` adicionado
- ✅ `AuthContextType`: 
  - `register()` agora aceita `faction` como 4º parâmetro
  - Novo método `changeFaction(newFaction: Faction): void`
- ✅ `auth.constants.ts`: `DEFAULT_FACTION = "Knights"`

### 3. **Estrutura de Diretórios**
```
public/icons/heroes/
├── README.md (documentação completa)
├── knights/
│   └── .gitkeep (warden, peacekeeper, conqueror, etc)
├── vikings/
│   └── .gitkeep (raider, warlord, berserker, etc)
├── samurai/
│   └── .gitkeep (kensei, shugoki, orochi, etc)
├── wu-lin/
│   └── .gitkeep (tiandi, nuxia, jiang-jun, etc)
└── outlanders/
    └── .gitkeep (pirate, medjay, afeera, etc)
```

**Convenção de nomes**: IDs em inglês lowercase com hífens
- Exemplos: `warden.svg`, `black-prior.png`, `varangian-guard.svg`

### 4. **Configuração Next.js** (`next.config.ts`)
- ✅ Configurado `images.unoptimized: false`
- ✅ Formatos suportados: AVIF, WebP
- ✅ Otimização automática de imagens habilitada

### 5. **Página de Registro** (`app/(auth)/register/page.tsx`)
- ✅ Campo select de facção adicionado após email
- ✅ Labels em português usando `FACTION_NAMES`
- ✅ Validação obrigatória de facção
- ✅ aria-label para acessibilidade
- ✅ Avatar padrão definido automaticamente como vanguardeiro da facção
- ✅ Mensagem helper: "Sua facção define seu avatar padrão. Pode ser alterada depois."

### 6. **Serviço de Autenticação** (`services/auth.service.ts`)
- ✅ `registerUser()` atualizado para aceitar `faction`
- ✅ Avatar definido como `DEFAULT_HEROES_BY_FACTION[faction]`
- ✅ Cache automático de facção e avatar no registro
- ✅ Mock user "WarLegend" migrado com `faction: "Knights"`

### 7. **AuthContext** (`contexts/AuthContext.tsx`)
- ✅ `register()` atualizado com parâmetro `faction`
- ✅ Novo método `changeFaction(newFaction)`:
  - Atualiza facção do usuário
  - Reseta avatar para vanguardeiro da nova facção
  - Salva em cache (localStorage)
  - Atualiza mock data
- ✅ `updateProfile()` atualizado para salvar faction/avatar no cache

### 8. **Componente AvatarPicker** (`components/features/profile/AvatarPicker.tsx`)
- ✅ Dialog do shadcn/ui
- ✅ Grid responsivo: 2 colunas (mobile) → 3 colunas (desktop)
- ✅ Filtragem automática por facção do usuário
- ✅ Ícones 80x80px (h-20 w-20)
- ✅ Loading state: skeleton com `animate-pulse`
- ✅ Fallback inteligente:
  1. Tenta carregar `.svg`
  2. Fallback para `.png`
  3. Fallback final: círculo gradiente com 2 letras
- ✅ Hover effects: `border-orange-500/30`, `bg-orange-500/10`, `scale-105`
- ✅ Selected state: `border-orange-500`, `bg-orange-500/20`
- ✅ Indicador visual de seleção (checkmark)
- ✅ Acessibilidade: aria-labels, alt text descritivo
- ✅ Next.js Image component com lazy loading

### 9. **Página de Perfil** (`app/(dashboard)/profile/page.tsx`)
- ✅ Avatar clicável abrindo `AvatarPicker`
- ✅ Exibição de imagem do herói usando Next.js Image
- ✅ Fallback com 2 letras em círculo gradiente
- ✅ Campo de seleção de facção no modo edição
- ✅ `AlertDialog` de confirmação ao mudar facção:
  - Mostra nome da nova facção em português
  - Exibe nome do vanguardeiro que será o novo avatar
  - Botões Cancelar / Confirmar
- ✅ Integração com `changeFaction()` do AuthContext
- ✅ Remoção do array local `heroAvatars` (substituído por constantes globais)
- ✅ Hover effect no avatar: overlay com ícone de Settings

---

## 🎨 Design System Seguido

### Cores
- Primary: `from-orange-500 to-red-600`
- Hover: `from-orange-600 to-red-700`
- Border: `gray-800` → hover: `orange-500/30`
- Background: `gray-900` → hover: `orange-500/10`

### Transições
- `transition-all` (150ms padrão)
- Hover scale: `scale-105`

### Responsividade
- Grid AvatarPicker: `grid-cols-2 md:grid-cols-3`
- Gap padrão: `gap-4` (16px)

---

## 🔧 Funcionalidades

### Registro de Usuário
1. Usuário preenche nickname, email, senha
2. **Seleciona facção obrigatoriamente** (Knights, Vikings, Samurai, Wu Lin, Outlanders)
3. Sistema define avatar padrão como vanguardeiro da facção:
   - Knights → Warden
   - Vikings → Raider
   - Samurai → Kensei
   - Wu Lin → Tiandi
   - Outlanders → Pirate
4. Facção e avatar salvos em cache e mock data

### Mudança de Facção
1. Usuário entra em modo de edição no perfil
2. Seleciona nova facção no dropdown
3. AlertDialog aparece:
   - "Mudar para **Cavaleiros** resetará seu avatar para **Warden**. Confirmar?"
4. Ao confirmar:
   - Facção atualizada
   - Avatar resetado para vanguardeiro
   - Cache atualizado
   - Modal fechado

### Seleção de Avatar
1. Usuário clica na imagem do perfil
2. AvatarPicker abre em Dialog
3. Mostra apenas heróis da facção atual do usuário
4. Grid 3x3 (ou 2 colunas em mobile)
5. Heróis em ordem de lançamento
6. Ao clicar em um herói:
   - Avatar atualizado
   - Cache atualizado
   - Dialog fechado
   - Imagem do perfil atualizada

### Cache em LocalStorage
- `forHonorFactionCache`: `{ [userId]: faction }`
- `forHonorAvatarCache`: `{ [userId]: heroId }`
- Persiste entre sessões
- Atualizado em:
  - Registro
  - Mudança de facção
  - Seleção de avatar
  - Update de perfil

---

## 📝 Próximos Passos

### Para o Usuário
1. **Adicionar imagens dos heróis** em `public/icons/heroes/`
   - Formato preferido: SVG (escalável)
   - Alternativa: PNG 80x80px ou maior
   - Nomear arquivos com IDs dos heróis (lowercase, hífens)

2. **Exemplos de nomes de arquivo**:
   ```
   knights/warden.svg
   knights/black-prior.png
   vikings/raider.svg
   vikings/varangian-guard.png
   samurai/kensei.svg
   wu-lin/jiang-jun.svg
   outlanders/pirate.svg
   ```

### Features Opcionais Futuras
- [ ] Badge de classe do herói no hover (Vanguardeiro, Assassino, etc)
- [ ] Tooltip com nome do herói no AvatarPicker
- [ ] Filtro adicional por classe de herói
- [ ] Animação de transição ao trocar avatar
- [ ] Toast de confirmação ao salvar mudanças
- [ ] Histórico de mudanças de facção

---

## 🐛 Erros Conhecidos

✅ **Nenhum erro de compilação** - Todos os arquivos sem erros TypeScript/ESLint

---

## 📚 Documentação

- [README dos ícones](/front/public/icons/heroes/README.md)
- [README do AvatarPicker](/front/src/components/features/profile/README.md)
- Comentários JSDoc em todas as funções de `game.constants.ts`

---

## 🎯 Resumo da Implementação

- **37 heróis** organizados em 5 facções
- **Seleção obrigatória** de facção no registro
- **Avatar restrito** à facção do usuário
- **Mudança de facção** com reset confirmado
- **Cache persistente** em localStorage
- **Acessibilidade** completa (ARIA labels, alt text)
- **Responsivo** (mobile-first)
- **Fallbacks inteligentes** para imagens
- **Design system** consistente
- **Zero erros** de compilação

✨ **Sistema totalmente funcional e pronto para uso!**
