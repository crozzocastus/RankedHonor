import { Swords, Users, Flag, Zap, Gift, Target } from 'lucide-react';

const modes = [
  {
    icon: Swords,
    name: 'Duelo',
    description: '1v1 puro skill',
    players: '1v1',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Users,
    name: 'Briga',
    description: 'Combate em dupla',
    players: '2v2',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Flag,
    name: 'Domínio',
    description: 'Controle os pontos',
    players: '4v4',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Zap,
    name: 'Invasão',
    description: 'Defesa e ataque',
    players: '4v4',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Gift,
    name: 'Tributo',
    description: 'Capture oferendas',
    players: '4v4',
    color: 'from-pink-500 to-rose-600'
  },
  {
    icon: Target,
    name: 'Mata-mata',
    description: 'Eliminação em rounds',
    players: '4v4',
    color: 'from-red-500 to-orange-600'
  }
];

export function GameModes() {
  return (
    <section id="rankings" className="py-16 bg-gray-950">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Modos de Jogo Ranqueados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Suba no ranking em cada modo de jogo e prove sua versatilidade em combate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <div
                key={index}
                className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/30 transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white">{mode.name}</h3>
                    <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full">
                      {mode.players}
                    </span>
                  </div>
                  <p className="text-gray-400">{mode.description}</p>
                </div>

                <button className="w-full py-2.5 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 text-gray-300 hover:text-orange-500 rounded-lg transition-all">
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
