'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  nickname: string;
  email: string;
  region: string;
  avatar: string;
  profileVisibility: 'public' | 'private';
  stats?: {
    rank: string;
    dueloRank: string;
    brigaRank: string;
    dominioRank: string;
    invasaoRank: string;
    tributoRank: string;
    mataMataRank: string;
    matchesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
    kills: number;
    deaths: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (nickname: string, password: string) => Promise<boolean>;
  register: (nickname: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuários para simulação
const mockUsers: User[] = [
  {
    id: '1',
    nickname: 'WarLegend',
    email: 'war@legend.com',
    region: 'EU',
    avatar: 'warden',
    profileVisibility: 'public',
    stats: {
      rank: 'Diamante II',
      dueloRank: 'Diamante I',
      brigaRank: 'Diamante III',
      dominioRank: 'Platina I',
      invasaoRank: 'Platina II',
      tributoRank: 'Ouro III',
      mataMataRank: 'Ouro I',
      matchesPlayed: 1247,
      wins: 789,
      losses: 458,
      winRate: 63.3,
      kills: 15420,
      deaths: 8934
    }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário salvo no localStorage ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('forHonorUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('forHonorUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('forHonorUser');
    }
  }, [user]);

  const login = async (nickname: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Buscar usuário mock
    const foundUser = mockUsers.find(u => u.nickname === nickname);
    
    if (foundUser && password === '123456') { // Senha mock para teste
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (nickname: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar se nickname já existe
    if (mockUsers.some(u => u.nickname === nickname)) {
      setIsLoading(false);
      return false;
    }
    
    // Criar novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      nickname,
      email,
      region: 'Global',
      avatar: 'warden', // Avatar padrão
      profileVisibility: 'public',
      stats: {
        rank: 'Bronze III',
        dueloRank: 'Bronze III',
        brigaRank: 'Bronze III',
        dominioRank: 'Bronze III',
        invasaoRank: 'Bronze III',
        tributoRank: 'Bronze III',
        mataMataRank: 'Bronze III',
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        kills: 0,
        deaths: 0
      }
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Atualizar também no mockUsers
      const index = mockUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
