// Game-related constants for For Honor

// Faction types
export type Faction = "Knights" | "Vikings" | "Samurai" | "Wu Lin" | "Outlanders";

// Hero class types
export type HeroClass = "Vanguardeiro" | "Assassino" | "Pesado" | "Híbrido";

// Hero interface
export interface Hero {
  id: string; // lowercase english ID (e.g., "warden", "black-prior")
  name: string; // Portuguese name
  faction: Faction;
  heroClass: HeroClass;
  releaseOrder: number; // Order of release (1-37)
}

// Faction names in Portuguese
export const FACTION_NAMES: Record<Faction, string> = {
  Knights: "Cavaleiros",
  Vikings: "Vikings",
  Samurai: "Samurais",
  "Wu Lin": "Wu Lin",
  Outlanders: "Outlanders",
};

// All 37 heroes in release order
export const ALL_HEROES: Hero[] = [
  // Knights (9 heroes)
  { id: "warden", name: "Warden", faction: "Knights", heroClass: "Vanguardeiro", releaseOrder: 1 },
  { id: "peacekeeper", name: "Peacekeeper", faction: "Knights", heroClass: "Assassino", releaseOrder: 2 },
  { id: "conqueror", name: "Conqueror", faction: "Knights", heroClass: "Pesado", releaseOrder: 3 },
  { id: "lawbringer", name: "Lawbringer", faction: "Knights", heroClass: "Híbrido", releaseOrder: 7 },
  { id: "centurion", name: "Centurion", faction: "Knights", heroClass: "Híbrido", releaseOrder: 13 },
  { id: "gladiator", name: "Gladiator", faction: "Knights", heroClass: "Assassino", releaseOrder: 14 },
  { id: "black-prior", name: "Black Prior", faction: "Knights", heroClass: "Pesado", releaseOrder: 19 },
  { id: "warmonger", name: "Warmonger", faction: "Knights", heroClass: "Vanguardeiro", releaseOrder: 25 },
  { id: "gryphon", name: "Gryphon", faction: "Knights", heroClass: "Híbrido", releaseOrder: 27 },

  // Vikings (8 heroes)
  { id: "raider", name: "Raider", faction: "Vikings", heroClass: "Vanguardeiro", releaseOrder: 4 },
  { id: "warlord", name: "Warlord", faction: "Vikings", heroClass: "Pesado", releaseOrder: 5 },
  { id: "berserker", name: "Berserker", faction: "Vikings", heroClass: "Assassino", releaseOrder: 6 },
  { id: "valkyrie", name: "Valkyrie", faction: "Vikings", heroClass: "Híbrido", releaseOrder: 10 },
  { id: "highlander", name: "Highlander", faction: "Vikings", heroClass: "Híbrido", releaseOrder: 11 },
  { id: "shaman", name: "Shaman", faction: "Vikings", heroClass: "Assassino", releaseOrder: 15 },
  { id: "jormungandr", name: "Jormungandr", faction: "Vikings", heroClass: "Pesado", releaseOrder: 22 },
  { id: "varangian-guard", name: "Varangian Guard", faction: "Vikings", heroClass: "Pesado", releaseOrder: 36 },

  // Samurai (9 heroes)
  { id: "kensei", name: "Kensei", faction: "Samurai", heroClass: "Vanguardeiro", releaseOrder: 8 },
  { id: "shugoki", name: "Shugoki", faction: "Samurai", heroClass: "Pesado", releaseOrder: 9 },
  { id: "orochi", name: "Orochi", faction: "Samurai", heroClass: "Assassino", releaseOrder: 10 },
  { id: "nobushi", name: "Nobushi", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 11 },
  { id: "shinobi", name: "Shinobi", faction: "Samurai", heroClass: "Assassino", releaseOrder: 12 },
  { id: "aramusha", name: "Aramusha", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 16 },
  { id: "hitokiri", name: "Hitokiri", faction: "Samurai", heroClass: "Pesado", releaseOrder: 21 },
  { id: "kyoshin", name: "Kyoshin", faction: "Samurai", heroClass: "Híbrido", releaseOrder: 29 },
  { id: "sohei", name: "Sohei", faction: "Samurai", heroClass: "Pesado", releaseOrder: 35 },

  // Wu Lin (5 heroes)
  { id: "tiandi", name: "Tiandi", faction: "Wu Lin", heroClass: "Vanguardeiro", releaseOrder: 17 },
  { id: "nuxia", name: "Nuxia", faction: "Wu Lin", heroClass: "Assassino", releaseOrder: 18 },
  { id: "jiang-jun", name: "Jiang Jun", faction: "Wu Lin", heroClass: "Pesado", releaseOrder: 19 },
  { id: "shaolin", name: "Shaolin", faction: "Wu Lin", heroClass: "Híbrido", releaseOrder: 20 },
  { id: "zhanhu", name: "Zhanhu", faction: "Wu Lin", heroClass: "Híbrido", releaseOrder: 23 },

  // Outlanders (6 heroes)
  { id: "pirate", name: "Pirate", faction: "Outlanders", heroClass: "Híbrido", releaseOrder: 30 },
  { id: "medjay", name: "Medjay", faction: "Outlanders", heroClass: "Híbrido", releaseOrder: 31 },
  { id: "afeera", name: "Afeera", faction: "Outlanders", heroClass: "Híbrido", releaseOrder: 32 },
  { id: "ocelotl", name: "Ocelotl", faction: "Outlanders", heroClass: "Híbrido", releaseOrder: 33 },
  { id: "khatun", name: "Khatun", faction: "Outlanders", heroClass: "Assassino", releaseOrder: 34 },
  { id: "virtuosa", name: "Virtuosa", faction: "Outlanders", heroClass: "Híbrido", releaseOrder: 37 },
];

