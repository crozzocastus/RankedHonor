import { Users, Swords, Trophy, Play } from 'lucide-react';

interface DashboardHeroProps {
  onQuickRankedClick: () => void;
  isQuickRankedLoading: boolean;
  quickRankedStatus: string;
}

export function DashboardHero({ onQuickRankedClick, isQuickRankedLoading, quickRankedStatus }: DashboardHeroProps) {
  return (
    <section className="py-12 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Jogadores Ativos - Elemento principal mantido do topo */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-bold text-white">Jogadores Ativos</h3>
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full">
                12,847
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Competidores online em todas as regiões
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Duelo 1v1</span>
                <span className="text-green-500">4,231</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Briga 2v2</span>
                <span className="text-green-500">3,892</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Domínio 4v4</span>
                <span className="text-green-500">4,724</span>
              </div>
            </div>
          </div>

          {/* Jogar Ranqueada Agora - Botão principal com estados */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Swords className="w-8 h-8 text-orange-500" />
              <h3 className="text-xl font-bold text-white">Ranqueada Rápida</h3>
            </div>
            
            {!isQuickRankedLoading ? (
              <div>
                <p className="text-gray-400 mb-4">
                  Entre em uma partida competitiva agora usando o modo mais ativo da sua região
                </p>
                <button
                  onClick={onQuickRankedClick}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Jogar Ranqueada Agora
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-orange-500 font-semibold">{quickRankedStatus}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Buscando no modo mais ativo da sua região...
                </p>
              </div>
            )}
          </div>

          {/* Ver Rankings - Acesso rápido */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-white">Rankings</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Confira os melhores jogadores e equipes
            </p>
            <button
              onClick={() => window.location.href = '/ranked'}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Ver Rankings
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
