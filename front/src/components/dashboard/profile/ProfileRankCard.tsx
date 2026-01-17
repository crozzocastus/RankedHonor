/**
 * ProfileRankCard Component
 * 
 * Card com rank geral do jogador.
 */

import { Trophy, Award } from "lucide-react";
import { getRankColor } from "@/lib/utils/profileHelpers";

interface ProfileRankCardProps {
  rank: string;
  season?: string;
}

export function ProfileRankCard({ rank, season = "Temporada 2024" }: ProfileRankCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Rank Geral
      </h3>
      <div className="flex items-center gap-4">
        <Award className={`h-12 w-12 ${getRankColor(rank)}`} />
        <div>
          <p className={`text-2xl font-bold ${getRankColor(rank)}`}>{rank}</p>
          <p className="text-gray-400">{season}</p>
        </div>
      </div>
    </div>
  );
}
