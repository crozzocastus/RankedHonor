'use client';

import { Shield, Swords, Trophy, TrendingUp, Star } from 'lucide-react';

interface UserProfileProps {
  user: any;
}

export function UserProfile({ user }: UserProfileProps) {
  const winRate = Math.round((user.wins / (user.wins + user.losses)) * 100);

  const recentMatches = [
    { id: 1, result: 'Vitória', opponent: 'DarkKnight', hero: 'Warden', duration: '8:34' },
    { id: 2, result: 'Derrota', opponent: 'ShadowNinja', hero: 'Warden', duration: '12:15' },
    { id: 3, result: 'Vitória', opponent: 'IronFist', hero: 'Warden', duration: '6:45' },
    { id: 4, result: 'Vitória', opponent: 'ThunderStrike', hero: 'Warden', duration: '9:21' },
    { id: 5, result: 'Derrota', opponent: 'StormBreaker', hero: 'Warden', duration: '15:02' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-slate-900" />
            </div>

            <div className="flex-1">
              <h1 className="text-amber-500 mb-2">{user.name}</h1>
              <div className="text-slate-400 mb-4">{user.email}</div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-slate-400 mb-1">Rank</div>
                  <div className="text-amber-500">{user.rank}</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-slate-400 mb-1">Nível</div>
                  <div className="text-slate-200">{user.level}</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-slate-400 mb-1">Vitórias</div>
                  <div className="text-green-500">{user.wins}</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-slate-400 mb-1">Derrotas</div>
                  <div className="text-red-500">{user.losses}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-slate-300">Taxa de Vitória: {winRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-slate-300">Herói Principal: {user.mainHero}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Swords className="w-5 h-5 text-amber-500" />
              <h2 className="text-amber-500">PARTIDAS RECENTES</h2>
            </div>

            <div className="space-y-3">
              {recentMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded border border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-3 py-1 rounded ${
                        match.result === 'Vitória'
                          ? 'bg-green-900/30 text-green-500'
                          : 'bg-red-900/30 text-red-500'
                      }`}
                    >
                      {match.result}
                    </div>
                    <div>
                      <div className="text-slate-200">vs {match.opponent}</div>
                      <div className="text-slate-500">{match.hero}</div>
                    </div>
                  </div>
                  <div className="text-slate-400">{match.duration}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-amber-500">CONQUISTAS</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded border border-slate-700">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-200">Primeira Vitória</div>
                  <div className="text-slate-500">Ganhe sua primeira partida</div>
                </div>
                <div className="text-amber-500">✓</div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded border border-slate-700">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Swords className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-200">Veterano</div>
                  <div className="text-slate-500">Jogue 50 partidas ranqueadas</div>
                </div>
                <div className="text-amber-500">✓</div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded border border-slate-700/50 opacity-50">
                <div className="w-12 h-12 bg-slate-700/30 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-400">Campeão</div>
                  <div className="text-slate-600">Alcance rank Diamante</div>
                </div>
                <div className="text-slate-600">45/77</div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded border border-slate-700/50 opacity-50">
                <div className="w-12 h-12 bg-slate-700/30 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-400">Invencível</div>
                  <div className="text-slate-600">Vença 10 partidas seguidas</div>
                </div>
                <div className="text-slate-600">3/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
