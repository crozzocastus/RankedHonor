/**
 * ProfilePerformanceStats Component
 * 
 * Estatísticas gerais de desempenho do jogador.
 */

import { Target, Swords, Shield } from "lucide-react";

interface ProfilePerformanceStatsProps {
  matchesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  kills: number;
  deaths: number;
}

export function ProfilePerformanceStats({
  matchesPlayed,
  wins,
  losses,
  winRate,
  kills,
  deaths,
}: ProfilePerformanceStatsProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <Target className="h-6 w-6 text-blue-500" />
        Desempenho Geral
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{matchesPlayed}</p>
          <p className="text-gray-400">Partidas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{wins}</p>
          <p className="text-gray-400">Vitórias</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500">{losses}</p>
          <p className="text-gray-400">Derrotas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-500">{winRate}%</p>
          <p className="text-gray-400">Win Rate</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Swords className="h-5 w-5 text-red-500" />
            <span className="font-semibold text-white">Kills</span>
          </div>
          <p className="text-2xl font-bold text-red-500">{kills.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-white">Mortes</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">{deaths.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
