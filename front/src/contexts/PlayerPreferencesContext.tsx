"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { MapRole, HeroClass } from '@/types';
import { useLobby } from './LobbyContext';

interface PlayerPreferencesContextType {
  selectedRole: MapRole;
  followedUsers: Set<string>;
  selectRole: (role: MapRole) => void;
  selectHero: (heroId: string | null) => void;
  togglePreferredClass: (heroClass: HeroClass) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const PlayerPreferencesContext = createContext<PlayerPreferencesContextType | undefined>(undefined);

export function PlayerPreferencesProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<MapRole>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const { currentLobby, updateLobby } = useLobby();

  // Carregar follows do localStorage
  useEffect(() => {
    const savedFollows = localStorage.getItem('followedUsers');
    if (savedFollows) {
      setFollowedUsers(new Set(JSON.parse(savedFollows)));
    }
  }, []);

  // Salvar follows no localStorage
  useEffect(() => {
    localStorage.setItem('followedUsers', JSON.stringify(Array.from(followedUsers)));
  }, [followedUsers]);

  const selectRole = useCallback((role: MapRole) => {
    setSelectedRole(role);
    
    // Atualizar role do jogador no lobby
    if (currentLobby) {
      updateLobby({
        ...currentLobby,
        players: currentLobby.players.map(p => 
          p.userId === 'current-user-id' // TODO: usar userId real do contexto de auth
            ? { ...p, role }
            : p
        )
      });
    }
  }, [currentLobby, updateLobby]);

  const selectHero = useCallback((heroId: string | null) => {
    if (!currentLobby) return;
    
    updateLobby({
      ...currentLobby,
      players: currentLobby.players.map(p =>
        p.userId === 'current-user-id'
          ? { ...p, selectedHero: heroId }
          : p
      )
    });
  }, [currentLobby, updateLobby]);

  const togglePreferredClass = useCallback((heroClass: HeroClass) => {
    if (!currentLobby) return;
    
    updateLobby({
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
  }, [currentLobby, updateLobby]);

  const followUser = useCallback((userId: string) => {
    setFollowedUsers(prev => new Set(prev).add(userId));
  }, []);

  const unfollowUser = useCallback((userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  }, []);

  const value = useMemo(() => ({
    selectedRole,
    followedUsers,
    selectRole,
    selectHero,
    togglePreferredClass,
    followUser,
    unfollowUser,
  }), [selectedRole, followedUsers, selectRole, selectHero, togglePreferredClass, followUser, unfollowUser]);

  return (
    <PlayerPreferencesContext.Provider value={value}>
      {children}
    </PlayerPreferencesContext.Provider>
  );
}

export function usePlayerPreferences() {
  const context = useContext(PlayerPreferencesContext);
  if (!context) {
    throw new Error('usePlayerPreferences must be used within PlayerPreferencesProvider');
  }
  return context;
}
