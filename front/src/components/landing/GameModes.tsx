import { Swords, Users, Flag, Zap, Gift, Target } from "lucide-react";

const modes = [
  {
    icon: Swords,
    name: "Duelo",
    description: "1v1 puro skill",
    players: "1v1",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Users,
    name: "Briga",
    description: "Combate em dupla",
    players: "2v2",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: Flag,
    name: "Domínio",
    description: "Controle os pontos",
    players: "4v4",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: Zap,
    name: "Invasão",
    description: "Defesa e ataque",
    players: "4v4",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Gift,
    name: "Tributo",
    description: "Capture oferendas",
    players: "4v4",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Target,
    name: "Mata-mata",
    description: "Eliminação em rounds",
    players: "4v4",
    color: "from-red-500 to-orange-600",
  },
];

export function GameModes() {
  return (
    <section id="rankings" className="bg-gray-950 py-16">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-white">Modos de Jogo Ranqueados</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Suba no ranking em cada modo de jogo e prove sua versatilidade em combate
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <div
                key={index}
                className="group rounded-xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-orange-500/30"
              >
                <div
                  className={`h-14 w-14 bg-gradient-to-br ${mode.color} mb-4 flex items-center justify-center rounded-xl`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-white">{mode.name}</h3>
                    <span className="rounded-full bg-gray-800 px-3 py-1 text-gray-400">
                      {mode.players}
                    </span>
                  </div>
                  <p className="text-gray-400">{mode.description}</p>
                </div>

                <button className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-gray-300 transition-all hover:border-orange-500/30 hover:bg-orange-500/20 hover:text-orange-500">
                  Ver ranking
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
