# Exemplo de Uso do Sistema de Facções

## Fluxo Completo de Usuário

### 1. Registro de Novo Usuário

```tsx
// Usuário preenche o formulário em /register
{
  nickname: "SamuraiWarrior",
  email: "samurai@warrior.com",
  password: "123456",
  faction: "Samurai"  // <- Selecionado no dropdown
}

// Sistema cria usuário:
{
  id: "1234567890",
  nickname: "SamuraiWarrior",
  email: "samurai@warrior.com",
  region: "Global",
  faction: "Samurai",
  avatar: "kensei",  // <- Automaticamente definido como vanguardeiro
  profileVisibility: "public",
  stats: { ... }
}

// Cache salvos em localStorage:
forHonorFactionCache: { "1234567890": "Samurai" }
forHonorAvatarCache: { "1234567890": "kensei" }
```

### 2. Visualização do Perfil

```tsx
// Avatar exibido no perfil
<Image 
  src="/icons/heroes/samurai/kensei.svg"  // ou .png
  alt="Avatar de SamuraiWarrior"
  width={128}
  height={128}
/>

// Se imagem não existir, mostra fallback:
<div className="bg-gradient-to-br from-orange-500 to-red-600">
  KE  {/* Primeiras 2 letras de "Kensei" */}
</div>
```

### 3. Escolher Novo Avatar

```tsx
// Usuário clica no avatar → AvatarPicker abre
// Mostra apenas heróis da facção Samurai:
<AvatarPicker
  currentFaction="Samurai"
  currentAvatar="kensei"
  onSelectAvatar={(heroId) => updateProfile({ avatar: heroId })}
/>

// Grid mostra 9 heróis:
[
  { id: "kensei", name: "Kensei", faction: "Samurai", heroClass: "Vanguardeiro", releaseOrder: 8 },
  { id: "shugoki", name: "Shugoki", faction: "Samurai", heroClass: "Pesado", releaseOrder: 9 },
  { id: "orochi", name: "Orochi", faction: "Samurai", heroClass: "Assassino", releaseOrder: 10 },
  { id: "nobushi", name: "Nobushi", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 11 },
  { id: "shinobi", name: "Shinobi", faction: "Samurai", heroClass: "Assassino", releaseOrder: 12 },
  { id: "aramusha", name: "Aramusha", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 16 },
  { id: "hitokiri", name: "Hitokiri", faction: "Samurai", heroClass: "Pesado", releaseOrder: 21 },
  { id: "kyoshin", name: "Kyoshin", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 29 },
  { id: "sohei", name: "Sohei", faction: "Samurai", heroClass: "Pesado", releaseOrder: 35 }
]

// Usuário seleciona "orochi"
updateProfile({ avatar: "orochi" })
// Cache atualizado: forHonorAvatarCache: { "1234567890": "orochi" }
```

### 4. Mudar de Facção

```tsx
// Usuário entra em modo edição e seleciona "Vikings"
handleFactionChange("Vikings")

// AlertDialog aparece:
<AlertDialog>
  <AlertDialogTitle>Confirmar Mudança de Facção</AlertDialogTitle>
  <AlertDialogDescription>
    Mudar para <strong>Vikings</strong> resetará seu avatar para <strong>Raider</strong>.
    Você poderá escolher outro herói da nova facção depois. Confirmar?
  </AlertDialogDescription>
  
  <AlertDialogCancel>Cancelar</AlertDialogCancel>
  <AlertDialogAction onClick={confirmFactionChange}>Confirmar</AlertDialogAction>
</AlertDialog>

// Ao confirmar:
changeFaction("Vikings")
// Resulta em:
{
  ...user,
  faction: "Vikings",
  avatar: "raider"  // <- Resetado para vanguardeiro
}

// Cache atualizado:
forHonorFactionCache: { "1234567890": "Vikings" }
forHonorAvatarCache: { "1234567890": "raider" }
```

### 5. Escolher Novo Avatar na Nova Facção

```tsx
// Usuário clica no avatar novamente
// AvatarPicker agora mostra heróis Vikings:
<AvatarPicker
  currentFaction="Vikings"
  currentAvatar="raider"
  onSelectAvatar={(heroId) => updateProfile({ avatar: heroId })}
/>

// Grid mostra 8 heróis:
[
  { id: "raider", name: "Raider", faction: "Vikings", heroClass: "Vanguardeiro", releaseOrder: 4 },
  { id: "warlord", name: "Warlord", faction: "Vikings", heroClass: "Pesado", releaseOrder: 5 },
  { id: "berserker", name: "Berserker", faction: "Vikings", heroClass: "Assassino", releaseOrder: 6 },
  { id: "valkyrie", name: "Valkyrie", faction: "Vikings", heroClass: "Híbrido", releaseOrder: 10 },
  { id: "highlander", name: "Highlander", faction: "Vikings", heroClass: "Híbrido", releaseOrder: 11 },
  { id: "shaman", name: "Shaman", faction: "Vikings", heroClass: "Assassino", releaseOrder: 15 },
  { id: "jormungandr", name: "Jormungandr", faction: "Vikings", heroClass: "Pesado", releaseOrder: 22 },
  { id: "varangian-guard", name: "Varangian Guard", faction: "Vikings", heroClass: "Pesado", releaseOrder: 36 }
]

// NÃO mostra heróis de outras facções (Samurai, Knights, etc)
```

