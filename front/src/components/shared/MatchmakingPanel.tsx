'use client';

import { useState } from 'react';
import { Swords, Clock, Shield, Loader2, Download, AlertCircle } from 'lucide-react';

interface MatchmakingPanelProps {
  currentUser: any;
  onLoginRequired: () => void;
}

export function MatchmakingPanel({ currentUser, onLoginRequired }: MatchmakingPanelProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [hasLauncher, setHasLauncher] = useState(false);

  const handleDownloadLauncher = () => {
    alert('Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada.');
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
      setSearchTime(prev => prev + 1);
    }, 1000);

    // Auto-match after 5 seconds (demo)
    setTimeout(() => {
      clearInterval(interval);
      setIsSearching(false);
      setSearchTime(0);
      alert('Partida encontrada! Preparando campo de batalha...');
    }, 5000);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchTime(0);
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <Swords className="w-5 h-5 text-amber-500" />
        <h2 className="text-amber-500">MATCHMAKING</h2>
      </div>

      {currentUser ? (
        <div className="space-y-4">
          {!hasLauncher && (
            <div className="p-4 bg-blue-900/20 border border-blue-600/50 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-blue-400 mb-2">Baixe o Launcher</div>
                  <p className="text-slate-400 mb-3">
                    Com o launcher, você garante que suas partidas sejam registradas automaticamente. Apenas 1 jogador por partida precisa ter o launcher instalado.
                  </p>
                  <button
                    onClick={handleDownloadLauncher}
                    className="w-full py-2 bg-green-700/30 hover:bg-green-700/50 text-green-400 border border-green-600/30 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Launcher
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
            <div className="text-slate-400 mb-2">Seu Rank Atual</div>
            <div className="text-amber-500">{currentUser.rank}</div>
            <div className="text-slate-500 mt-1">
              {currentUser.wins}W / {currentUser.losses}L
            </div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
            <div className="text-slate-400 mb-2">Herói Principal</div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-slate-200">{currentUser.mainHero}</span>
            </div>
            <div className="text-slate-500 mt-1">Nível {currentUser.level}</div>
          </div>

          {isSearching ? (
            <div className="space-y-4">
              <div className="p-6 bg-amber-900/20 border border-amber-600/50 rounded text-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
                <div className="text-amber-500 mb-2">Procurando adversário...</div>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  {Math.floor(searchTime / 60)}:{(searchTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <button
                onClick={cancelSearch}
                className="w-full py-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded transition-colors"
              >
                Cancelar Busca
              </button>
            </div>
          ) : (
            <button
              onClick={startSearch}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-slate-900 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Swords className="w-5 h-5" />
              Buscar Partida Ranqueada
            </button>
          )}

          <div className="p-4 bg-slate-800/30 rounded border border-slate-700/50">
            <div className="text-slate-400 mb-2">Modo de Jogo</div>
            <select className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200">
              <option>Duelo 1v1</option>
              <option>Briga 2v2</option>
              <option>Domínio 4v4</option>
              <option>Eliminação 4v4</option>
            </select>
          </div>

          <div className="text-slate-500 text-center">
            Tempo médio de espera: ~45s
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">
            Você precisa estar cadastrado para buscar partidas ranqueadas
          </p>
          <button
            onClick={onLoginRequired}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-slate-900 rounded transition-colors"
          >
            Fazer Login
          </button>
        </div>
      )}
    </div>
  );
}
