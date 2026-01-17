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
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface NavbarProps {
  variant?: "landing" | "dashboard";
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onContentClick?: () => void;
  onStatsClick?: () => void;
}

export function Navbar({
  variant = "dashboard",
  onLoginClick,
  onRegisterClick,
  onContentClick,
  onStatsClick,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarImageError, setAvatarImageError] = useState(false);

  const isLanding = variant === "landing";

  const getAvatarImagePath = () => {
    if (!user?.faction || !user?.avatar) return "";
    const factionFolder = user.faction.toLowerCase().replace(" ", "-");
    return `/icons/heroes/${factionFolder}/${user.avatar}.png`;
  };

  const getAvatarFallback = () => {
    return user?.nickname?.[0]?.toUpperCase() || "U";
  };

  const handleDownloadLauncher = () => {
    alert(
      "Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada."
    );
  };

  const handleHomeClick = () => {
    router.push(user ? "/dashboard" : "/");
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    alert("Configurações do perfil");
  };

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
    router.push("/");
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    if (onLoginClick) {
      onLoginClick();
    } else {
      router.push("/login");
    }
  };

  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      router.push("/register");
    }
  };

  const handleContentClick = () => {
    setIsMobileMenuOpen(false);
    if (onContentClick) {
      onContentClick();
    } else {
      router.push("/content");
    }
  };

  const handleStatsClick = () => {
    setIsMobileMenuOpen(false);
    if (onStatsClick) {
      onStatsClick();
    } else {
      router.push("/#rankings");
    }
  };

  const handleRankedClick = () => {
    setIsMobileMenuOpen(false);
    if (user) {
      router.push("/ranked");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-500/20 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={handleHomeClick}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
              <Sword className="h-6 w-6 text-black" />
            </div>
            <span className="font-bold tracking-wider text-orange-500">
              RANKED HONOR
            </span>
          </div>

          {/* Desktop Navigation */}
          {isLanding ? (
            /* Landing Page Navigation */
            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="/"
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Início
              </a>
              <button
                onClick={handleContentClick}
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Conteúdo
              </button>
              <a
                href="/#rankings"
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Rankings
              </a>
              <a
                href="/#como-funciona"
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Como funciona
              </a>
              <a
                href="/#criadores"
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Criadores
              </a>
              <a
                href="/#launcher"
                className="text-gray-300 transition-colors hover:text-orange-500"
              >
                Launcher
              </a>
            </nav>
          ) : (
            /* Dashboard Navigation */
            <div className="hidden items-center gap-4 md:flex">
              <button
                onClick={handleHomeClick}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
              >
                <Home className="h-4 w-4" />
                Início
              </button>

              <button
                onClick={handleContentClick}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
              >
                <Radio className="h-4 w-4" />
                Conteúdo
              </button>

              <button
                onClick={handleStatsClick}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
              >
                <BarChart3 className="h-4 w-4" />
                Rankings
              </button>

              {user && (
                <button
                  onClick={handleRankedClick}
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 transition-colors hover:text-orange-500"
                >
                  <Sword className="h-4 w-4" />
                  Ranqueada
                </button>
              )}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Download Launcher - Only on dashboard variant */}
            {!isLanding && (
              <button
                onClick={handleDownloadLauncher}
                className="hidden items-center gap-2 rounded border border-green-600/30 bg-green-700/30 px-4 py-2 text-green-400 transition-colors hover:bg-green-700/50 sm:flex"
              >
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Baixar Launcher</span>
              </button>
            )}

            {/* Auth Area - Desktop */}
            <div className="hidden md:flex md:items-center md:gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 rounded border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-orange-500/30">
                      {!avatarImageError && getAvatarImagePath() ? (
                        <Image
                          src={getAvatarImagePath()}
                          alt={`Avatar de ${user.nickname}`}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                          onError={() => setAvatarImageError(true)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                          <span className="text-xs font-bold text-white">
                            {getAvatarFallback()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="hidden sm:inline">{user.nickname}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

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
                <>
                  <button
                    onClick={handleLoginClick}
                    className="rounded border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="rounded bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 font-semibold text-white transition-colors hover:from-orange-600 hover:to-red-700"
                  >
                    Criar conta
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-orange-500/20 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {isLanding ? (
                /* Landing Page Mobile Navigation */
                <>
                  <a
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Início
                  </a>
                  <button
                    onClick={handleContentClick}
                    className="rounded px-4 py-3 text-left text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Conteúdo
                  </button>
                  <a
                    href="/#rankings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Rankings
                  </a>
                  <a
                    href="/#como-funciona"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Como funciona
                  </a>
                  <a
                    href="/#criadores"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Criadores
                  </a>
                  <a
                    href="/#launcher"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    Launcher
                  </a>
                </>
              ) : (
                /* Dashboard Mobile Navigation */
                <>
                  <button
                    onClick={handleHomeClick}
                    className="flex items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    <Home className="h-4 w-4" />
                    Início
                  </button>
                  <button
                    onClick={handleContentClick}
                    className="flex items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    <Radio className="h-4 w-4" />
                    Conteúdo
                  </button>
                  <button
                    onClick={handleStatsClick}
                    className="flex items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Rankings
                  </button>
                  {user && (
                    <button
                      onClick={handleRankedClick}
                      className="flex items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-orange-500"
                    >
                      <Sword className="h-4 w-4" />
                      Ranqueada
                    </button>
                  )}
                  {!isLanding && (
                    <button
                      onClick={handleDownloadLauncher}
                      className="flex items-center gap-2 rounded border border-green-600/30 bg-green-700/30 px-4 py-3 text-green-400 transition-colors hover:bg-green-700/50"
                    >
                      <Download className="h-4 w-4" />
                      Baixar Launcher
                    </button>
                  )}
                </>
              )}

              {/* Mobile Auth Buttons / User Menu */}
              {user ? (
                <div className="mt-2 border-t border-slate-700 pt-2">
                  <button
                    onClick={handleProfileClick}
                    className="flex w-full items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800"
                  >
                    <User className="h-4 w-4" />
                    Perfil
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex w-full items-center gap-2 rounded px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4" />
                    Configurações
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="flex w-full items-center gap-2 rounded px-4 py-3 text-red-400 transition-colors hover:bg-slate-800"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex flex-col gap-2 border-t border-slate-700 pt-2">
                  <button
                    onClick={handleLoginClick}
                    className="rounded border border-slate-600 bg-slate-800 px-4 py-3 text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="rounded bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 font-semibold text-white transition-colors hover:from-orange-600 hover:to-red-700"
                  >
                    Criar conta
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
