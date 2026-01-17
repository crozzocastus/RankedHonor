# Profile Components

Componentes modulares para a página de perfil do usuário.

## Estrutura

### Componentes Base (dados existentes)

- **ProfileHeader** - Cabeçalho com título, toggle de visibilidade e botões de edição
- **ProfileAvatar** - Avatar do usuário com hover para edição
- **ProfileBasicInfo** - Campos editáveis (nickname, email, região, facção)
- **ProfileRankCard** - Card com rank geral e temporada
- **ProfileGameModeRanks** - Grid com ranks de todos os modos de jogo
- **ProfilePerformanceStats** - Estatísticas gerais (partidas, vitórias, K/D)

### Componentes Avançados (novos dados)

- **HeroMetricsGrid** - Grid com estatísticas detalhadas por herói
- **MatchHistoryList** - Lista de histórico de partidas com paginação
- **DetailedRankings** - Rankings detalhados por modo com progressão MMR e leaderboard

## Uso

```tsx
import {
  ProfileHeader,
  ProfileAvatar,
  ProfileBasicInfo,
  ProfileRankCard,
  ProfileGameModeRanks,
  ProfilePerformanceStats,
  HeroMetricsGrid,
  MatchHistoryList,
  DetailedRankings,
} from "@/components/dashboard/profile";

// Use os componentes na página
<ProfileHeader
  profileVisibility="public"
  isEditing={false}
  onToggleVisibility={handleToggle}
  onEdit={handleEdit}
  onSave={handleSave}
  onCancel={handleCancel}
/>
```

## Dados e Cache

Os componentes avançados recebem dados dos hooks de serviço:

```tsx
import {
  useHeroMetrics,
  useMatchHistory,
  useRankingDetails,
  useLeaderboard,
} from "@/services/profile-data.service";

const { metrics } = useHeroMetrics(userId);
const { history, loadMore, hasMore, isLoading } = useMatchHistory(userId);
const { rankings } = useRankingDetails(userId);
const { leaderboard } = useLeaderboard(userId);
```

## Mockdata

- **mockHeroMetrics.ts** - 15 heróis com estatísticas detalhadas
- **mockMatchHistory.ts** - 50 partidas históricas
- **mockRankingDetails.ts** - Progressão de ranking para 7 modos + leaderboard

## Helper Functions

Ver [lib/utils/profileHelpers.ts](../../../lib/utils/profileHelpers.ts) para funções utilitárias:

- Formatação (tempo, K/D, win rate, duração)
- Cores baseadas em rank/resultado
- Tempo relativo
- Cálculos (KDA, percentil)

## Organização

Cada componente tem ~50-150 linhas, seguindo a diretriz de 200 linhas máx por arquivo definida em [front/README.md](../../../README.md).
