import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal, Award } from 'lucide-react';

type GameMode = 'geral' | 'duelo' | 'briga' | 'dominio' | 'invasao' | 'tributo' | 'mata-mata';

interface Player {
  position: number;
  nickname: string;
  rank: string;
  points: number;
  region: string;
  trend: 'up' | 'down' | 'stable';
  wins: number;
  losses: number;
}

const gameModes = [
  { id: 'geral' as GameMode, label: 'Geral', description: 'Todos os modos' },
  { id: 'duelo' as GameMode, label: 'Duelo', description: '1v1' },
  { id: 'briga' as GameMode, label: 'Briga', description: '2v2' },
  { id: 'dominio' as GameMode, label: 'Domínio', description: '4v4' },
  { id: 'invasao' as GameMode, label: 'Invasão', description: '4v4' },
  { id: 'tributo' as GameMode, label: 'Tributo', description: '4v4' },
  { id: 'mata-mata' as GameMode, label: 'Mata-mata', description: '4v4' }
];

const rankingsData: Record<GameMode, Player[]> = {
  geral: [
    { position: 1, nickname: 'WarLegend', rank: 'Grão-Mestre', points: 3845, region: 'EU', trend: 'up', wins: 234, losses: 87 },
    { position: 2, nickname: 'IronFist', rank: 'Grão-Mestre', points: 3721, region: 'NA', trend: 'up', wins: 198, losses: 92 },
    { position: 3, nickname: 'ShadowBlade', rank: 'Mestre', points: 3654, region: 'EU', trend: 'down', wins: 187, losses: 103 },
    { position: 4, nickname: 'DragonHeart', rank: 'Mestre', points: 3589, region: 'SA', trend: 'up', wins: 176, losses: 98 },
    { position: 5, nickname: 'StormBreaker', rank: 'Mestre', points: 3512, region: 'ASIA', trend: 'up', wins: 165, losses: 110 },
    { position: 6, nickname: 'FrostBite', rank: 'Diamante I', points: 3445, region: 'EU', trend: 'down', wins: 154, losses: 115 },
    { position: 7, nickname: 'ThunderStrike', rank: 'Diamante I', points: 3398, region: 'NA', trend: 'up', wins: 148, losses: 121 },
    { position: 8, nickname: 'PhoenixRise', rank: 'Diamante I', points: 3367, region: 'SA', trend: 'up', wins: 142, losses: 118 },
    { position: 9, nickname: 'NightHunter', rank: 'Diamante II', points: 3289, region: 'EU', trend: 'stable', wins: 135, losses: 125 },
    { position: 10, nickname: 'BloodRaven', rank: 'Diamante II', points: 3234, region: 'ASIA', trend: 'up', wins: 128, losses: 130 },
    { position: 11, nickname: 'SteelWarrior', rank: 'Diamante II', points: 3198, region: 'NA', trend: 'down', wins: 121, losses: 135 },
    { position: 12, nickname: 'GoldenKnight', rank: 'Platina I', points: 3145, region: 'EU', trend: 'up', wins: 115, losses: 140 },
    { position: 13, nickname: 'DarkSamurai', rank: 'Platina I', points: 3098, region: 'SA', trend: 'stable', wins: 108, losses: 145 },
    { position: 14, nickname: 'IceBreaker', rank: 'Platina I', points: 3056, region: 'ASIA', trend: 'up', wins: 102, losses: 148 },
    { position: 15, nickname: 'FireStorm', rank: 'Platina II', points: 3012, region: 'NA', trend: 'down', wins: 95, losses: 152 },
  ],
  duelo: [
    { position: 1, nickname: 'ShadowBlade', rank: 'Grão-Mestre', points: 4021, region: 'EU', trend: 'up', wins: 312, losses: 45 },
    { position: 2, nickname: 'WarLegend', rank: 'Grão-Mestre', points: 3987, region: 'EU', trend: 'stable', wins: 298, losses: 52 },
    { position: 3, nickname: 'DuelMaster', rank: 'Mestre', points: 3856, region: 'NA', trend: 'up', wins: 276, losses: 61 },
    { position: 4, nickname: 'BladeRunner', rank: 'Mestre', points: 3789, region: 'SA', trend: 'up', wins: 254, losses: 68 },
    { position: 5, nickname: 'SwordSaint', rank: 'Mestre', points: 3723, region: 'ASIA', trend: 'down', wins: 241, losses: 74 },
    { position: 6, nickname: 'IronFist', rank: 'Diamante I', points: 3654, region: 'NA', trend: 'up', wins: 228, losses: 82 },
    { position: 7, nickname: 'QuickStrike', rank: 'Diamante I', points: 3598, region: 'EU', trend: 'stable', wins: 215, losses: 89 },
    { position: 8, nickname: 'SilentKiller', rank: 'Diamante I', points: 3534, region: 'SA', trend: 'up', wins: 202, losses: 95 },
    { position: 9, nickname: 'LoneWolf', rank: 'Diamante II', points: 3478, region: 'ASIA', trend: 'down', wins: 189, losses: 102 },
    { position: 10, nickname: 'DeathBlade', rank: 'Diamante II', points: 3421, region: 'EU', trend: 'up', wins: 176, losses: 108 },
  ],
  briga: [
    { position: 1, nickname: 'IronFist', rank: 'Grão-Mestre', points: 3912, region: 'NA', trend: 'up', wins: 289, losses: 78 },
    { position: 2, nickname: 'DragonHeart', rank: 'Grão-Mestre', points: 3876, region: 'SA', trend: 'up', wins: 274, losses: 85 },
    { position: 3, nickname: 'TeamPlayer', rank: 'Mestre', points: 3798, region: 'EU', trend: 'stable', wins: 261, losses: 91 },
    { position: 4, nickname: 'WarLegend', rank: 'Mestre', points: 3745, region: 'EU', trend: 'down', wins: 248, losses: 98 },
    { position: 5, nickname: 'DuoKing', rank: 'Mestre', points: 3689, region: 'ASIA', trend: 'up', wins: 235, losses: 104 },
  ],
  dominio: [
    { position: 1, nickname: 'StormBreaker', rank: 'Grão-Mestre', points: 4156, region: 'ASIA', trend: 'up', wins: 342, losses: 123 },
    { position: 2, nickname: 'WarLegend', rank: 'Grão-Mestre', points: 4089, region: 'EU', trend: 'stable', wins: 328, losses: 131 },
    { position: 3, nickname: 'TeamCaptain', rank: 'Mestre', points: 3987, region: 'NA', trend: 'up', wins: 315, losses: 138 },
    { position: 4, nickname: 'PointHolder', rank: 'Mestre', points: 3921, region: 'SA', trend: 'up', wins: 302, losses: 145 },
    { position: 5, nickname: 'ZoneKing', rank: 'Mestre', points: 3856, region: 'EU', trend: 'down', wins: 289, losses: 152 },
  ],
  invasao: [
    { position: 1, nickname: 'ThunderStrike', rank: 'Grão-Mestre', points: 3823, region: 'NA', trend: 'up', wins: 267, losses: 98 },
    { position: 2, nickname: 'DefenseKing', rank: 'Mestre', points: 3756, region: 'EU', trend: 'stable', wins: 254, losses: 105 },
    { position: 3, nickname: 'Attacker', rank: 'Mestre', points: 3698, region: 'SA', trend: 'up', wins: 241, losses: 112 },
  ],
  tributo: [
    { position: 1, nickname: 'PhoenixRise', rank: 'Grão-Mestre', points: 3734, region: 'SA', trend: 'up', wins: 256, losses: 89 },
    { position: 2, nickname: 'OfferingMaster', rank: 'Mestre', points: 3667, region: 'EU', trend: 'stable', wins: 243, losses: 96 },
    { position: 3, nickname: 'TributeKing', rank: 'Mestre', points: 3612, region: 'ASIA', trend: 'up', wins: 230, losses: 103 },
  ],
  'mata-mata': [
    { position: 1, nickname: 'FrostBite', rank: 'Grão-Mestre', points: 3891, region: 'EU', trend: 'up', wins: 278, losses: 87 },
    { position: 2, nickname: 'ClutchMaster', rank: 'Mestre', points: 3823, region: 'NA', trend: 'stable', wins: 265, losses: 94 },
    { position: 3, nickname: 'Eliminator', rank: 'Mestre', points: 3767, region: 'ASIA', trend: 'up', wins: 252, losses: 101 },
  ]
};

