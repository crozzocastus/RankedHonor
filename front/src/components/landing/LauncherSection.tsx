import { Download, CheckCircle, Shield, BarChart3, Award } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Captura automática de resultados',
    description: 'Registra cada partida sem você precisar fazer nada'
  },
  {
    icon: BarChart3,
    title: 'Coleta estatísticas detalhadas',
    description: 'Analise seu desempenho com dados completos'
  },
  {
    icon: Shield,
    title: 'Sistema anti-fraude',
    description: 'Validação em tempo real para garantir fair play'
  },
  {
    icon: Award,
    title: 'Atualização instantânea',
    description: 'Seu rank é atualizado automaticamente após cada partida'
  }
];

export function LauncherSection() {
  return (
    <section id="launcher" className="py-16 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
              <span className="text-green-500">Apenas 1 jogador por partida precisa ter instalado</span>
            </div>

            <h2 className="text-white mb-6">
              O launcher que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">valida cada partida</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              Nosso launcher oficial garante que todas as partidas sejam registradas de forma justa e automática, sem manipulação de resultados.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-black rounded-lg transition-all flex items-center gap-3">
                <Download className="w-5 h-5" />
                Baixar Launcher
              </button>

              <div className="text-gray-400">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Windows
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Linux
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8">
              <div className="bg-gray-900 rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400">$ ranked-honor-launcher</div>
                  <div className="text-gray-400">Initializing...</div>
                  <div className="text-gray-400">Connecting to servers...</div>
                  <div className="text-green-400">✓ Connected</div>
                  <div className="text-gray-400">Monitoring For Honor process...</div>
                  <div className="text-green-400">✓ Game detected</div>
                  <div className="text-gray-400">Waiting for match...</div>
                  <div className="text-orange-400 animate-pulse">⟳ Match in progress...</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-orange-500 text-2xl mb-1">47</div>
                  <div className="text-gray-400 text-sm">Partidas hoje</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-green-500 text-2xl mb-1">32</div>
                  <div className="text-gray-400 text-sm">Vitórias</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-blue-500 text-2xl mb-1">98%</div>
                  <div className="text-gray-400 text-sm">Precisão</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
