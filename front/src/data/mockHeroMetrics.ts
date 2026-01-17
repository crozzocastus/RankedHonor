/**
 * Mock Hero Metrics Data
 * 
 * Estatísticas detalhadas por herói para o perfil do usuário.
 * Este mockdata será substituído por dados reais do launcher no futuro.
 */

export interface HeroMetrics {
  heroId: string;
  heroName: string;
  faction: "Knights" | "Vikings" | "Samurai" | "Wu Lin";
  timePlayed: number; // hours
  matchesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  avgScore: number;
  lastPlayed: string; // ISO timestamp
  favoriteMode: string;
  bestStreak: number;
  rank?: string;
}

export const mockHeroMetrics: HeroMetrics[] = [
  {
    heroId: "warden",
    heroName: "Warden",
    faction: "Knights",
    timePlayed: 45.5,
    matchesPlayed: 234,
    wins: 134,
    losses: 100,
    winRate: 57.26,
    kills: 456,
    deaths: 378,
    assists: 289,
    kda: 1.97,
    avgScore: 1250,
    lastPlayed: "2026-01-15T18:30:00Z",
    favoriteMode: "Duelo 1v1",
    bestStreak: 7,
    rank: "Ouro I"
  },
  {
    heroId: "conqueror",
    heroName: "Conqueror",
    faction: "Knights",
    timePlayed: 32.8,
    matchesPlayed: 178,
    wins: 95,
    losses: 83,
    winRate: 53.37,
    kills: 312,
    deaths: 298,
    assists: 401,
    kda: 2.39,
    avgScore: 1180,
    lastPlayed: "2026-01-14T20:15:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 5,
    rank: "Ouro III"
  },
  {
    heroId: "peacekeeper",
    heroName: "Peacekeeper",
    faction: "Knights",
    timePlayed: 28.3,
    matchesPlayed: 156,
    wins: 89,
    losses: 67,
    winRate: 57.05,
    kills: 389,
    deaths: 267,
    assists: 178,
    kda: 2.12,
    avgScore: 1320,
    lastPlayed: "2026-01-13T16:45:00Z",
    favoriteMode: "Briga 2v2",
    bestStreak: 9,
    rank: "Ouro II"
  },
  {
    heroId: "lawbringer",
    heroName: "Lawbringer",
    faction: "Knights",
    timePlayed: 22.1,
    matchesPlayed: 134,
    wins: 71,
    losses: 63,
    winRate: 52.99,
    kills: 267,
    deaths: 245,
    assists: 312,
    kda: 2.36,
    avgScore: 1150,
    lastPlayed: "2026-01-12T14:30:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 6,
    rank: "Prata I"
  },
  {
    heroId: "raider",
    heroName: "Raider",
    faction: "Vikings",
    timePlayed: 38.7,
    matchesPlayed: 201,
    wins: 118,
    losses: 83,
    winRate: 58.71,
    kills: 423,
    deaths: 334,
    assists: 245,
    kda: 2.0,
    avgScore: 1290,
    lastPlayed: "2026-01-16T19:00:00Z",
    favoriteMode: "Invasão",
    bestStreak: 8,
    rank: "Ouro I"
  },
  {
    heroId: "warlord",
    heroName: "Warlord",
    faction: "Vikings",
    timePlayed: 26.4,
    matchesPlayed: 145,
    wins: 78,
    losses: 67,
    winRate: 53.79,
    kills: 289,
    deaths: 267,
    assists: 356,
    kda: 2.42,
    avgScore: 1200,
    lastPlayed: "2026-01-11T17:20:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 5,
    rank: "Ouro II"
  },
  {
    heroId: "berserker",
    heroName: "Berserker",
    faction: "Vikings",
    timePlayed: 34.2,
    matchesPlayed: 189,
    wins: 112,
    losses: 77,
    winRate: 59.26,
    kills: 445,
    deaths: 312,
    assists: 201,
    kda: 2.07,
    avgScore: 1340,
    lastPlayed: "2026-01-10T15:10:00Z",
    favoriteMode: "Duelo 1v1",
    bestStreak: 10,
    rank: "Ouro I"
  },
  {
    heroId: "valkyrie",
    heroName: "Valkyrie",
    faction: "Vikings",
    timePlayed: 19.6,
    matchesPlayed: 112,
    wins: 58,
    losses: 54,
    winRate: 51.79,
    kills: 223,
    deaths: 198,
    assists: 267,
    kda: 2.47,
    avgScore: 1130,
    lastPlayed: "2026-01-09T13:45:00Z",
    favoriteMode: "Briga 2v2",
    bestStreak: 4,
    rank: "Prata II"
  },
  {
    heroId: "kensei",
    heroName: "Kensei",
    faction: "Samurai",
    timePlayed: 41.3,
    matchesPlayed: 223,
    wins: 128,
    losses: 95,
    winRate: 57.4,
    kills: 478,
    deaths: 356,
    assists: 312,
    kda: 2.22,
    avgScore: 1280,
    lastPlayed: "2026-01-16T21:30:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 7,
    rank: "Ouro I"
  },
  {
    heroId: "shugoki",
    heroName: "Shugoki",
    faction: "Samurai",
    timePlayed: 25.8,
    matchesPlayed: 142,
    wins: 73,
    losses: 69,
    winRate: 51.41,
    kills: 267,
    deaths: 278,
    assists: 389,
    kda: 2.36,
    avgScore: 1170,
    lastPlayed: "2026-01-08T12:20:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 5,
    rank: "Ouro III"
  },
  {
    heroId: "orochi",
    heroName: "Orochi",
    faction: "Samurai",
    timePlayed: 36.9,
    matchesPlayed: 198,
    wins: 115,
    losses: 83,
    winRate: 58.08,
    kills: 512,
    deaths: 334,
    assists: 156,
    kda: 2.0,
    avgScore: 1350,
    lastPlayed: "2026-01-16T10:15:00Z",
    favoriteMode: "Duelo 1v1",
    bestStreak: 11,
    rank: "Ouro I"
  },
  {
    heroId: "nobushi",
    heroName: "Nobushi",
    faction: "Samurai",
    timePlayed: 21.4,
    matchesPlayed: 123,
    wins: 64,
    losses: 59,
    winRate: 52.03,
    kills: 289,
    deaths: 245,
    assists: 223,
    kda: 2.09,
    avgScore: 1190,
    lastPlayed: "2026-01-07T19:40:00Z",
    favoriteMode: "Briga 2v2",
    bestStreak: 6,
    rank: "Prata I"
  },
  {
    heroId: "tiandi",
    heroName: "Tiandi",
    faction: "Wu Lin",
    timePlayed: 29.5,
    matchesPlayed: 167,
    wins: 94,
    losses: 73,
    winRate: 56.29,
    kills: 378,
    deaths: 312,
    assists: 267,
    kda: 2.07,
    avgScore: 1240,
    lastPlayed: "2026-01-15T22:10:00Z",
    favoriteMode: "Invasão",
    bestStreak: 7,
    rank: "Ouro II"
  },
  {
    heroId: "shaolin",
    heroName: "Shaolin",
    faction: "Wu Lin",
    timePlayed: 24.7,
    matchesPlayed: 145,
    wins: 82,
    losses: 63,
    winRate: 56.55,
    kills: 401,
    deaths: 289,
    assists: 198,
    kda: 2.07,
    avgScore: 1310,
    lastPlayed: "2026-01-14T11:25:00Z",
    favoriteMode: "Duelo 1v1",
    bestStreak: 8,
    rank: "Ouro II"
  },
  {
    heroId: "jiang-jun",
    heroName: "Jiang Jun",
    faction: "Wu Lin",
    timePlayed: 18.3,
    matchesPlayed: 98,
    wins: 51,
    losses: 47,
    winRate: 52.04,
    kills: 201,
    deaths: 189,
    assists: 289,
    kda: 2.59,
    avgScore: 1140,
    lastPlayed: "2026-01-06T16:50:00Z",
    favoriteMode: "Domínio 4v4",
    bestStreak: 5,
    rank: "Prata II"
  }
];

/**
 * Helper function to get hero metrics by hero ID
 */
export function getHeroMetricsById(heroId: string): HeroMetrics | undefined {
  return mockHeroMetrics.find((hero) => hero.heroId === heroId);
}

/**
 * Helper function to get top N heroes by win rate
 */
export function getTopHeroesByWinRate(limit: number = 5): HeroMetrics[] {
  return [...mockHeroMetrics]
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, limit);
}

/**
 * Helper function to get top N heroes by matches played
 */
export function getTopHeroesByPlaytime(limit: number = 5): HeroMetrics[] {
  return [...mockHeroMetrics]
    .sort((a, b) => b.timePlayed - a.timePlayed)
    .slice(0, limit);
}

/**
 * Helper function to get heroes by faction
 */
export function getHeroesByFaction(faction: HeroMetrics["faction"]): HeroMetrics[] {
  return mockHeroMetrics.filter((hero) => hero.faction === faction);
}
