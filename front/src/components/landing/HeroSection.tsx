import { Play, Trophy } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HeroSectionProps {
  onPlayNow: () => void;
}

export function HeroSection({ onPlayNow }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1613477757272-96c69d8a64de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGJhdHRsZSUyMGVwaWN8ZW58MXx8fHwxNzY3MzA1NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="For Honor Battle"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto flex h-full max-w-[1440px] items-center px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
            <span className="text-orange-500">• AO VIVO</span>
            <span className="ml-2 text-gray-400">12,847 jogadores online</span>
          </div>

          <h1 className="mb-6 leading-tight text-white">
            Ranked competitivo de{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              For Honor
            </span>
            , feito pela comunidade
          </h1>

          <p className="mb-8 max-w-2xl text-xl text-gray-300">
            Rankings individuais e por equipe, matchmaking inteligente e integração com criadores.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onPlayNow}
              className="group flex items-center gap-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-black transition-all hover:from-orange-600 hover:to-red-700"
            >
              <Play className="h-5 w-5" />
              Jogar ranqueada agora
            </button>

            <a
              href="#rankings"
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-white transition-all hover:bg-white/10"
            >
              <Trophy className="h-5 w-5" />
              Ver rankings
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl text-orange-500">12,847</div>
              <div className="text-gray-400">Jogadores ativos</div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div>
              <div className="text-3xl text-orange-500">3,421</div>
              <div className="text-gray-400">Partidas hoje</div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div>
              <div className="text-3xl text-orange-500">47</div>
              <div className="text-gray-400">Lives ativas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
