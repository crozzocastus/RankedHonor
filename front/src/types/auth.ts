import { User } from "./user";
import { Faction } from "@/lib/constants/game.constants";

export interface AuthContextType {
  user: User | null;
  login: (nickname: string, password: string) => Promise<boolean>;
  register: (nickname: string, email: string, password: string, faction: Faction) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  changeFaction: (newFaction: Faction) => void;
  isLoading: boolean;
}
