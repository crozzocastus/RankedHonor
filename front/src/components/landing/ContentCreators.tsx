import { Radio, Youtube, Play, UserPlus } from 'lucide-react';

interface ContentCreatorsProps {
  onBecomeCreator: () => void;
}

const creators = [
  {
    id: 1,
    nickname: 'KnightSlayer',
    platform: 'Twitch',
    isLive: true,
    viewers: 1234,
    avatar: 'K'
  },
  {
    id: 2,
    nickname: 'SamuraiMaster',
    platform: 'YouTube',
    isLive: true,
    viewers: 856,
    avatar: 'S'
  },
  {
    id: 3,
    nickname: 'VikingRaider',
    platform: 'Twitch',
    isLive: false,
    viewers: 0,
    avatar: 'V'
  },
  {
    id: 4,
    nickname: 'ProPlayer99',
    platform: 'YouTube',
    isLive: true,
    viewers: 2341,
    avatar: 'P'
  },
  {
    id: 5,
    nickname: 'NinjaMaster',
    platform: 'Twitch',
    isLive: false,
    viewers: 0,
    avatar: 'N'
  }
];

export function ContentCreators({ onBecomeCreator }: ContentCreatorsProps) {
  return (
    <section id="criadores" className="py-16 bg-black">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-white mb-4">Criadores de Conteúdo</h2>
            <p className="text-gray-400 max-w-2xl">
              Acompanhe os melhores players e aprenda com suas estratégias
            </p>
          </div>

          <button
            onClick={onBecomeCreator}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Sou criador, quero participar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/30 transition-all text-center"
            >
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">{creator.avatar}</span>
                </div>
                {creator.isLive && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 border-2 border-gray-900 rounded-full flex items-center justify-center">
                    <Radio className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-white mb-1">{creator.nickname}</h3>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                {creator.platform === 'Twitch' ? (
                  <div className="flex items-center gap-1 text-purple-400">
                    <Play className="w-3 h-3" />
                    <span className="text-sm">Twitch</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-400">
                    <Youtube className="w-3 h-3" />
                    <span className="text-sm">YouTube</span>
                  </div>
                )}
              </div>

              {creator.isLive ? (
                <div className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Radio className="w-3 h-3" />
                    <span className="text-sm">AO VIVO</span>
                  </div>
                  <div className="text-xs">{creator.viewers.toLocaleString('en-US')} assistindo</div>
                </div>
              ) : (
                <div className="px-3 py-2 bg-gray-800 text-gray-500 rounded-lg text-sm">
                  Offline
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
