/**
 * ProfileGameModeRanks Component
 * 
 * Grid com ranks de todos os modos de jogo.
 */

import { Swords, Award } from "lucide-react";
import { getRankColor } from "@/lib/utils/profileHelpers";

interface GameModeRank {
  mode: string;
  rank: string;
}

interface ProfileGameModeRanksProps {
  ranks: GameModeRank[];
}

export function ProfileGameModeRanks({ ranks }: ProfileGameModeRanksProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <Swords className="h-6 w-6 text-orange-500" />
        Ranks por Modo
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {ranks.map(({ mode, rank }) => {
          return (
            <div key={mode} className="rounded-lg bg-gray-800 p-4 text-center">
              <Award className={`mx-auto mb-2 h-8 w-8 ${getRankColor(rank)}`} />
              <p className="font-semibold text-white">{mode}</p>
              <p className={`text-sm ${getRankColor(rank)}`}>{rank}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
