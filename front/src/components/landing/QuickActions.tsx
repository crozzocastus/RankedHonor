import { Swords, Trophy, BarChart3, Radio, Loader2 } from "lucide-react";

interface QuickActionsProps {
  onQuickRankedClick?: () => void;
  isQuickRankedLoading?: boolean;
  quickRankedStatus?: string;
}

const actions = [
  {
    icon: Swords,
    title: "Ranqueada rápida",
    description: "Entre em uma partida competitiva agora",
    gradient: "from-orange-500/10 to-red-600/10",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-500",
  },
  {
    icon: Trophy,
    title: "Ranking global",
    description: "Veja os melhores jogadores e equipes",
    gradient: "from-yellow-500/10 to-orange-500/10",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
  },
  {
    icon: BarChart3,
    title: "Estatísticas",
    description: "Acompanhe seu desempenho e evolução",
    gradient: "from-blue-500/10 to-purple-600/10",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
  },
  {
    icon: Radio,
    title: "Lives ativas",
    description: "47 criadores transmitindo ao vivo",
    gradient: "from-red-500/10 to-pink-600/10",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
  },
];

export function QuickActions({
  onQuickRankedClick,
  isQuickRankedLoading,
  quickRankedStatus,
}: QuickActionsProps) {
  return (
    <section className="bg-gradient-to-b from-black to-gray-950 py-8">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isLoading = index === 0 && isQuickRankedLoading;

            return (
              <button
                key={index}
                onClick={index === 0 && !isLoading ? onQuickRankedClick : undefined}
                className={`group bg-gradient-to-br p-6 ${action.gradient} border ${action.borderColor} rounded-xl text-left transition-all hover:scale-105 ${index === 0 && !isLoading ? "cursor-pointer" : "cursor-default"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center">
                    <Loader2 className="mb-4 h-8 w-8 animate-spin text-orange-500" />
                    <h3 className="mb-2 text-white">{quickRankedStatus}</h3>
                    <p className="text-sm text-gray-400">Buscando partida...</p>
                  </div>
                ) : (
                  <>
                    <Icon className={`h-8 w-8 ${action.iconColor} mb-4`} />
                    <h3 className="mb-2 text-white">{action.title}</h3>
                    <p className="text-gray-400">{action.description}</p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
