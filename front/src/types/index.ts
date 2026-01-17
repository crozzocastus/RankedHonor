export type { User, UserStats } from "./user";
export type { AuthContextType } from "./auth";

// Matchmaking Lobby Types
import type { UserStats } from "./user";

export type MapRole = "base" | "rotacao" | "mid" | null;

export type HeroClass = "Vanguardeiro" | "Assassino" | "Pesado" | "Híbrido";

export interface LobbyPlayer {
  userId: string;
  nickname: string;
  avatar: string;
  faction: string;
  rank: string;
  role: MapRole;
  ubisoftId?: string;
  inGameNick?: string;
  profileVisibility: "public" | "private";
  stats?: UserStats;
  teamId?: number; // 1 ou 2 para separar times
  selectedHero?: string | null; // ID do herói selecionado (escolha única, pode deslocar)
  preferredClasses?: HeroClass[]; // Classes preferidas (múltipla escolha)
}

export interface ChatMessage {
  id: string;
  userId: string;
  nickname: string;
  message: string;
  timestamp: number;
  isModerated?: boolean;
}

export interface MatchmakingLobby {
  lobbyId: string;
  gameMode: string;
  region: string;
  players: LobbyPlayer[];
  maxPlayers: number;
  chatMessages: ChatMessage[];
  createdAt: number;
  matchFoundAt?: number;
  preparationStartedAt?: number; // Timestamp quando todos os jogadores conectaram
  preparationTimeSeconds?: number; // Tempo de preparação em segundos (padrão 60)
}
