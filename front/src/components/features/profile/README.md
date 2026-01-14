# Profile Features / Funcionalidades de Perfil

## AvatarPicker Component

Componente de seleção de avatar de herói do For Honor.

### Características

- **Grid Responsivo**: 2 colunas em mobile, 3 em desktop
- **Filtragem por Facção**: Mostra apenas heróis da facção atual do usuário
- **Loading States**: Skeleton animado enquanto imagens carregam
- **Fallback Inteligente**: Tenta .svg → .png → fallback com iniciais
- **Hover Effects**: Border laranja, background tint, e scale ao hover
- **Indicador de Seleção**: Checkmark visual no avatar selecionado
- **Acessibilidade**: Labels ARIA, alt text descritivo

### Uso

```tsx
import { AvatarPicker } from "@/components/features/profile/AvatarPicker";

<AvatarPicker
  open={avatarPickerOpen}
  onOpenChange={setAvatarPickerOpen}
  currentFaction={user.faction}
  currentAvatar={user.avatar}
  onSelectAvatar={(heroId) => updateProfile({ avatar: heroId })}
/>
```

### Props

- `open: boolean` - Estado de abertura do dialog
- `onOpenChange: (open: boolean) => void` - Callback de mudança de estado
- `currentFaction: Faction` - Facção atual do usuário (filtra heróis)
- `currentAvatar: string` - ID do avatar atual (marca como selecionado)
- `onSelectAvatar: (heroId: string) => void` - Callback ao selecionar herói

### Hierarquia de Fallback de Imagens

1. Tenta carregar `/icons/heroes/{faction}/{hero-id}.svg`
2. Se falhar, tenta `/icons/heroes/{faction}/{hero-id}.png`
3. Se ambos falharem, mostra círculo gradiente com 2 primeiras letras do nome

### Estilo

- Segue design system do RankedHonor
- Ícones 80x80px (h-20 w-20)
- Border: gray-800 → hover: orange-500/30
- Background: gray-900 → hover: orange-500/10
- Transition: all (150ms padrão)
- Selected state: border-orange-500 + bg-orange-500/20 + scale-105

### Integração com Cache

O componente utiliza as funções de cache do `game.constants.ts`:
- `saveAvatarToCache(userId, heroId)` - Chamada automaticamente pelo `updateProfile`
- Persiste escolha entre sessões via localStorage

### Ordem dos Heróis

Heróis são exibidos em ordem de lançamento (`releaseOrder` field) dentro de cada facção.
