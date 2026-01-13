import { Radio, Youtube, Play, UserPlus } from "lucide-react";

interface ContentCreatorsProps {
  onBecomeCreator: () => void;
}

const creators = [
  {
    id: 1,
    nickname: "KnightSlayer",
    platform: "Twitch",
    isLive: true,
    viewers: 1234,
    avatar: "K",
  },
  {
    id: 2,
    nickname: "SamuraiMaster",
    platform: "YouTube",
    isLive: true,
    viewers: 856,
    avatar: "S",
  },
  {
    id: 3,
    nickname: "VikingRaider",
    platform: "Twitch",
    isLive: false,
    viewers: 0,
    avatar: "V",
  },
  {
    id: 4,
    nickname: "ProPlayer99",
    platform: "YouTube",
    isLive: true,
    viewers: 2341,
    avatar: "P",
  },
  {
    id: 5,
    nickname: "NinjaMaster",
    platform: "Twitch",
    isLive: false,
    viewers: 0,
    avatar: "N",
  },
];

export function ContentCreators({ onBecomeCreator }: ContentCreatorsProps) {
  return (
    <section id="criadores" className="bg-black py-16">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-4 text-white">Criadores de Conteúdo</h2>
            <p className="max-w-2xl text-gray-400">
              Acompanhe os melhores players e aprenda com suas estratégias
            </p>
          </div>

          <button
            onClick={onBecomeCreator}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 text-white transition-all hover:from-purple-600 hover:to-pink-700"
          >
            <UserPlus className="h-5 w-5" />
            Sou criador, quero participar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center transition-all hover:border-orange-500/30"
            >
              <div className="relative mb-4 inline-block">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                  <span className="text-2xl text-white">{creator.avatar}</span>
                </div>
                {creator.isLive && (
                  <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-900 bg-red-600">
                    <Radio className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              <h3 className="mb-1 text-white">{creator.nickname}</h3>

              <div className="mb-4 flex items-center justify-center gap-2">
                {creator.platform === "Twitch" ? (
                  <div className="flex items-center gap-1 text-purple-400">
                    <Play className="h-3 w-3" />
                    <span className="text-sm">Twitch</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-400">
                    <Youtube className="h-3 w-3" />
                    <span className="text-sm">YouTube</span>
                  </div>
                )}
              </div>

              {creator.isLive ? (
                <div className="rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-red-500">
                  <div className="mb-1 flex items-center justify-center gap-1.5">
                    <Radio className="h-3 w-3" />
                    <span className="text-sm">AO VIVO</span>
                  </div>
                  <div className="text-xs">
                    {creator.viewers.toLocaleString("en-US")} assistindo
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-500">
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
