"use client";

import React from "react";
import { MapRole, LobbyPlayer } from "@/types";
import { cn } from "@/components/ui/utils";

interface MapRoleSelectorProps {
  players: LobbyPlayer[];
  currentUserId: string;
  selectedRole: MapRole;
  onRoleSelect: (role: MapRole) => void;
  gameMode: string;
}

export function MapRoleSelector({
  players,
  currentUserId,
  selectedRole,
  onRoleSelect,
  gameMode,
}: MapRoleSelectorProps) {
  // Apenas mostrar seletor para modos 4v4
  const show4v4Selector = ["dominio", "invasao", "tributo", "mata_mata"].includes(
    gameMode.toLowerCase()
  );

  if (!show4v4Selector) {
    return null;
  }

  const getPlayersByRole = (role: MapRole) => {
    return players.filter((p) => p.role === role);
  };

  const getRoleLabel = (role: MapRole): string => {
    if (role === "mid") return "Mid (Ponto B)";
    if (role === "base") return "Base (Ponto C)";
    if (role === "rotacao") return "Rotação (Ponto A)";
    return "Não selecionado";
  };

  const roles: MapRole[] = ["mid", "base", "rotacao"];

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">
        Seleção de Posição no Mapa
      </h3>

      {/* Mapa Visual */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <svg
          viewBox="0 0 400 500"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fundo do mapa */}
          <rect
            x="0"
            y="0"
            width="400"
            height="500"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Linhas de conexão */}
          <line
            x1="200"
            y1="100"
            x2="200"
            y2="250"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="200"
            y1="250"
            x2="200"
            y2="400"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Ponto A - Rotação (Topo) */}
          <g>
            <circle
              cx="200"
              cy="100"
              r="50"
              fill={selectedRole === "rotacao" ? "#3b82f6" : "#334155"}
              stroke={selectedRole === "rotacao" ? "#60a5fa" : "#475569"}
              strokeWidth="3"
              className="cursor-pointer transition-all hover:stroke-blue-400"
              onClick={() => onRoleSelect("rotacao")}
            />
            <text
              x="200"
              y="95"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="24"
              fontWeight="bold"
              className="pointer-events-none"
            >
              A
            </text>
            <text
              x="200"
              y="112"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12"
              className="pointer-events-none"
            >
              Rotação
            </text>
          </g>

          {/* Ponto B - Mid (Centro) */}
          <g>
            <circle
              cx="200"
              cy="250"
              r="50"
              fill={selectedRole === "mid" ? "#3b82f6" : "#334155"}
              stroke={selectedRole === "mid" ? "#60a5fa" : "#475569"}
              strokeWidth="3"
              className="cursor-pointer transition-all hover:stroke-blue-400"
              onClick={() => onRoleSelect("mid")}
            />
            <text
              x="200"
              y="245"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="24"
              fontWeight="bold"
              className="pointer-events-none"
            >
              B
            </text>
            <text
              x="200"
              y="262"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12"
              className="pointer-events-none"
            >
              Mid
            </text>
          </g>

          {/* Ponto C - Base (Base) */}
          <g>
            <circle
              cx="200"
              cy="400"
              r="50"
              fill={selectedRole === "base" ? "#3b82f6" : "#334155"}
              stroke={selectedRole === "base" ? "#60a5fa" : "#475569"}
              strokeWidth="3"
              className="cursor-pointer transition-all hover:stroke-blue-400"
              onClick={() => onRoleSelect("base")}
            />
            <text
              x="200"
              y="395"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="24"
              fontWeight="bold"
              className="pointer-events-none"
            >
              C
            </text>
            <text
              x="200"
              y="412"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12"
              className="pointer-events-none"
            >
              Base
            </text>
          </g>
        </svg>
      </div>

      {/* Lista de jogadores por função */}
      <div className="space-y-4">
        {roles.map((role) => {
          const rolePlayers = getPlayersByRole(role);
          return (
            <div
              key={role || "none"}
              className={cn(
                "rounded-lg p-3 border transition-all",
                selectedRole === role
                  ? "bg-blue-950 border-blue-500"
                  : "bg-slate-800 border-slate-700"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-200">
                  {getRoleLabel(role)}
                </span>
                <span className="text-sm text-slate-400">
                  {rolePlayers.length} jogador(es)
                </span>
              </div>

              {rolePlayers.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {rolePlayers.map((player) => (
                    <div
                      key={player.userId}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
                        player.userId === currentUserId
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-200"
                      )}
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs">
                        {player.avatar.charAt(0).toUpperCase()}
                      </div>
                      <span>{player.nickname}</span>
                      {player.userId === currentUserId && (
                        <span className="text-xs">(Você)</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Nenhum jogador nesta posição
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Instruções */}
      <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          💡 Clique nos pontos do mapa para selecionar sua posição preferida.
          Múltiplos jogadores podem escolher a mesma posição.
        </p>
      </div>
    </div>
  );
}
