'use client';

import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const topPlayers = [
  { id: 1, name: 'WarLegend', rank: 'Grão-Mestre', mmr: 3845, wins: 234, losses: 87, trend: 'up' },
  { id: 2, name: 'IronFist', rank: 'Grão-Mestre', mmr: 3721, wins: 198, losses: 92, trend: 'up' },
  { id: 3, name: 'ShadowBlade', rank: 'Mestre', mmr: 3654, wins: 187, losses: 103, trend: 'down' },
  { id: 4, name: 'DragonHeart', rank: 'Mestre', mmr: 3589, wins: 176, losses: 98, trend: 'up' },
  { id: 5, name: 'StormBreaker', rank: 'Mestre', mmr: 3512, wins: 165, losses: 110, trend: 'up' },
  { id: 6, name: 'FrostBite', rank: 'Diamante I', mmr: 3445, wins: 154, losses: 115, trend: 'down' },
  { id: 7, name: 'ThunderStrike', rank: 'Diamante I', mmr: 3398, wins: 148, losses: 121, trend: 'up' },
  { id: 8, name: 'PhoenixRise', rank: 'Diamante I', mmr: 3367, wins: 142, losses: 118, trend: 'up' },
];

const getRankColor = (rank: string) => {
  if (rank.includes('Grão-Mestre')) return 'text-purple-400';
  if (rank.includes('Mestre')) return 'text-red-400';
  if (rank.includes('Diamante')) return 'text-blue-400';
  return 'text-slate-400';
};

export function RankingBoard() {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h2 className="text-amber-500">RANKING GLOBAL</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-400">#</th>
              <th className="text-left py-3 px-4 text-slate-400">Jogador</th>
              <th className="text-left py-3 px-4 text-slate-400">Rank</th>
              <th className="text-left py-3 px-4 text-slate-400">MMR</th>
              <th className="text-left py-3 px-4 text-slate-400">V/D</th>
              <th className="text-left py-3 px-4 text-slate-400">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => (
              <tr
                key={player.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className={index < 3 ? 'text-amber-500' : 'text-slate-400'}>
                    {index + 1}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-200">{player.name}</td>
                <td className="py-3 px-4">
                  <span className={getRankColor(player.rank)}>{player.rank}</span>
                </td>
                <td className="py-3 px-4 text-slate-300">{player.mmr}</td>
                <td className="py-3 px-4 text-slate-400">
                  {player.wins}W / {player.losses}L
                </td>
                <td className="py-3 px-4">
                  {player.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
