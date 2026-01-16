"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MatchmakingContextType {
  isSearching: boolean;
  searchStartTime: number | null;
  estimatedTime: number;
  gameMode: string;
  startSearch: (mode: string, estimatedTime?: number) => void;
  cancelSearch: () => void;
  completeSearch: () => void;
}

const MatchmakingContext = createContext<MatchmakingContextType | undefined>(undefined);

export function MatchmakingProvider({ children }: { children: ReactNode }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchStartTime, setSearchStartTime] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(90);
  const [gameMode, setGameMode] = useState('');

  useEffect(() => {
    const savedState = localStorage.getItem('matchmaking');
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.isSearching && state.searchStartTime) {
        setIsSearching(true);
        setSearchStartTime(state.searchStartTime);
        setEstimatedTime(state.estimatedTime);
        setGameMode(state.gameMode);
      }
    }
  }, []);

  useEffect(() => {
    if (isSearching && searchStartTime) {
      localStorage.setItem('matchmaking', JSON.stringify({
        isSearching,
        searchStartTime,
        estimatedTime,
        gameMode,
      }));
    } else {
      localStorage.removeItem('matchmaking');
    }
  }, [isSearching, searchStartTime, estimatedTime, gameMode]);

  const startSearch = (mode: string, estTime = 90) => {
    console.log('startSearch called:', mode, estTime);
    setIsSearching(true);
    setSearchStartTime(Date.now());
    setEstimatedTime(estTime);
    setGameMode(mode);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    localStorage.removeItem('matchmaking');
  };

  const completeSearch = () => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    localStorage.removeItem('matchmaking');
  };

  return (
    <MatchmakingContext.Provider
      value={{
        isSearching,
        searchStartTime,
        estimatedTime,
        gameMode,
        startSearch,
        cancelSearch,
        completeSearch,
      }}
    >
      {children}
    </MatchmakingContext.Provider>
  );
}

export function useMatchmaking() {
  const context = useContext(MatchmakingContext);
  if (!context) {
    throw new Error('useMatchmaking must be used within MatchmakingProvider');
  }
  return context;
}