## Exemplos de Código

### Obter Heróis de uma Facção

```typescript
import { getHeroesByFaction } from "@/lib/constants/game.constants";

const knightsHeroes = getHeroesByFaction("Knights");
// Retorna 9 heróis ordenados por releaseOrder
console.log(knightsHeroes);
/*
[
  { id: "warden", name: "Warden", faction: "Knights", heroClass: "Vanguardeiro", releaseOrder: 1 },
  { id: "peacekeeper", name: "Peacekeeper", faction: "Knights", heroClass: "Assassino", releaseOrder: 2 },
  { id: "conqueror", name: "Conqueror", faction: "Knights", heroClass: "Pesado", releaseOrder: 3 },
  ...
]
*/
```

### Obter Informações de um Herói

```typescript
import { getHeroById } from "@/lib/constants/game.constants";

const hero = getHeroById("black-prior");
console.log(hero);
/*
{
  id: "black-prior",
  name: "Black Prior",
  faction: "Knights",
  heroClass: "Pesado",
  releaseOrder: 19
}
*/
```

### Traduzir Nome de Facção

```typescript
import { FACTION_NAMES } from "@/lib/constants/game.constants";

const portugueseName = FACTION_NAMES["Wu Lin"];
console.log(portugueseName); // "Wu Lin"

const allFactions = Object.entries(FACTION_NAMES);
console.log(allFactions);
/*
[
  ["Knights", "Cavaleiros"],
  ["Vikings", "Vikings"],
  ["Samurai", "Samurais"],
  ["Wu Lin", "Wu Lin"],
  ["Outlanders", "Outlanders"]
]
*/
```

### Obter Vanguardeiro de uma Facção

```typescript
import { DEFAULT_HEROES_BY_FACTION, getHeroById } from "@/lib/constants/game.constants";

const vanguard = DEFAULT_HEROES_BY_FACTION["Outlanders"];
console.log(vanguard); // "pirate"

const vanguardHero = getHeroById(vanguard);
console.log(vanguardHero);
/*
{
  id: "pirate",
  name: "Pirate",
  faction: "Outlanders",
  heroClass: "Híbrido",  // Outlanders não têm Vanguardeiro, Pirate foi o primeiro
  releaseOrder: 30
}
*/
```

### Verificar Facção de um Herói

```typescript
import { getHeroFaction } from "@/lib/constants/game.constants";

const faction = getHeroFaction("shinobi");
console.log(faction); // "Samurai"

const invalid = getHeroFaction("invalid-hero");
console.log(invalid); // undefined
```

## Estrutura de Cache

### localStorage após uso completo

```javascript
// localStorage.getItem("forHonorUser")
{
  "id": "1234567890",
  "nickname": "SamuraiWarrior",
  "email": "samurai@warrior.com",
  "region": "Global",
  "faction": "Vikings",  // <- Mudou de Samurai para Vikings
  "avatar": "berserker", // <- Escolheu berserker após mudar de facção
  "profileVisibility": "public",
  "stats": { ... }
}

// localStorage.getItem("forHonorFactionCache")
{
  "1234567890": "Vikings"
}

// localStorage.getItem("forHonorAvatarCache")
{
  "1234567890": "berserker"
}
```

## Visual do AvatarPicker

```
┌─────────────────────────────────────┐
│  Escolher Avatar                    │
│  Selecione um herói da sua facção   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │  [R] │  │  [W] │  │  [B] │     │  <- Grid 3 colunas
│  │Raider│  │Warlor│  │Berser│     │
│  │  ✓   │  │      │  │      │     │  <- ✓ = selecionado
│  └──────┘  └──────┘  └──────┘     │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │  [V] │  │  [H] │  │  [S] │     │
│  │Valkyr│  │Highla│  │Shaman│     │
│  │      │  │      │  │      │     │
│  └──────┘  └──────┘  └──────┘     │
│                                     │
│  ┌──────┐  ┌──────┐                │
│  │  [J] │  │  [VG]│                │  <- 8 heróis Vikings
│  │Jormun│  │Varang│                │
│  │      │  │      │                │
│  └──────┘  └──────┘                │
│                                     │
└─────────────────────────────────────┘
```

## Cores e Estilos

```css
/* Avatar selecionado */
.avatar-selected {
  border: 2px solid #ea580c;        /* orange-500 */
  background: rgba(234, 88, 12, 0.2); /* orange-500/20 */
  transform: scale(1.05);
}

/* Avatar hover */
.avatar-hover {
  border-color: rgba(234, 88, 12, 0.3); /* orange-500/30 */
  background: rgba(234, 88, 12, 0.1);   /* orange-500/10 */
  transform: scale(1.05);
}

/* Fallback avatar */
.avatar-fallback {
  background: linear-gradient(135deg, #ea580c, #dc2626); /* orange-500 to red-600 */
  font-size: 2rem;
  font-weight: bold;
  color: white;
}
```

Esse é o fluxo completo do sistema de facções implementado! 🎉
