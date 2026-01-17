/**
 * HeroMetricsGrid Component
 * 
 * Grid com métricas detalhadas de desempenho por herói.
 */

import { Users, Trophy, Target } from "lucide-react";
import type { HeroMetrics } from "@/data/mockHeroMetrics";
import { formatPlaytime, formatWinRate, formatKDA } from "@/lib/utils/profileHelpers";

interface HeroMetricsGridProps {
  metrics: HeroMetrics[];
}

export function HeroMetricsGrid({ metrics }: HeroMetricsGridProps) {
  // Ordenar por tempo jogado (mais jogados primeiro)
  const sortedMetrics = [...metrics].sort((a, b) => b.timePlayed - a.timePlayed);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
        <Users className="h-6 w-6 text-purple-500" />
        Estatísticas por Herói
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedMetrics.map((hero) => (
          <div
            key={hero.heroId}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors hover:border-orange-500"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">{hero.heroName}</h4>
                <p className="text-xs text-gray-400">{hero.faction}</p>
              </div>
              {hero.rank && (
                <div className="rounded bg-yellow-500/20 px-2 py-1">
                  <p className="text-xs font-semibold text-yellow-500">{hero.rank}</p>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Tempo jogado:</span>
                <span className="font-semibold text-white">{formatPlaytime(hero.timePlayed)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Partidas:</span>
                <span className="font-semibold text-white">{hero.matchesPlayed}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate:</span>
                <span
                  className={`font-semibold ${
                    hero.winRate >= 55
                      ? "text-green-500"
                      : hero.winRate >= 50
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {formatWinRate(hero.winRate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">KDA:</span>
                <span
                  className={`font-semibold ${
                    hero.kda >= 2 ? "text-green-500" : hero.kda >= 1.5 ? "text-yellow-500" : "text-red-500"
                  }`}
                >
                  {formatKDA(hero.kda)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Melhor sequência:</span>
                <span className="font-semibold text-orange-500">{hero.bestStreak}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Trophy className="h-3 w-3" />
                  <span>Modo favorito: {hero.favoriteMode}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedMetrics.length === 0 && (
        <div className="py-12 text-center">
          <Target className="mx-auto h-12 w-12 text-gray-600" />
          <p className="mt-4 text-gray-400">Nenhuma estatística de herói disponível</p>
        </div>
      )}
    </div>
  );
}
