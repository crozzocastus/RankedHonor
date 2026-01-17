"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { MatchmakingLobby, LobbyPlayer, ChatMessage, MapRole } from '@/types';

interface LobbyContextType {
  currentLobby: MatchmakingLobby | null;
  updateLobby: (lobby: MatchmakingLobby | null) => void;
  addPlayerToLobby: (player: LobbyPlayer) => void;
  removePlayerFromLobby: (userId: string) => void;
  updatePlayerRole: (userId: string, role: MapRole) => void;
  addChatMessage: (message: ChatMessage) => void;
  sendChatMessage: (message: string) => void;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({ children }: { children: ReactNode }) {
  const [currentLobby, setCurrentLobby] = useState<MatchmakingLobby | null>(null);
  
  // Ref para manter a referência atualizada do lobby
  const currentLobbyRef = useRef<MatchmakingLobby | null>(null);
  
  // Atualizar ref sempre que currentLobby mudar
  useEffect(() => {
    currentLobbyRef.current = currentLobby;
  }, [currentLobby]);

  const updateLobby = useCallback((lobby: MatchmakingLobby | null) => {
    setCurrentLobby(lobby);
  }, []);

  const addPlayerToLobby = useCallback((player: LobbyPlayer) => {
    const lobby = currentLobbyRef.current;
    if (!lobby) {
      return;
    }
    
    const newPlayers = [...lobby.players, player];
    const isFull = newPlayers.length >= lobby.maxPlayers;
    
    setCurrentLobby({
      ...lobby,
      players: newPlayers,
      preparationStartedAt: isFull && !lobby.preparationStartedAt 
        ? Date.now() 
        : lobby.preparationStartedAt,
      preparationTimeSeconds: 60,
    });
  }, []);

  const removePlayerFromLobby = useCallback((userId: string) => {
    setCurrentLobby(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.filter(p => p.userId !== userId)
      };
    });
  }, []);

  const updatePlayerRole = useCallback((userId: string, role: MapRole) => {
    setCurrentLobby(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.map(p =>
          p.userId === userId ? { ...p, role } : p
        )
      };
    });
  }, []);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setCurrentLobby(prev => {
      if (!prev) return null;
      return {
        ...prev,
        chatMessages: [...prev.chatMessages, message]
      };
    });
  }, []);

  const sendChatMessage = useCallback((message: string) => {
    setCurrentLobby(prev => {
      if (!prev) return null;

      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId: 'current-user-id', // TODO: usar userId real
        nickname: 'Current User', // TODO: usar nickname real
        message,
        timestamp: Date.now(),
        isModerated: false,
      };

      return {
        ...prev,
        chatMessages: [...prev.chatMessages, newMessage]
      };
    });
  }, []);

  const value = useMemo(() => ({
    currentLobby,
    updateLobby,
    addPlayerToLobby,
    removePlayerFromLobby,
    updatePlayerRole,
    addChatMessage,
    sendChatMessage,
  }), [currentLobby, updateLobby, addPlayerToLobby, removePlayerFromLobby, updatePlayerRole, addChatMessage, sendChatMessage]);

  return (
    <LobbyContext.Provider value={value}>
      {children}
    </LobbyContext.Provider>
  );
}

export function useLobby() {
  const context = useContext(LobbyContext);
  if (!context) {
    throw new Error('useLobby must be used within LobbyProvider');
  }
  return context;
}
