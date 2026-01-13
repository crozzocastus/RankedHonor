"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User, AuthContextType } from "@/types";
import {
  loginUser,
  registerUser,
  getSavedUser,
  saveUser,
  updateUserInMockData,
} from "@/services/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário salvo no localStorage ao carregar
  useEffect(() => {
    const savedUser = getSavedUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    saveUser(user);
  }, [user]);

  const login = async (nickname: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const foundUser = await loginUser(nickname, password);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (nickname: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const newUser = await registerUser(nickname, email, password);
    if (newUser) {
      setUser(newUser);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      updateUserInMockData(user.id, updates);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
