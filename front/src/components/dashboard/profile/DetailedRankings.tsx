/**
 * DetailedRankings Component
 * 
 * Rankings detalhados por modo de jogo com progressão e leaderboard.
 */

import { TrendingUp, Award, Users } from "lucide-react";
import type { RankingProgression, LeaderboardPosition } from "@/data/mockRankingDetails";
import { getRankColor, formatRelativeTime, getPercentileColor } from "@/lib/utils/profileHelpers";

interface DetailedRankingsProps {
  rankings: RankingProgression[];
  leaderboard?: LeaderboardPosition[];
}

export function DetailedRankings({ rankings, leaderboard }: DetailedRankingsProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
        <Award className="h-6 w-6 text-yellow-500" />
        Rankings Detalhados
      </h3>

      <div className="space-y-4">
        {rankings.map((ranking) => {
          const leaderboardData = leaderboard?.find((lb) => lb.mode === ranking.mode);

          return (
            <div
              key={ranking.mode}
              className="rounded-lg border border-gray-700 bg-gray-800 p-4"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{ranking.mode}</h4>
                  <p className={`text-lg font-semibold ${getRankColor(ranking.currentRank)}`}>
                    {ranking.currentRank}
                  </p>
                </div>

                {leaderboardData && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">#{leaderboardData.globalRank.toLocaleString()}</span>
                    </div>
                    <p className={`text-xs font-semibold ${getPercentileColor(leaderboardData.percentile)}`}>
                      Top {leaderboardData.percentile.toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">MMR</p>
                  <p className="font-semibold text-white">{ranking.mmr}</p>
                </div>
                <div>
                  <p className="text-gray-400">Partidas</p>
                  <p className="font-semibold text-white">{ranking.gamesInRank}</p>
                </div>
                <div>
                  <p className="text-gray-400">Win Rate</p>
                  <p
                    className={`font-semibold ${
                      ranking.winsInRank / ranking.gamesInRank >= 0.55
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {((ranking.winsInRank / ranking.gamesInRank) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-400">Progresso para próximo rank</span>
                  <span className="font-semibold text-white">{ranking.progressToNextRank}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    style={{ width: `${ranking.progressToNextRank}%` }}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">Pico da temporada:</p>
                  <p className={`font-semibold ${getRankColor(ranking.peakRank)}`}>
                    {ranking.peakRank}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Rank inicial:</p>
                  <p className={`font-semibold ${getRankColor(ranking.seasonStartRank)}`}>
                    {ranking.seasonStartRank}
                  </p>
                </div>
              </div>

              {/* Last Rank Change */}
              {ranking.lastRankChange && (
                <div className="mt-3 flex items-center gap-2 rounded bg-gray-900/50 p-2 text-xs">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-gray-400">
                    {ranking.lastRankChange.from} → {ranking.lastRankChange.to}
                  </span>
                  <span className="text-gray-500">
                    • {formatRelativeTime(ranking.lastRankChange.timestamp)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {rankings.length === 0 && (
        <div className="py-12 text-center">
          <Award className="mx-auto h-12 w-12 text-gray-600" />
          <p className="mt-4 text-gray-400">Nenhum ranking disponível</p>
        </div>
      )}
    </div>
  );
}
