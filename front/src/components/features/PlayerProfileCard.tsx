"use client";

import React, { useState } from "react";
import { LobbyPlayer } from "@/types";
import { cn } from "@/components/ui/utils";
import { User, Shield, Eye, EyeOff } from "lucide-react";

interface PlayerProfileCardProps {
  player: LobbyPlayer;
  isCurrentUser: boolean;
  onFollow?: (userId: string) => void;
  isFollowing?: boolean;
}

export function PlayerProfileCard({
  player,
  isCurrentUser,
  onFollow,
  isFollowing = false,
}: PlayerProfileCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const isPrivate = player.profileVisibility === "private";

  const getRoleLabel = (role: string | null): string => {
    if (role === "mid") return "Mid";
    if (role === "base") return "Base";
    if (role === "rotacao") return "Rotação";
    return "Não selecionado";
  };

  const getFactionColor = (faction: string): string => {
    const colors: { [key: string]: string } = {
      Knights: "text-blue-400",
      Vikings: "text-orange-400",
      Samurai: "text-red-400",
      WuLin: "text-yellow-400",
      Outlanders: "text-purple-400",
    };
    return colors[faction] || "text-slate-400";
  };

  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border transition-all",
        isCurrentUser
          ? "border-blue-500 shadow-lg shadow-blue-500/20"
          : "border-slate-700 hover:border-slate-600"
      )}
    >
      {/* Header com Avatar e Nome */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border-2 border-slate-600">
            <span className="text-2xl font-bold text-slate-300">
              {player.avatar.charAt(0).toUpperCase()}
            </span>
          </div>
          {isCurrentUser && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <User className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Nome e Rank */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-slate-100 truncate">
              {player.nickname}
            </h3>
            {isCurrentUser && (
              <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-full text-white">
                Você
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={cn("font-semibold", getFactionColor(player.faction))}>
              {player.faction}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-semibold">{player.rank}</span>
          </div>

          {player.role && (
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <Shield className="w-3 h-3" />
              <span>{getRoleLabel(player.role)}</span>
            </div>
          )}
        </div>

        {/* Botão de privacidade */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          title={showDetails ? "Ocultar detalhes" : "Ver detalhes"}
        >
          {showDetails ? (
            <EyeOff className="w-4 h-4 text-slate-300" />
          ) : (
            <Eye className="w-4 h-4 text-slate-300" />
          )}
        </button>
      </div>

      {/* Detalhes expandidos */}
      {showDetails && (
        <div className="pt-3 border-t border-slate-700 space-y-2">
          {/* IDs do jogo - sempre visível */}
          <div className="space-y-1">
            {player.ubisoftId && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Ubisoft ID:</span>
                <span className="text-slate-200 font-mono">
                  {player.ubisoftId}
                </span>
              </div>
            )}
            {player.inGameNick && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Nick no jogo:</span>
                <span className="text-slate-200 font-mono">
                  {player.inGameNick}
                </span>
              </div>
            )}
          </div>

          {/* Estatísticas - apenas se público ou se for o próprio jogador */}
          {(!isPrivate || isCurrentUser) && player.stats && (
            <div className="pt-2 border-t border-slate-700">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">
                Estatísticas
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Partidas:</span>
                  <span className="ml-2 text-slate-200 font-semibold">
                    {player.stats.matchesPlayed}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Vitórias:</span>
                  <span className="ml-2 text-green-400 font-semibold">
                    {player.stats.wins}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Derrotas:</span>
                  <span className="ml-2 text-red-400 font-semibold">
                    {player.stats.losses}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Win Rate:</span>
                  <span className="ml-2 text-blue-400 font-semibold">
                    {player.stats.winRate.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">K/D:</span>
                  <span className="ml-2 text-slate-200 font-semibold">
                    {player.stats.deaths > 0
                      ? (player.stats.kills / player.stats.deaths).toFixed(2)
                      : player.stats.kills.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem de perfil privado */}
          {isPrivate && !isCurrentUser && (
            <div className="pt-2 border-t border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800 rounded-lg p-2">
                <EyeOff className="w-4 h-4" />
                <span>Este perfil é privado</span>
              </div>
            </div>
          )}

          {/* Botão de seguir */}
          {!isCurrentUser && onFollow && (
            <button
              onClick={() => onFollow(player.userId)}
              className={cn(
                "w-full mt-2 py-2 px-4 rounded-lg font-semibold text-sm transition-all",
                isFollowing
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              )}
            >
              {isFollowing ? "Deixar de seguir" : "Seguir"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
