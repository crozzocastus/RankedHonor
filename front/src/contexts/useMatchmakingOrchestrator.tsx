"use client";

import { useCallback, useEffect, useRef } from 'react';
import { useSearch } from './SearchContext';
import { useLobby } from './LobbyContext';
import { usePlayerPreferences } from './PlayerPreferencesContext';
import { createMockLobby, simulatePlayerJoining, simulateChatMessages } from '@/lib/mockData';

/**
 * Hook orquestrador que integra Search, Lobby e PlayerPreferences
 * Coordena o fluxo completo de matchmaking
 */
export function useMatchmakingOrchestrator() {
  const { startSearch: startSearchBase, cancelSearch: cancelSearchBase, completeSearch, isSearching } = useSearch();
  const { currentLobby, updateLobby, addPlayerToLobby, addChatMessage } = useLobby();
  const { selectRole } = usePlayerPreferences();
  const currentLobbyRef = useRef(currentLobby);

  // Atualizar ref sempre que currentLobby mudar
  useEffect(() => {
    currentLobbyRef.current = currentLobby;
  }, [currentLobby]);

  const startSearch = useCallback((mode: string, searchRegion = 'Global', estTime = 90) => {
    // Iniciar busca
    startSearchBase(mode, searchRegion, estTime);
    
    // Resetar role selecionada
    selectRole(null);
    
    // Criar lobby mock
    const mockLobby = createMockLobby(mode, searchRegion);
    updateLobby(mockLobby);
    
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
  }, [startSearchBase, selectRole, updateLobby, addPlayerToLobby, addChatMessage]);

  const cancelSearch = useCallback(() => {
    cancelSearchBase();
    updateLobby(null);
    selectRole(null);
  }, [cancelSearchBase, updateLobby, selectRole]);

  return {
    startSearch,
    cancelSearch,
    completeSearch,
    isSearching,
  };
}
