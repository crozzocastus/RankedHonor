'use client';

import { Radio, Users, Eye } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

const liveStreams = [
  {
    id: 1,
    streamer: 'KnightSlayer',
    title: 'RANQUEADA AO VIVO - Subindo para Diamante!',
    viewers: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHdhcnJpb3IlMjBrbmlnaHR8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rank: 'Platina I'
  },
  {
    id: 2,
    streamer: 'SamuraiMaster',
    title: 'Ensinando combos avançados de Orochi',
    viewers: 856,
    thumbnail: 'https://images.unsplash.com/photo-1719338204063-303d7dac53ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW11cmFpJTIwYXJtb3J8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rank: 'Diamante II'
  },
  {
    id: 3,
    streamer: 'VikingRaider',
    title: 'TORNEIO DA GUILDA - SEMI-FINAL',
    viewers: 2341,
    thumbnail: 'https://images.unsplash.com/photo-1599147208614-7e14b9fedf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWtpbmclMjB3YXJyaW9yfGVufDF8fHx8MTc2NzI2OTAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rank: 'Mestre'
  }
];

export function LiveFeed() {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Radio className="w-5 h-5 text-red-500" />
        <h2 className="text-amber-500">LIVES ATIVAS</h2>
      </div>

      <div className="space-y-4">
        {liveStreams.map(stream => (
          <div
            key={stream.id}
            className="flex gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
          >
            <div className="relative w-48 h-28 flex-shrink-0 rounded overflow-hidden">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.streamer}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1">
                <Radio className="w-3 h-3" />
                AO VIVO
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/90 text-white rounded flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {stream.viewers.toLocaleString('en-US')}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="text-slate-200">{stream.streamer}</div>
                  <div className="text-slate-500">{stream.rank}</div>
                </div>
              </div>
              <p className="text-slate-300 mb-2">{stream.title}</p>
              <div className="flex items-center gap-2 text-slate-500">
                <Eye className="w-4 h-4" />
                {stream.viewers.toLocaleString('en-US')} espectadores
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
