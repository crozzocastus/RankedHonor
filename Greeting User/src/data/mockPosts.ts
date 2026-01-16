export interface Post {
  id: string;
  type: 'video' | 'live' | 'image' | 'audio' | 'text';
  creator: {
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  title: string;
  description: string;
  content?: string;
  mediaUrl?: string;
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  isFollowing: boolean;
  isRankedContent: boolean;
  tags?: string[];
  duration?: string;
  viewerCount?: number;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    type: 'video',
    creator: {
      username: 'KnightSlayer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'Como dominar Warden no 1v1',
    description: 'Tutorial completo sobre os melhores mixups do Warden em duelos ranqueados. Aprenda a pressionar seus oponentes!',
    mediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-15T10:30:00Z',
    likes: 1547,
    comments: 89,
    shares: 234,
    saves: 456,
    isFollowing: true,
    isRankedContent: true,
    tags: ['Warden', 'Tutorial', 'Duelos', '1v1'],
    duration: '5:23',
  },
  {
    id: '2',
    type: 'live',
    creator: {
      username: 'ValkyrieQueen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'RANQUEADO AO VIVO - Subindo para Grão-Mestre',
    description: '🔥 Gameplay ao vivo tentando alcançar Grão-Mestre! Valkyrie main jogando Dominion ranqueado.',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-15T12:00:00Z',
    likes: 2341,
    comments: 567,
    shares: 89,
    saves: 123,
    isFollowing: true,
    isRankedContent: true,
    tags: ['Live', 'Valkyrie', 'GrãoMestre', 'Dominion'],
    viewerCount: 3847,
  },
  {
    id: '3',
    type: 'image',
    creator: {
      username: 'SamuraiMaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      isVerified: false,
    },
    title: 'Minha build definitiva de Orochi',
    description: 'Finalmente consegui a build perfeita para Orochi em ranqueado. Stats otimizados para ganho máximo!',
    mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-15T09:15:00Z',
    likes: 892,
    comments: 45,
    shares: 67,
    saves: 234,
    isFollowing: false,
    isRankedContent: true,
    tags: ['Orochi', 'Build', 'Guia'],
  },
  {
    id: '4',
    type: 'audio',
    creator: {
      username: 'TacticalGamer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'Podcast: Estratégias para Breach Ranqueado',
    description: 'Neste episódio, discuto as melhores táticas e composições de equipe para dominar o modo Breach ranqueado.',
    publishedAt: '2026-01-15T08:00:00Z',
    likes: 456,
    comments: 78,
    shares: 123,
    saves: 567,
    isFollowing: true,
    isRankedContent: true,
    tags: ['Podcast', 'Breach', 'Estratégia'],
    duration: '15:42',
  },
  {
    id: '5',
    type: 'text',
    creator: {
      username: 'ConquerorPro',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'Análise da Meta Atual do Ranqueado',
    description: 'Minha opinião sobre o estado atual do meta competitivo',
    content: `Depois de jogar 200+ partidas ranqueadas nesta temporada, aqui está minha análise completa da meta atual:

TOP TIER:
- Warden: Ainda dominante com seus mixups
- Raider: Dano absurdo, precisa de nerf
- Black Prior: Defesa impenetrável

MID TIER:
- Kensei: Sólido mas previsível
- Lawbringer: Bom em 4v4, fraco em 1v1

Vou fazer um vídeo detalhado sobre isso em breve. O que vocês acham?`,
    publishedAt: '2026-01-15T07:30:00Z',
    likes: 1234,
    comments: 234,
    shares: 89,
    saves: 345,
    isFollowing: true,
    isRankedContent: true,
    tags: ['Meta', 'Análise', 'TierList'],
  },
  {
    id: '6',
    type: 'video',
    creator: {
      username: 'BerserkerMain',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
      isVerified: false,
    },
    title: 'Clutch 1v4 insano com Berserker',
    description: 'Consegui virar uma partida impossível! Vejam essa sequência de kills épica 🔥',
    mediaUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-14T20:45:00Z',
    likes: 3456,
    comments: 456,
    shares: 789,
    saves: 234,
    isFollowing: false,
    isRankedContent: false,
    tags: ['Berserker', 'Clutch', 'Highlight'],
    duration: '2:15',
  },
  {
    id: '7',
    type: 'image',
    creator: {
      username: 'CenturionLegend',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'Todas as execuções do Centurion',
    description: 'Compilação visual de todas as execuções disponíveis para o Centurion. Qual é a favorita de vocês?',
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-14T18:20:00Z',
    likes: 678,
    comments: 92,
    shares: 45,
    saves: 156,
    isFollowing: false,
    isRankedContent: false,
    tags: ['Centurion', 'Execuções', 'Cosmético'],
  },
  {
    id: '8',
    type: 'video',
    creator: {
      username: 'ShamanHuntress',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      isVerified: true,
    },
    title: 'Guia de ganking com Shaman',
    description: 'Aprenda a trabalhar em equipe e garantir kills rápidos com o bite do Shaman em situações de gank.',
    mediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=1200&fit=crop',
    publishedAt: '2026-01-14T16:00:00Z',
    likes: 1122,
    comments: 134,
    shares: 267,
    saves: 445,
    isFollowing: true,
    isRankedContent: true,
    tags: ['Shaman', 'Ganking', 'Tutorial', '4v4'],
    duration: '7:56',
  },
];
