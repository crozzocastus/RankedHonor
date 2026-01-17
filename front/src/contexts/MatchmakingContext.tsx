"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { MatchmakingLobby, LobbyPlayer, ChatMessage, MapRole, HeroClass } from '@/types';
import { createMockLobby, simulatePlayerJoining, simulateChatMessages } from '@/lib/mockData';

interface MatchmakingContextType {
  isSearching: boolean;
  searchStartTime: number | null;
  estimatedTime: number;
  gameMode: string;
  region: string;
  currentLobby: MatchmakingLobby | null;
  selectedRole: MapRole;
  followedUsers: Set<string>;
  startSearch: (mode: string, region?: string, estimatedTime?: number) => void;
  cancelSearch: () => void;
  completeSearch: () => void;
  selectRole: (role: MapRole) => void;
  selectHero: (heroId: string | null) => void;
  togglePreferredClass: (heroClass: HeroClass) => void;
  sendChatMessage: (message: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  // Métodos internos para atualização via WebSocket
  updateLobby: (lobby: MatchmakingLobby) => void;
  addPlayerToLobby: (player: LobbyPlayer) => void;
  removePlayerFromLobby: (userId: string) => void;
  updatePlayerRole: (userId: string, role: MapRole) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const MatchmakingContext = createContext<MatchmakingContextType | undefined>(undefined);

export function MatchmakingProvider({ children }: { children: ReactNode }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchStartTime, setSearchStartTime] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(90);
  const [gameMode, setGameMode] = useState('');
  const [region, setRegion] = useState('Global');
  const [currentLobby, setCurrentLobby] = useState<MatchmakingLobby | null>(null);
  const [selectedRole, setSelectedRole] = useState<MapRole>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  
  // Ref para manter a referência atualizada do lobby
  const currentLobbyRef = useRef<MatchmakingLobby | null>(null);
  
  // Atualizar ref sempre que currentLobby mudar
  useEffect(() => {
    currentLobbyRef.current = currentLobby;
  }, [currentLobby]);

  // Carregar estado salvo do localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('matchmaking');
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

    const savedFollows = localStorage.getItem('followedUsers');
    if (savedFollows) {
      setFollowedUsers(new Set(JSON.parse(savedFollows)));
    }
  }, []);

  // Salvar estado no localStorage
  useEffect(() => {
    if (isSearching && searchStartTime) {
      localStorage.setItem('matchmaking', JSON.stringify({
        isSearching,
        searchStartTime,
        estimatedTime,
        gameMode,
        region,
      }));
    } else {
      localStorage.removeItem('matchmaking');
    }
  }, [isSearching, searchStartTime, estimatedTime, gameMode, region]);

  // Salvar follows no localStorage
  useEffect(() => {
    localStorage.setItem('followedUsers', JSON.stringify(Array.from(followedUsers)));
  }, [followedUsers]);

  const startSearch = (mode: string, searchRegion = 'Global', estTime = 90) => {
    console.log('startSearch called:', mode, searchRegion, estTime);
    setIsSearching(true);
    setSearchStartTime(Date.now());
    setEstimatedTime(estTime);
    setGameMode(mode);
    setRegion(searchRegion);
    setSelectedRole(null);
    
    // Criar lobby mock
    const mockLobby = createMockLobby(mode, searchRegion);
    setCurrentLobby(mockLobby);
    
    // Simular jogadores entrando gradualmente
    const simulateNextPlayer = () => {
      simulatePlayerJoining(() => currentLobbyRef.current, (player) => {
        addPlayerToLobby(player);
        // Continuar simulando mais jogadores
        simulateNextPlayer();
      });
    };
    simulateNextPlayer();
    
    // Simular mensagens de chat
    simulateChatMessages(addChatMessage);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    setRegion('Global');
    setCurrentLobby(null);
    setSelectedRole(null);
    localStorage.removeItem('matchmaking');
  };

  const completeSearch = () => {
    setIsSearching(false);
    setSearchStartTime(null);
    setGameMode('');
    setRegion('Global');
    setCurrentLobby(null);
    setSelectedRole(null);
    localStorage.removeItem('matchmaking');
  };

  const selectRole = (role: MapRole) => {
    setSelectedRole(role);
    
    // Atualizar role do jogador no lobby
    if (currentLobby) {
      setCurrentLobby({
        ...currentLobby,
        players: currentLobby.players.map(p => 
          p.userId === 'current-user-id' // TODO: usar userId real do contexto de auth
            ? { ...p, role }
            : p
        )
      });
    }
  };

  const selectHero = (heroId: string | null) => {
    if (!currentLobby) return;
    
    setCurrentLobby({
      ...currentLobby,
      players: currentLobby.players.map(p =>
        p.userId === 'current-user-id'
          ? { ...p, selectedHero: heroId }
          : p
      )
    });
  };

  const togglePreferredClass = (heroClass: HeroClass) => {
    if (!currentLobby) return;
    
    setCurrentLobby({
      ...currentLobby,
      players: currentLobby.players.map(p => {
        if (p.userId === 'current-user-id') {
          const current = p.preferredClasses || [];
          const newClasses = current.includes(heroClass)
            ? current.filter(c => c !== heroClass)
            : [...current, heroClass];
          return { ...p, preferredClasses: newClasses };
        }
        return p;
      })
    });
  };

  const sendChatMessage = (message: string) => {
    if (!currentLobby) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: 'current-user-id', // TODO: usar userId real
      nickname: 'Current User', // TODO: usar nickname real
      message,
      timestamp: Date.now(),
      isModerated: false,
    };

    setCurrentLobby({
      ...currentLobby,
      chatMessages: [...currentLobby.chatMessages, newMessage]
    });
  };

  const followUser = (userId: string) => {
    setFollowedUsers(prev => new Set(prev).add(userId));
  };

  const unfollowUser = (userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  // Métodos para atualização via WebSocket
  const updateLobby = (lobby: MatchmakingLobby) => {
    setCurrentLobby(lobby);
  };

  const addPlayerToLobby = (player: LobbyPlayer) => {
    const lobby = currentLobbyRef.current;
    if (!lobby) {
      console.log('addPlayerToLobby: no lobby reference');
      return;
    }
    
    const newPlayers = [...lobby.players, player];
    const isFull = newPlayers.length >= lobby.maxPlayers;
    
    console.log('addPlayerToLobby:', player.nickname, `(${newPlayers.length}/${lobby.maxPlayers})`, 'isFull:', isFull);
    
    setCurrentLobby({
      ...lobby,
      players: newPlayers,
      preparationStartedAt: isFull && !lobby.preparationStartedAt 
        ? Date.now() 
        : lobby.preparationStartedAt,
      preparationTimeSeconds: 60,
    });
  };

  const removePlayerFromLobby = (userId: string) => {
    if (!currentLobby) return;
    setCurrentLobby({
      ...currentLobby,
      players: currentLobby.players.filter(p => p.userId !== userId)
    });
  };

  const updatePlayerRole = (userId: string, role: MapRole) => {
    if (!currentLobby) return;
    setCurrentLobby({
      ...currentLobby,
      players: currentLobby.players.map(p =>
        p.userId === userId ? { ...p, role } : p
      )
    });
  };

  const addChatMessage = (message: ChatMessage) => {
    if (!currentLobby) return;
    setCurrentLobby({
      ...currentLobby,
      chatMessages: [...currentLobby.chatMessages, message]
    });
  };

  return (
    <MatchmakingContext.Provider
      value={{
        isSearching,
        searchStartTime,
        estimatedTime,
        gameMode,
        region,
        currentLobby,
        selectedRole,
        followedUsers,
        startSearch,
        cancelSearch,
        completeSearch,
        selectRole,
        selectHero,
        togglePreferredClass,
        sendChatMessage,
        followUser,
        unfollowUser,
        updateLobby,
        addPlayerToLobby,
        removePlayerFromLobby,
        updatePlayerRole,
        addChatMessage,
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
