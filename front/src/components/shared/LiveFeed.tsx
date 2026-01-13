"use client";

import { Radio, Users, Eye } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const liveStreams = [
  {
    id: 1,
    streamer: "KnightSlayer",
    title: "RANQUEADA AO VIVO - Subindo para Diamante!",
    viewers: 1234,
    thumbnail:
      "https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHdhcnJpb3IlMjBrbmlnaHR8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rank: "Platina I",
  },
  {
    id: 2,
    streamer: "SamuraiMaster",
    title: "Ensinando combos avançados de Orochi",
    viewers: 856,
    thumbnail:
      "https://images.unsplash.com/photo-1719338204063-303d7dac53ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW11cmFpJTIwYXJtb3J8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rank: "Diamante II",
  },
  {
    id: 3,
    streamer: "VikingRaider",
    title: "TORNEIO DA GUILDA - SEMI-FINAL",
    viewers: 2341,
    thumbnail:
      "https://images.unsplash.com/photo-1599147208614-7e14b9fedf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWtpbmclMjB3YXJyaW9yfGVufDF8fHx8MTc2NzI2OTAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    rank: "Mestre",
  },
];

export function LiveFeed() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-2">
        <Radio className="h-5 w-5 text-red-500" />
        <h2 className="text-orange-500">LIVES ATIVAS</h2>
      </div>

      <div className="space-y-4">
        {liveStreams.map((stream) => (
          <div
            key={stream.id}
            className="flex cursor-pointer gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800"
          >
            <div className="relative h-28 w-48 flex-shrink-0 overflow-hidden rounded">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.streamer}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-white">
                <Radio className="h-3 w-3" />
                AO VIVO
              </div>
              <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-slate-900/90 px-2 py-1 text-white">
                <Eye className="h-3 w-3" />
                {stream.viewers.toLocaleString("en-US")}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                  <Users className="h-4 w-4 text-slate-900" />
                </div>
                <div>
                  <div className="text-slate-200">{stream.streamer}</div>
                  <div className="text-slate-500">{stream.rank}</div>
                </div>
              </div>
              <p className="mb-2 text-slate-300">{stream.title}</p>
              <div className="flex items-center gap-2 text-slate-500">
                <Eye className="h-4 w-4" />
                {stream.viewers.toLocaleString("en-US")} espectadores
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
