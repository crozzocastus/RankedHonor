import { Radio, Eye, TrendingUp, Play } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface MainFeedProps {
  region: string;
}

const liveStreams = [
  {
    id: 1,
    creator: "KnightSlayer",
    platform: "Twitch",
    mode: "Duelo 1v1",
    viewers: 1234,
    thumbnail: "https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?w=400",
    isLive: true,
  },
  {
    id: 2,
    creator: "SamuraiMaster",
    platform: "YouTube",
    mode: "Domínio 4v4",
    viewers: 856,
    thumbnail: "https://images.unsplash.com/photo-1719338204063-303d7dac53ea?w=400",
    isLive: true,
  },
];

const clips = [
  {
    id: 1,
    title: "Clutch 1v3 impossível com Warden",
    creator: "ProPlayer99",
    hero: "Warden",
    views: 15234,
    thumbnail: "https://images.unsplash.com/photo-1762184427759-81b8489e3d79?w=400",
  },
  {
    id: 2,
    title: "Orochi perfect parry combo",
    creator: "NinjaMaster",
    hero: "Orochi",
    views: 8921,
    thumbnail: "https://images.unsplash.com/photo-1599147208614-7e14b9fedf94?w=400",
  },
];

const highlights = [
  {
    id: 1,
    type: "rank_up",
    player: "DragonHeart",
    from: "Diamante II",
    to: "Diamante I",
    region: "EU",
  },
  {
    id: 2,
    type: "team_first",
    team: "Valhalla Warriors",
    mode: "Domínio 4v4",
    region: "NA",
  },
];

export function MainFeed({ region }: MainFeedProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-white">
          <Radio className="h-5 w-5 text-orange-500" />
          Feed Principal
        </h2>
        <div className="flex gap-2">
          <button className="rounded-lg bg-orange-500/20 px-4 py-2 text-orange-500">Tudo</button>
          <button className="rounded-lg bg-white/5 px-4 py-2 text-gray-400 transition-colors hover:bg-white/10">
            Lives
          </button>
          <button className="rounded-lg bg-white/5 px-4 py-2 text-gray-400 transition-colors hover:bg-white/10">
            Clipes
          </button>
          <button className="rounded-lg bg-white/5 px-4 py-2 text-gray-400 transition-colors hover:bg-white/10">
            Destaques
          </button>
        </div>
      </div>

      {/* Live Streams */}
      {liveStreams.map((stream) => (
        <div
          key={stream.id}
          className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30"
        >
          <div className="grid grid-cols-[280px_1fr] gap-4">
            <div className="relative">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.creator}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded bg-red-600 px-2 py-1 text-white">
                <Radio className="h-3 w-3" />
                AO VIVO
              </div>
              <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded bg-black/80 px-2 py-1 text-white">
                <Eye className="h-3 w-3" />
                {stream.viewers.toLocaleString("en-US")}
              </div>
            </div>

            <div className="flex flex-col justify-between p-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                    <span className="text-black">{stream.creator[0]}</span>
                  </div>
                  <div>
                    <div className="text-white">{stream.creator}</div>
                    <div className="text-gray-500">{stream.platform}</div>
                  </div>
                </div>
                <h3 className="mb-1 text-white">Ranqueada ao vivo - {stream.mode}</h3>
                <p className="text-gray-400">Acompanhe a gameplay e aprenda com os melhores</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-500">{stream.mode}</div>
                <button className="flex items-center gap-2 rounded-lg bg-orange-500/20 px-4 py-2 text-orange-500 transition-colors hover:bg-orange-500/30">
                  <Play className="h-4 w-4" />
                  Assistir
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Clips */}
      <div className="grid grid-cols-2 gap-4">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30"
          >
            <div className="relative aspect-video">
              <ImageWithFallback
                src={clip.thumbnail}
                alt={clip.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-white">{clip.title}</h3>
              <div className="flex items-center justify-between text-gray-400">
                <span>{clip.creator}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {clip.views.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent p-4"
          >
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="flex-1">
                {highlight.type === "rank_up" ? (
                  <>
                    <h3 className="mb-1 text-white">
                      <span className="text-orange-500">{highlight.player}</span> subiu de rank!
                    </h3>
                    <p className="text-gray-400">
                      {highlight.from} → {highlight.to} • {highlight.region}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="mb-1 text-white">
                      <span className="text-orange-500">{highlight.team}</span> está em 1º lugar!
                    </h3>
                    <p className="text-gray-400">
                      {highlight.mode} • {highlight.region}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
