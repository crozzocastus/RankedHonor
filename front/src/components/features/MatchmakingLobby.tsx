"use client";

import React, { useState, useEffect, useRef } from "react";
import { MatchmakingLobby as LobbyType, ChatMessage, MapRole, HeroClass } from "@/types";
import { PlayerProfileCard } from "./PlayerProfileCard";
import { MapRoleSelector } from "./MapRoleSelector";
import { HeroClassSelector } from "./HeroClassSelector";
import { PreparationTimer } from "./PreparationTimer";
import { cn } from "@/components/ui/utils";
import { Send, Users, MessageSquare, X } from "lucide-react";

interface MatchmakingLobbyProps {
  lobby: LobbyType;
  currentUserId: string;
  onRoleSelect: (role: MapRole) => void;
  onHeroSelect: (heroId: string | null) => void;
  onClassToggle: (heroClass: HeroClass) => void;
  onSendMessage: (message: string) => void;
  onLeave: () => void;
  onFollow?: (userId: string) => void;
  followedUsers?: Set<string>;
}

export function MatchmakingLobby({
  lobby,
  currentUserId,
  onRoleSelect,
  onHeroSelect,
  onClassToggle,
  onSendMessage,
  onLeave,
  onFollow,
  followedUsers = new Set(),
}: MatchmakingLobbyProps) {
  const [messageInput, setMessageInput] = useState("");
  const [showChat, setShowChat] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentPlayer = lobby.players.find((p) => p.userId === currentUserId);
  const selectedRole = currentPlayer?.role || null;
  const selectedHero = currentPlayer?.selectedHero || null;
  const preferredClasses = currentPlayer?.preferredClasses || [];

  // Auto-scroll do chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lobby.chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput("");
    }
  };

  const getElapsedTime = () => {
    const elapsed = Math.floor((Date.now() - lobby.createdAt) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const [elapsedTime, setElapsedTime] = useState(getElapsedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [lobby.createdAt]);

  // Separar jogadores por time (se aplicável)
  const team1 = lobby.players.filter((p) => p.teamId === 1);
  const team2 = lobby.players.filter((p) => p.teamId === 2);
  const hasTeams = team1.length > 0 || team2.length > 0;

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden min-h-[80vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-4 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Sala de Matchmaking
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {lobby.players.length}/{lobby.maxPlayers} jogadores
              </span>
              <span>•</span>
              <span className="font-semibold text-blue-300">
                {lobby.gameMode.toUpperCase()}
              </span>
              <span>•</span>
              <span>{lobby.region}</span>
              <span>•</span>
              <span className="font-mono text-green-400">{elapsedTime}</span>
            </div>
          </div>
        </div>

        {/* Banner de Preparação quando lobby estiver cheio */}
        {lobby.players.length >= lobby.maxPlayers && lobby.preparationStartedAt && (
          <div className="bg-yellow-900 border-y border-yellow-600 p-4">
            <PreparationTimer
              startedAt={lobby.preparationStartedAt}
              durationSeconds={lobby.preparationTimeSeconds || 60}
              onComplete={() => {
                console.log('Preparation complete, starting match!');
                // TODO: Iniciar partida
              }}
            />
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna Esquerda - Jogadores */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Seletor de função no mapa */}
            <div className="mb-6">
              <MapRoleSelector
                players={lobby.players}
                currentUserId={currentUserId}
                selectedRole={selectedRole}
                onRoleSelect={onRoleSelect}
                gameMode={lobby.gameMode}
              />
            </div>

            {/* Seletor de Herói e Classe */}
            <div className="mb-6">
              <HeroClassSelector
                selectedHero={selectedHero}
                preferredClasses={preferredClasses}
                onHeroSelect={onHeroSelect}
                onClassToggle={onClassToggle}
              />
            </div>

            {/* Lista de jogadores */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Jogadores Conectados
              </h3>

              {hasTeams ? (
                <>
                  {/* Time 1 */}
                  {team1.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-400">
                        Time 1 ({team1.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {team1.map((player) => (
                          <PlayerProfileCard
                            key={player.userId}
                            player={player}
                            isCurrentUser={player.userId === currentUserId}
                            onFollow={onFollow}
                            isFollowing={followedUsers.has(player.userId)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Time 2 */}
                  {team2.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-orange-400">
                        Time 2 ({team2.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {team2.map((player) => (
                          <PlayerProfileCard
                            key={player.userId}
                            player={player}
                            isCurrentUser={player.userId === currentUserId}
                            onFollow={onFollow}
                            isFollowing={followedUsers.has(player.userId)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lobby.players.map((player) => (
                    <PlayerProfileCard
                      key={player.userId}
                      player={player}
                      isCurrentUser={player.userId === currentUserId}
                      onFollow={onFollow}
                      isFollowing={followedUsers.has(player.userId)}
                    />
                  ))}
                </div>
              )}

              {/* Slots vazios */}
              {lobby.players.length < lobby.maxPlayers && (
                <div className="mt-4">
                  <p className="text-sm text-slate-500 text-center">
                    Aguardando{" "}
                    {lobby.maxPlayers - lobby.players.length} jogador(es)...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Coluna Direita - Chat */}
          <div className="w-96 border-l border-slate-700 flex flex-col bg-slate-900/50">
            {/* Header do Chat */}
            <div className="p-4 border-b border-slate-700 bg-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat
                </h3>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="text-xs text-slate-400 hover:text-slate-300"
                >
                  {showChat ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            {showChat && (
              <>
                {/* Mensagens */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {lobby.chatMessages.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center mt-8">
                      Nenhuma mensagem ainda. Seja o primeiro a falar!
                    </p>
                  ) : (
                    lobby.chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "rounded-lg p-3",
                          msg.userId === currentUserId
                            ? "bg-blue-900/50 ml-4"
                            : "bg-slate-800 mr-4"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              "font-semibold text-sm",
                              msg.userId === currentUserId
                                ? "text-blue-300"
                                : "text-slate-300"
                            )}
                          >
                            {msg.nickname}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(msg.timestamp).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-slate-200">{msg.message}</p>
                        {msg.isModerated && (
                          <p className="text-xs text-yellow-500 mt-1">
                            ⚠️ Mensagem moderada
                          </p>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input de mensagem */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-slate-700 bg-slate-900"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      maxLength={200}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {messageInput.length}/200 caracteres
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Footer com status */}
        <div className="bg-slate-900 p-3 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-400">
                Procurando partida...
              </span>
            </div>
            <span className="text-slate-500">
              Lobby ID: {lobby.lobbyId.slice(0, 8)}
            </span>
          </div>
        </div>
    </div>
  );
}
