"use client";

import {
  Sword,
  User,
  LogOut,
  Home,
  Download,
  Radio,
  BarChart3,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onContentClick?: () => void;
  onStatsClick?: () => void;
}

export function Navbar({ onContentClick, onStatsClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleDownloadLauncher = () => {
    alert(
      "Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada."
    );
  };

  const handleHomeClick = () => {
    // Redireciona para home pública ou dashboard dependendo do estado de autenticação
    router.push(user ? "/dashboard" : "/");
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    setIsProfileMenuOpen(false);
    alert("Configurações do perfil");
  };

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-500/20 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - sempre visível */}
          <div className="flex cursor-pointer items-center gap-3" onClick={handleHomeClick}>
            <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-2">
              <Sword className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-orange-500">FOR HONOR RANKED</span>
          </div>

          {/* Navegação central - mantida consistente */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
            >
              <Home className="h-4 w-4" />
              Início
            </button>

            <button
              onClick={onContentClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
            >
              <Radio className="h-4 w-4" />
              Conteúdo
            </button>

            <button
              onClick={onStatsClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
            >
              <BarChart3 className="h-4 w-4" />
              Rankings
            </button>

            <button
              onClick={() => (user ? router.push("/ranked") : router.push("/login"))}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
            >
              <Sword className="h-4 w-4" />
              Ranqueada
            </button>
          </div>

          {/* Área direita - mantém mesma estrutura visual */}
          <div className="flex items-center gap-4">
            {/* Download Launcher - sempre visível */}
            <button
              onClick={handleDownloadLauncher}
              className="flex items-center gap-2 rounded border border-green-600/30 bg-green-700/30 px-4 py-2 text-green-400 transition-colors hover:bg-green-700/50"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Baixar Launcher</span>
            </button>

            {/* Área de autenticação - mantém mesma estrutura visual */}
            {user ? (
              /* Avatar e menu dropdown - mesmo tamanho e posição dos botões originais */
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 rounded border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
                    <span className="text-xs font-bold text-black">
                      {user.nickname[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user.nickname}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
                    <button
                      onClick={handleProfileClick}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-slate-300 transition-colors hover:bg-slate-700"
                    >
                      <User className="h-4 w-4" />
                      Perfil
                    </button>
                    <button
                      onClick={handleSettingsClick}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-slate-300 transition-colors hover:bg-slate-700"
                    >
                      <Settings className="h-4 w-4" />
                      Configurações
                    </button>
                    <hr className="border-slate-700" />
                    <button
                      onClick={handleLogoutClick}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-400 transition-colors hover:bg-slate-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Botões de login/registro - mantém layout visual consistente */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/login")}
                  className="rounded border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                >
                  Entrar
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="rounded bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 font-semibold text-white transition-colors hover:from-orange-600 hover:to-red-700"
                >
                  Criar conta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
