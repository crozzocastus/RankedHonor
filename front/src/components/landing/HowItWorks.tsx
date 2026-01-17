import { Trophy, Sword, Users, BarChart3, Download, Play } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: "1. Crie sua Conta",
      description:
        "Registre-se na plataforma escolhendo sua facção favorita e personalize seu perfil de guerreiro. Funciona em todas as plataformas.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Download,
      title: "2. Baixe o Launcher (PC)",
      description:
        "Jogadores de PC podem instalar nosso launcher para hospedar partidas ranqueadas. Console players buscam partidas sem precisar do launcher.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Sword,
      title: "3. Entre na Ranqueada",
      description:
        "Procure por partidas ranqueadas na plataforma. Jogadores de console são matchados com hosts de PC automaticamente.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "4. Suba no Ranking",
      description:
        "Acompanhe seu progresso, compare-se com outros jogadores e conquiste seu lugar entre os melhores guerreiros.",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const features = [
    {
      icon: Trophy,
      title: "Sistema de Ranqueamento",
      description: "MMR transparente e ranking global competitivo",
    },
    {
      icon: BarChart3,
      title: "Estatísticas Detalhadas",
      description: "Análise completa de performance por herói e modo",
    },
    {
      icon: Play,
      title: "Matchmaking Justo",
      description: "Partidas equilibradas baseadas em habilidade",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com jogadores e criadores de conteúdo",
    },
  ];

  return (
    <section id="como-funciona" className="relative bg-black py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/5 to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container relative mx-auto max-w-[1440px] px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-orange-500 md:text-5xl">
            Como Funciona?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Ranked Honor é a plataforma competitiva oficial para For Honor.
            Disponível para PC, PlayStation e Xbox. Junte-se a milhares de guerreiros e prove seu valor em combate.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-black p-6 transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10"
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} shadow-lg`}
              >
                <step.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>

              {/* Hover effect */}
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${step.color} opacity-0 transition-opacity group-hover:opacity-5`}
              />
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="mb-8 text-center text-2xl font-bold text-white">
            O Que Você Ganha
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-6 text-center transition-all hover:border-orange-500/30 hover:bg-gray-900/50"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h4 className="mb-2 font-semibold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#launcher"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/40"
          >
            <Download className="h-5 w-5" />
            Comece Agora - É Grátis
          </a>
          <p className="mt-4 text-sm text-gray-500">
            PC, PlayStation e Xbox • Launcher opcional para hosts
          </p>
        </div>
      </div>
    </section>
  );
}
