"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

interface SearchContextType {
  isSearching: boolean;
  searchStartTime: number | null;
  estimatedTime: number;
  gameMode: string;
  region: string;
  startSearch: (mode: string, region?: string, estimatedTime?: number) => void;
  cancelSearch: () => void;
  completeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchStartTime, setSearchStartTime] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(90);
  const [gameMode, setGameMode] = useState('');
  const [region, setRegion] = useState('Global');

  // Carregar estado salvo do localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('matchmaking-search');
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.isSearching && state.searchStartTime) {
        setIsSearching(true);
        setSearchStartTime(state.searchStartTime);
        setEstimatedTime(state.estimatedTime);
        setGameMode(state.gameMode);
        setRegion(state.region || 'Global');
      }
    }
  }, []);

  // Salvar estado no localStorage
  useEffect(() => {
    if (isSearching && searchStartTime) {
      localStorage.setItem('matchmaking-search', JSON.stringify({
        isSearching,
        searchStartTime,
        estimatedTime,
        gameMode,
        region,
      }));
    } else {
      localStorage.removeItem('matchmaking-search');
    }
  }, [isSearching, searchStartTime, estimatedTime, gameMode, region]);

  const startSearch = useCallback((mode: string, searchRegion = 'Global', estTime = 90) => {
    setIsSearching(true);
    setSearchStartTime(Date.now());
    setEstimatedTime(estTime);
    setGameMode(mode);
    setRegion(searchRegion);
  }, []);

  const cancelSearch = useCallback(() => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    setRegion('Global');
    localStorage.removeItem('matchmaking-search');
  }, []);

  const completeSearch = useCallback(() => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    setRegion('Global');
    localStorage.removeItem('matchmaking-search');
  }, []);

  const value = useMemo(() => ({
    isSearching,
    searchStartTime,
    estimatedTime,
    gameMode,
    region,
    startSearch,
    cancelSearch,
    completeSearch,
  }), [isSearching, searchStartTime, estimatedTime, gameMode, region, startSearch, cancelSearch, completeSearch]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
