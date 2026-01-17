/**
 * MatchHistoryList Component
 * 
 * Lista de histórico de partidas com paginação "carregar mais".
 */

import { Clock, TrendingUp, TrendingDown, Award } from "lucide-react";
import type { MatchHistoryEntry } from "@/data/mockMatchHistory";
import {
  formatRelativeTime,
  formatMatchDuration,
  getResultColor,
  getRankChangeColor,
  formatRankChange,
} from "@/lib/utils/profileHelpers";

interface MatchHistoryListProps {
  matches: MatchHistoryEntry[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function MatchHistoryList({
  matches,
  hasMore,
  isLoading,
  onLoadMore,
}: MatchHistoryListProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
        <Clock className="h-6 w-6 text-cyan-500" />
        Histórico de Partidas
      </h3>

      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            className={`rounded-lg border p-4 transition-colors ${
              match.result === "victory"
                ? "border-green-600/30 bg-green-600/10 hover:border-green-600/50"
                : "border-red-600/30 bg-red-600/10 hover:border-red-600/50"
            }`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Info principal */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`text-sm font-bold ${getResultColor(match.result)}`}>
                    {match.result === "victory" ? "VITÓRIA" : "DERROTA"}
                  </span>
                  {match.mvp && (
                    <div className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-0.5">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-semibold text-yellow-500">MVP</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-400">{formatRelativeTime(match.timestamp)}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-white">{match.gameMode}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{match.map}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{match.heroName}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{formatMatchDuration(match.duration)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="text-xs text-gray-400">K/D/A</p>
                  <p className="font-semibold text-white">
                    {match.kills}/{match.deaths}/{match.assists}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400">Pontuação</p>
                  <p className="font-semibold text-white">{match.score.toLocaleString()}</p>
                </div>

                {match.teamScore !== undefined && match.enemyScore !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Placar</p>
                    <p className="font-semibold text-white">
                      {match.teamScore} - {match.enemyScore}
                    </p>
                  </div>
                )}

                {match.rankChange !== undefined && (
                  <div className="flex items-center gap-1">
                    {match.rankChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-bold ${getRankChangeColor(match.rankChange)}`}>
                      {formatRankChange(match.rankChange)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Carregar Mais */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Carregando..." : "Carregar Mais Partidas"}
          </button>
        </div>
      )}

      {matches.length === 0 && (
        <div className="py-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-gray-600" />
          <p className="mt-4 text-gray-400">Nenhuma partida encontrada</p>
        </div>
      )}

      {!hasMore && matches.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-400">
          Todas as partidas foram carregadas
        </p>
      )}
    </div>
  );
}
