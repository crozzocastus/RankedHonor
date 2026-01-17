/**
 * Profile Data Service
 * 
 * Service layer para gerenciar dados do perfil do usuário com cache local.
 * Utiliza o hook useLocalStorage para persistir dados no navegador.
 */

import { useLocalStorage } from "@/hooks";
import type { HeroMetrics } from "@/data/mockHeroMetrics";
import type { MatchHistoryEntry } from "@/data/mockMatchHistory";
import type { RankingProgression, LeaderboardPosition } from "@/data/mockRankingDetails";
import { mockHeroMetrics } from "@/data/mockHeroMetrics";
import { mockMatchHistory, loadMoreMatches } from "@/data/mockMatchHistory";
import { mockRankingDetails, mockLeaderboardPositions } from "@/data/mockRankingDetails";
import { useState, useCallback } from "react";

/**
 * Hook para gerenciar métricas de heróis com cache local
 */
export function useHeroMetrics(userId: string) {
  const [metrics, setMetrics] = useLocalStorage<HeroMetrics[]>(
    `heroMetrics_${userId}`,
    mockHeroMetrics
  );

  const refreshMetrics = useCallback(() => {
    setMetrics(mockHeroMetrics);
  }, [setMetrics]);

  return { metrics, setMetrics, refreshMetrics };
}

/**
 * Hook para gerenciar histórico de partidas com cache local e paginação
 */
export function useMatchHistory(userId: string) {
  const [history, setHistory] = useLocalStorage<MatchHistoryEntry[]>(
    `matchHistory_${userId}`,
    mockMatchHistory.slice(0, 20) // Carregar primeiras 20 partidas
  );

  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    
    // Simular delay de rede
    setTimeout(() => {
      const currentCount = history.length;
      const newMatches = loadMoreMatches(currentCount, 10);
      
      if (newMatches.length === 0) {
        setHasMore(false);
      } else {
        setHistory([...history, ...newMatches]);
      }
      
      setIsLoading(false);
    }, 500);
  }, [history, setHistory]);

  const refreshHistory = useCallback(() => {
    setHistory(mockMatchHistory.slice(0, 20));
    setHasMore(true);
  }, [setHistory]);

  return { 
    history, 
    setHistory, 
    loadMore, 
    hasMore, 
    isLoading,
    refreshHistory 
  };
}

/**
 * Hook para gerenciar detalhes de ranking com cache local
 */
export function useRankingDetails(userId: string) {
  const [rankings, setRankings] = useLocalStorage<RankingProgression[]>(
    `rankings_${userId}`,
    mockRankingDetails
  );

  const refreshRankings = useCallback(() => {
    setRankings(mockRankingDetails);
  }, [setRankings]);

  return { rankings, setRankings, refreshRankings };
}

/**
 * Hook para gerenciar posições no leaderboard com cache local
 */
export function useLeaderboard(userId: string) {
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardPosition[]>(
    `leaderboard_${userId}`,
    mockLeaderboardPositions
  );

  const refreshLeaderboard = useCallback(() => {
    setLeaderboard(mockLeaderboardPositions);
  }, [setLeaderboard]);

  return { leaderboard, setLeaderboard, refreshLeaderboard };
}

/**
 * Função utilitária para limpar todos os caches de perfil de um usuário
 * Útil para logout ou reset de dados
 */
export function clearProfileCache(userId: string): void {
  if (typeof window === "undefined") return;

  const keys = [
    `heroMetrics_${userId}`,
    `matchHistory_${userId}`,
    `rankings_${userId}`,
    `leaderboard_${userId}`
  ];

  keys.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing cache for key ${key}:`, error);
    }
  });
}

/**
 * Função utilitária para verificar se há dados em cache para um usuário
 */
export function hasProfileCache(userId: string): boolean {
  if (typeof window === "undefined") return false;

  const keys = [
    `heroMetrics_${userId}`,
    `matchHistory_${userId}`,
    `rankings_${userId}`,
    `leaderboard_${userId}`
  ];

  return keys.some((key) => {
    try {
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  });
}
