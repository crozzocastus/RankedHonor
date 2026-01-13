import { Users, Swords, Trophy, Play } from "lucide-react";

interface DashboardHeroProps {
  onQuickRankedClick: () => void;
  isQuickRankedLoading: boolean;
  quickRankedStatus: string;
}

export function DashboardHero({
  onQuickRankedClick,
  isQuickRankedLoading,
  quickRankedStatus,
}: DashboardHeroProps) {
  return (
    <section className="bg-gradient-to-b from-black to-gray-950 py-12">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Jogadores Ativos - Elemento principal mantido do topo */}
          <div className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold text-white">Jogadores Ativos</h3>
              </div>
              <div className="rounded-full bg-green-500/20 px-3 py-1 text-green-500">12,847</div>
            </div>
            <p className="mb-4 text-gray-400">Competidores online em todas as regiões</p>
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
          <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-600/10 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Swords className="h-8 w-8 text-orange-500" />
              <h3 className="text-xl font-bold text-white">Ranqueada Rápida</h3>
            </div>

            {!isQuickRankedLoading ? (
              <div>
                <p className="mb-4 text-gray-400">
                  Entre em uma partida competitiva agora usando o modo mais ativo da sua região
                </p>
                <button
                  onClick={onQuickRankedClick}
                  className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-3 font-bold text-white transition-all hover:scale-105 hover:from-orange-600 hover:to-red-700"
                >
                  <Play className="h-5 w-5" />
                  Jogar Ranqueada Agora
                </button>
              </div>
            ) : (
              <div className="py-4 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                <p className="font-semibold text-orange-500">{quickRankedStatus}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Buscando no modo mais ativo da sua região...
                </p>
              </div>
            )}
          </div>

          {/* Ver Rankings - Acesso rápido */}
          <div className="rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-white">Rankings</h3>
            </div>
            <p className="mb-4 text-gray-400">Confira os melhores jogadores e equipes</p>
            <button
              onClick={() => (window.location.href = "/ranked")}
              className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 py-3 font-bold text-white transition-all hover:scale-105 hover:from-yellow-600 hover:to-orange-700"
            >
              <Trophy className="h-5 w-5" />
              Ver Rankings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
