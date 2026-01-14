import { Faction } from "@/lib/constants/game.constants";

export interface UserStats {
  rank: string;
  dueloRank: string;
  brigaRank: string;
  dominioRank: string;
  invasaoRank: string;
  tributoRank: string;
  mataMataRank: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  kills: number;
  deaths: number;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  region: string;
  faction: Faction;
  avatar: string;
  profileVisibility: "public" | "private";
  stats?: UserStats;
}
