import { Swords, Trophy, BarChart3, Radio, Loader2 } from 'lucide-react';

interface QuickActionsProps {
  onQuickRankedClick?: () => void;
  isQuickRankedLoading?: boolean;
  quickRankedStatus?: string;
}

const actions = [
  {
    icon: Swords,
    title: 'Ranqueada rápida',
    description: 'Entre em uma partida competitiva agora',
    gradient: 'from-orange-500/10 to-red-600/10',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-500'
  },
  {
    icon: Trophy,
    title: 'Ranking global',
    description: 'Veja os melhores jogadores e equipes',
    gradient: 'from-yellow-500/10 to-orange-500/10',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-500'
  },
  {
    icon: BarChart3,
    title: 'Estatísticas',
    description: 'Acompanhe seu desempenho e evolução',
    gradient: 'from-blue-500/10 to-purple-600/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500'
  },
  {
    icon: Radio,
    title: 'Lives ativas',
    description: '47 criadores transmitindo ao vivo',
    gradient: 'from-red-500/10 to-pink-600/10',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-500'
  }
];

export function QuickActions({ onQuickRankedClick, isQuickRankedLoading, quickRankedStatus }: QuickActionsProps) {
  return (
    <section className="py-8 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isLoading = index === 0 && isQuickRankedLoading;
            
            return (
              <button
                key={index}
                onClick={index === 0 && !isLoading ? onQuickRankedClick : undefined}
                className={`group p-6 bg-gradient-to-br ${action.gradient} border ${action.borderColor} rounded-xl hover:scale-105 transition-all text-left ${index === 0 && !isLoading ? 'cursor-pointer' : 'cursor-default'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                    <h3 className="text-white mb-2">{quickRankedStatus}</h3>
                    <p className="text-gray-400 text-sm">Buscando partida...</p>
                  </div>
                ) : (
                  <>
                    <Icon className={`w-8 h-8 ${action.iconColor} mb-4`} />
                    <h3 className="text-white mb-2">{action.title}</h3>
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
