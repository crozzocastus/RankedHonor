'use client';

import { Sword, User, LogOut, Home, Download, Radio, BarChart3, ChevronDown, Settings } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  onContentClick?: () => void;
  onStatsClick?: () => void;
}

export function Navbar({ onContentClick, onStatsClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleDownloadLauncher = () => {
    alert('Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada.');
  };

  const handleHomeClick = () => {
    // Redireciona para home pública ou dashboard dependendo do estado de autenticação
    router.push(user ? '/dashboard' : '/');
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    setIsProfileMenuOpen(false);
    alert('Configurações do perfil');
  };

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-orange-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - sempre visível */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleHomeClick}>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <Sword className="w-6 h-6 text-white" />
            </div>
            <span className="text-orange-500 font-bold">FOR HONOR RANKED</span>
          </div>

          {/* Navegação central - mantida consistente */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-500 transition-colors"
            >
              <Home className="w-4 h-4" />
              Início
            </button>
            
            <button
              onClick={onContentClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-500 transition-colors"
            >
              <Radio className="w-4 h-4" />
              Conteúdo
            </button>
            
            <button
              onClick={onStatsClick}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-500 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Rankings
            </button>
            
            <button
              onClick={() => user ? router.push('/ranked') : router.push('/login')}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-500 transition-colors"
            >
              <Sword className="w-4 h-4" />
              Ranqueada
            </button>
          </div>

          {/* Área direita - mantém mesma estrutura visual */}
          <div className="flex items-center gap-4">
            {/* Download Launcher - sempre visível */}
            <button
              onClick={handleDownloadLauncher}
              className="flex items-center gap-2 px-4 py-2 bg-green-700/30 hover:bg-green-700/50 text-green-400 border border-green-600/30 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar Launcher</span>
            </button>
            
            {/* Área de autenticação - mantém mesma estrutura visual */}
            {user ? (
              /* Avatar e menu dropdown - mesmo tamanho e posição dos botões originais */
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded transition-colors"
                >
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">{user.nickname[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:inline">{user.nickname}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </button>
                    <button
                      onClick={handleSettingsClick}
                      className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Configurações
                    </button>
                    <hr className="border-slate-700" />
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Botões de login/registro - mantém layout visual consistente */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded transition-colors"
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
