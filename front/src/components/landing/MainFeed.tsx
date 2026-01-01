import { Radio, Eye, TrendingUp, Play } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MainFeedProps {
  region: string;
}

const liveStreams = [
  {
    id: 1,
    creator: 'KnightSlayer',
    platform: 'Twitch',
    mode: 'Duelo 1v1',
    viewers: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?w=400',
    isLive: true
  },
  {
    id: 2,
    creator: 'SamuraiMaster',
    platform: 'YouTube',
    mode: 'Domínio 4v4',
    viewers: 856,
    thumbnail: 'https://images.unsplash.com/photo-1719338204063-303d7dac53ea?w=400',
    isLive: true
  }
];

const clips = [
  {
    id: 1,
    title: 'Clutch 1v3 impossível com Warden',
    creator: 'ProPlayer99',
    hero: 'Warden',
    views: 15234,
    thumbnail: 'https://images.unsplash.com/photo-1762184427759-81b8489e3d79?w=400'
  },
  {
    id: 2,
    title: 'Orochi perfect parry combo',
    creator: 'NinjaMaster',
    hero: 'Orochi',
    views: 8921,
    thumbnail: 'https://images.unsplash.com/photo-1599147208614-7e14b9fedf94?w=400'
  }
];

const highlights = [
  {
    id: 1,
    type: 'rank_up',
    player: 'DragonHeart',
    from: 'Diamante II',
    to: 'Diamante I',
    region: 'EU'
  },
  {
    id: 2,
    type: 'team_first',
    team: 'Valhalla Warriors',
    mode: 'Domínio 4v4',
    region: 'NA'
  }
];

export function MainFeed({ region }: MainFeedProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-orange-500" />
          Feed Principal
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-lg">
            Tudo
          </button>
          <button className="px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
            Lives
          </button>
          <button className="px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
            Clipes
          </button>
          <button className="px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
            Destaques
          </button>
        </div>
      </div>

      {/* Live Streams */}
      {liveStreams.map(stream => (
        <div key={stream.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all group">
          <div className="grid grid-cols-[280px_1fr] gap-4">
            <div className="relative">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.creator}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1.5">
                <Radio className="w-3 h-3" />
                AO VIVO
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white rounded flex items-center gap-1.5">
                <Eye className="w-3 h-3" />
                {stream.viewers.toLocaleString('en-US')}
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-black">{stream.creator[0]}</span>
                  </div>
                  <div>
                    <div className="text-white">{stream.creator}</div>
                    <div className="text-gray-500">{stream.platform}</div>
                  </div>
                </div>
                <h3 className="text-white mb-1">Ranqueada ao vivo - {stream.mode}</h3>
                <p className="text-gray-400">Acompanhe a gameplay e aprenda com os melhores</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-500">{stream.mode}</div>
                <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 rounded-lg transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Assistir
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Clips */}
      <div className="grid grid-cols-2 gap-4">
        {clips.map(clip => (
          <div key={clip.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all group">
            <div className="relative aspect-video">
              <ImageWithFallback
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white mb-1">{clip.title}</h3>
              <div className="flex items-center justify-between text-gray-400">
                <span>{clip.creator}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {clip.views.toLocaleString('en-US')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        {highlights.map(highlight => (
          <div key={highlight.id} className="bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div className="flex-1">
                {highlight.type === 'rank_up' ? (
                  <>
                    <h3 className="text-white mb-1">
                      <span className="text-orange-500">{highlight.player}</span> subiu de rank!
                    </h3>
                    <p className="text-gray-400">
                      {highlight.from} → {highlight.to} • {highlight.region}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-white mb-1">
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
