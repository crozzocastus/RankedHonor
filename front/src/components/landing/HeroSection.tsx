import { Play, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 max-w-[1440px] flex items-center">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
            <span className="text-orange-500">• AO VIVO</span>
            <span className="text-gray-400 ml-2">12,847 jogadores online</span>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            Ranked competitivo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">For Honor</span>, feito pela comunidade
          </h1>

          <p className="text-gray-300 text-xl mb-8 max-w-2xl">
            Rankings individuais e por equipe, matchmaking inteligente e integração com criadores.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onPlayNow}
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-black rounded-lg transition-all flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              Jogar ranqueada agora
            </button>

            <a
              href="#rankings"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-3"
            >
              <Trophy className="w-5 h-5" />
              Ver rankings
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-12">
            <div>
              <div className="text-3xl text-orange-500">12,847</div>
              <div className="text-gray-400">Jogadores ativos</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div>
              <div className="text-3xl text-orange-500">3,421</div>
              <div className="text-gray-400">Partidas hoje</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
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