// Default vanguard hero for each faction
export const DEFAULT_HEROES_BY_FACTION: Record<Faction, string> = {
  Knights: "warden",
  Vikings: "raider",
  Samurai: "kensei",
  "Wu Lin": "tiandi",
  Outlanders: "pirate", // First hero since Outlanders don't have a Vanguard
};

// Cache keys for localStorage
const FACTION_CACHE_KEY = "forHonorFactionCache";
const AVATAR_CACHE_KEY = "forHonorAvatarCache";

/**
 * Get all heroes for a specific faction, sorted by release order
 * @param faction - The faction to filter by
 * @returns Array of heroes belonging to the faction
 */
export function getHeroesByFaction(faction: Faction): Hero[] {
  return ALL_HEROES.filter((hero) => hero.faction === faction).sort(
    (a, b) => a.releaseOrder - b.releaseOrder
  );
}

/**
 * Get a hero by ID
 * @param heroId - The hero ID to search for
 * @returns The hero object or undefined if not found
 */
export function getHeroById(heroId: string): Hero | undefined {
  return ALL_HEROES.find((hero) => hero.id === heroId);
}

/**
 * Get the faction of a hero by hero ID
 * @param heroId - The hero ID
 * @returns The faction of the hero or undefined
 */
export function getHeroFaction(heroId: string): Faction | undefined {
  return getHeroById(heroId)?.faction;
}

/**
 * Save faction to localStorage cache
 * @param userId - User ID for scoped cache
 * @param faction - Faction to save
 */
export function saveFactionToCache(userId: string, faction: Faction): void {
  try {
    if (typeof window === "undefined") return;
    const cache = JSON.parse(localStorage.getItem(FACTION_CACHE_KEY) || "{}");
    cache[userId] = faction;
    localStorage.setItem(FACTION_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Error saving faction to cache:", error);
  }
}

/**
 * Get cached faction from localStorage
 * @param userId - User ID for scoped cache
 * @returns Cached faction or undefined
 */
export function getCachedFaction(userId: string): Faction | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const cache = JSON.parse(localStorage.getItem(FACTION_CACHE_KEY) || "{}");
    return cache[userId];
  } catch (error) {
    console.error("Error getting cached faction:", error);
    return undefined;
  }
}

/**
 * Save avatar to localStorage cache
 * @param userId - User ID for scoped cache
 * @param avatar - Avatar hero ID to save
 */
export function saveAvatarToCache(userId: string, avatar: string): void {
  try {
    if (typeof window === "undefined") return;
    const cache = JSON.parse(localStorage.getItem(AVATAR_CACHE_KEY) || "{}");
    cache[userId] = avatar;
    localStorage.setItem(AVATAR_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Error saving avatar to cache:", error);
  }
}

/**
 * Get cached avatar from localStorage
 * @param userId - User ID for scoped cache
 * @returns Cached avatar hero ID or undefined
 */
export function getCachedAvatar(userId: string): string | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const cache = JSON.parse(localStorage.getItem(AVATAR_CACHE_KEY) || "{}");
    return cache[userId];
  } catch (error) {
    console.error("Error getting cached avatar:", error);
    return undefined;
  }
}
