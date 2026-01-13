import { Download, CheckCircle, Shield, BarChart3, Award } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Captura automática de resultados",
    description: "Registra cada partida sem você precisar fazer nada",
  },
  {
    icon: BarChart3,
    title: "Coleta estatísticas detalhadas",
    description: "Analise seu desempenho com dados completos",
  },
  {
    icon: Shield,
    title: "Sistema anti-fraude",
    description: "Validação em tempo real para garantir fair play",
  },
  {
    icon: Award,
    title: "Atualização instantânea",
    description: "Seu rank é atualizado automaticamente após cada partida",
  },
];

export function LauncherSection() {
  return (
    <section id="launcher" className="bg-gradient-to-b from-gray-950 to-black py-16">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
              <span className="text-green-500">
                Apenas 1 jogador por partida precisa ter instalado
              </span>
            </div>

            <h2 className="mb-6 text-white">
              O launcher que{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                valida cada partida
              </span>
            </h2>

            <p className="mb-8 text-lg text-gray-400">
              Nosso launcher oficial garante que todas as partidas sejam registradas de forma justa
              e automática, sem manipulação de resultados.
            </p>

            <div className="mb-8 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-white">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-black transition-all hover:from-orange-600 hover:to-red-700">
                <Download className="h-5 w-5" />
                Baixar Launcher
              </button>

              <div className="text-gray-400">
                <div className="mb-1 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Windows
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Linux
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-600/20 p-8">
              <div className="mb-4 rounded-xl bg-gray-900 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400">$ ranked-honor-launcher</div>
                  <div className="text-gray-400">Initializing...</div>
                  <div className="text-gray-400">Connecting to servers...</div>
                  <div className="text-green-400">✓ Connected</div>
                  <div className="text-gray-400">Monitoring For Honor process...</div>
                  <div className="text-green-400">✓ Game detected</div>
                  <div className="text-gray-400">Waiting for match...</div>
                  <div className="animate-pulse text-orange-400">⟳ Match in progress...</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="mb-1 text-2xl text-orange-500">47</div>
                  <div className="text-sm text-gray-400">Partidas hoje</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="mb-1 text-2xl text-green-500">32</div>
                  <div className="text-sm text-gray-400">Vitórias</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="mb-1 text-2xl text-blue-500">98%</div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