const getRankColor = (rank: string) => {
  if (rank.includes('Grão-Mestre')) return 'text-purple-400';
  if (rank.includes('Mestre')) return 'text-red-400';
  if (rank.includes('Diamante')) return 'text-blue-400';
  if (rank.includes('Platina')) return 'text-cyan-400';
  if (rank.includes('Ouro')) return 'text-yellow-400';
  if (rank.includes('Prata')) return 'text-gray-400';
  return 'text-orange-700';
};

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-700" />;
    default:
      return null;
  }
};

export function RankingsSection() {
  const [selectedMode, setSelectedMode] = useState<GameMode>('geral');

  const currentMode = gameModes.find(m => m.id === selectedMode);
  const players = rankingsData[selectedMode];

  return (
    <section id="rankings" className="py-16 bg-black">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-orange-500" />
            <h2 className="text-white">
              Ranking {selectedMode === 'geral' ? 'Geral' : `– ${currentMode?.label}`}
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {selectedMode === 'geral' 
              ? 'Classificação baseada no desempenho médio em todos os modos'
              : `Classificação exclusiva do modo ${currentMode?.label} (${currentMode?.description})`
            }
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {gameModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  selectedMode === mode.id
                    ? mode.id === 'geral'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-black'
                      : 'bg-orange-500/20 text-orange-500 border border-orange-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{mode.label}</span>
                  {mode.id !== 'geral' && (
                    <span className="text-xs opacity-75">({mode.description})</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-800/50 border-b border-gray-700">
            <div className="grid grid-cols-[80px_1fr_200px_150px_120px_120px] gap-4 px-6 py-4">
              <div className="text-gray-400">Pos.</div>
              <div className="text-gray-400">Jogador</div>
              <div className="text-gray-400">Rank</div>
              <div className="text-gray-400">Pontuação</div>
              <div className="text-gray-400">V/D</div>
              <div className="text-gray-400">Região</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-800">
            {players.map((player) => (
              <div
                key={player.position}
                className={`grid grid-cols-[80px_1fr_200px_150px_120px_120px] gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors ${
                  player.position <= 3 ? 'bg-gradient-to-r from-orange-500/5 to-transparent' : ''
                }`}
              >
                {/* Position */}
                <div className="flex items-center gap-2">
                  {getPositionIcon(player.position)}
                  <span className={`${player.position <= 3 ? 'text-white' : 'text-gray-400'}`}>
                    #{player.position}
                  </span>
                </div>

                {/* Nickname */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black">{player.nickname[0]}</span>
                  </div>
                  <span className="text-white">{player.nickname}</span>
                </div>

                {/* Rank */}
                <div className="flex items-center">
                  <span className={getRankColor(player.rank)}>{player.rank}</span>
                </div>

                {/* Points */}
                <div className="flex items-center gap-2">
                  <span className="text-white">{player.points.toLocaleString('en-US')}</span>
                  {player.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {player.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                  {player.trend === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
                </div>

                {/* Win/Loss */}
                <div className="flex items-center text-gray-400">
                  <span className="text-green-500">{player.wins}</span>
                  <span className="mx-1">/</span>
                  <span className="text-red-500">{player.losses}</span>
                </div>

                {/* Region */}
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full">
                    {player.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-500">
          <p>Ranking atualizado a cada 5 minutos • Última atualização: há 2 minutos</p>
        </div>
      </div>
    </section>
  );
}
