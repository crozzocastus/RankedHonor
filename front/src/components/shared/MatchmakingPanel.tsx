"use client";

import { useState } from "react";
import { Swords, Clock, Shield, Loader2, Download, AlertCircle } from "lucide-react";

interface MatchmakingPanelProps {
  currentUser: any;
  onLoginRequired: () => void;
}

export function MatchmakingPanel({ currentUser, onLoginRequired }: MatchmakingPanelProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [hasLauncher, setHasLauncher] = useState(false);

  const handleDownloadLauncher = () => {
    alert(
      "Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada."
    );
    setHasLauncher(true);
  };

  const startSearch = () => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    setIsSearching(true);
    setSearchTime(0);

    // Simulate search timer
    const interval = setInterval(() => {
      setSearchTime((prev) => prev + 1);
    }, 1000);

    // Auto-match after 5 seconds (demo)
    setTimeout(() => {
      clearInterval(interval);
      setIsSearching(false);
      setSearchTime(0);
      alert("Partida encontrada! Preparando campo de batalha...");
    }, 5000);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchTime(0);
  };

  return (
    <div className="sticky top-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-2">
        <Swords className="h-5 w-5 text-orange-500" />
        <h2 className="text-orange-500">MATCHMAKING</h2>
      </div>

      {currentUser ? (
        <div className="space-y-4">
          {!hasLauncher && (
            <div className="rounded border border-blue-600/50 bg-blue-900/20 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                <div className="flex-1">
                  <div className="mb-2 text-blue-400">Baixe o Launcher</div>
                  <p className="mb-3 text-slate-400">
                    Com o launcher, você garante que suas partidas sejam registradas
                    automaticamente. Apenas 1 jogador por partida precisa ter o launcher instalado.
                  </p>
                  <button
                    onClick={handleDownloadLauncher}
                    className="flex w-full items-center justify-center gap-2 rounded border border-green-600/30 bg-green-700/30 py-2 text-green-400 transition-colors hover:bg-green-700/50"
                  >
                    <Download className="h-4 w-4" />
                    Baixar Launcher
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded border border-slate-700 bg-slate-800/50 p-4">
            <div className="mb-2 text-slate-400">Seu Rank Atual</div>
            <div className="text-orange-500">{currentUser.rank}</div>
            <div className="mt-1 text-slate-500">
              {currentUser.wins}W / {currentUser.losses}L
            </div>
          </div>

          <div className="rounded border border-slate-700 bg-slate-800/50 p-4">
            <div className="mb-2 text-slate-400">Herói Principal</div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              <span className="text-slate-200">{currentUser.mainHero}</span>
            </div>
            <div className="mt-1 text-slate-500">Nível {currentUser.level}</div>
          </div>

          {isSearching ? (
            <div className="space-y-4">
              <div className="rounded border border-orange-600/50 bg-orange-900/20 p-6 text-center">
                <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-orange-500" />
                <div className="mb-2 text-orange-500">Procurando adversário...</div>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Clock className="h-4 w-4" />
                  {Math.floor(searchTime / 60)}:{(searchTime % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <button
                onClick={cancelSearch}
                className="w-full rounded bg-red-900/30 py-3 text-red-400 transition-colors hover:bg-red-900/50"
              >
                Cancelar Busca
              </button>
            </div>
          ) : (
            <button
              onClick={startSearch}
              className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-orange-500 to-red-600 py-3 font-semibold text-white transition-colors hover:from-orange-600 hover:to-red-700"
            >
              <Swords className="h-5 w-5" />
              Buscar Partida Ranqueada
            </button>
          )}

          <div className="rounded border border-slate-700/50 bg-slate-800/30 p-4">
            <div className="mb-2 text-slate-400">Modo de Jogo</div>
            <select className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200">
              <option>Duelo 1v1</option>
              <option>Briga 2v2</option>
              <option>Domínio 4v4</option>
              <option>Eliminação 4v4</option>
            </select>
          </div>

          <div className="text-center text-slate-500">Tempo médio de espera: ~45s</div>
        </div>
      ) : (
        <div className="py-8 text-center">
          <Shield className="mx-auto mb-4 h-16 w-16 text-slate-700" />
          <p className="mb-4 text-slate-400">
            Você precisa estar cadastrado para buscar partidas ranqueadas
          </p>
          <button
            onClick={onLoginRequired}
            className="rounded bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 font-semibold text-white transition-colors hover:from-orange-600 hover:to-red-700"
          >
            Fazer Login
          </button>
        </div>
      )}
    </div>
  );
}
