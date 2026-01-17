/**
 * Mock Ranking Details Data
 * 
 * Detalhes de ranking e progressão por modo de jogo.
 * Este mockdata será substituído por dados reais do launcher no futuro.
 */

export interface RankingProgression {
  mode: string;
  currentRank: string;
  currentTier: number; // e.g., III = 3, II = 2, I = 1
  currentDivision: string; // e.g., "Bronze", "Prata", "Ouro"
  mmr: number;
  progressToNextRank: number; // 0-100%
  gamesInRank: number;
  winsInRank: number;
  lossesInRank: number;
  peakRank: string;
  peakRankTimestamp: string;
  seasonStartRank: string;
  lastRankChange: {
    from: string;
    to: string;
    timestamp: string;
  } | null;
}

export interface LeaderboardPosition {
  mode: string;
  globalRank: number;
  regionalRank: number;
  percentile: number; // top 5%, etc
  nearbyPlayers: {
    rank: number;
    nickname: string;
    mmr: number;
  }[];
}

export const mockRankingDetails: RankingProgression[] = [
  {
    mode: "Duelo 1v1",
    currentRank: "Ouro I",
    currentTier: 1,
    currentDivision: "Ouro",
    mmr: 1850,
    progressToNextRank: 67,
    gamesInRank: 23,
    winsInRank: 15,
    lossesInRank: 8,
    peakRank: "Platina III",
    peakRankTimestamp: "2025-12-20T10:00:00Z",
    seasonStartRank: "Prata II",
    lastRankChange: {
      from: "Ouro II",
      to: "Ouro I",
      timestamp: "2026-01-14T16:45:00Z"
    }
  },
  {
    mode: "Briga 2v2",
    currentRank: "Ouro II",
    currentTier: 2,
    currentDivision: "Ouro",
    mmr: 1720,
    progressToNextRank: 45,
    gamesInRank: 18,
    winsInRank: 11,
    lossesInRank: 7,
    peakRank: "Ouro I",
    peakRankTimestamp: "2026-01-05T14:30:00Z",
    seasonStartRank: "Prata III",
    lastRankChange: {
      from: "Ouro III",
      to: "Ouro II",
      timestamp: "2026-01-10T12:20:00Z"
    }
  },
  {
    mode: "Domínio 4v4",
    currentRank: "Ouro I",
    currentTier: 1,
    currentDivision: "Ouro",
    mmr: 1880,
    progressToNextRank: 72,
    gamesInRank: 31,
    winsInRank: 20,
    lossesInRank: 11,
    peakRank: "Platina III",
    peakRankTimestamp: "2025-12-28T18:15:00Z",
    seasonStartRank: "Prata I",
    lastRankChange: {
      from: "Ouro II",
      to: "Ouro I",
      timestamp: "2026-01-15T20:45:00Z"
    }
  },
  {
    mode: "Invasão",
    currentRank: "Ouro I",
    currentTier: 1,
    currentDivision: "Ouro",
    mmr: 1835,
    progressToNextRank: 58,
    gamesInRank: 21,
    winsInRank: 13,
    lossesInRank: 8,
    peakRank: "Ouro I",
    peakRankTimestamp: "2026-01-16T19:00:00Z",
    seasonStartRank: "Prata II",
    lastRankChange: {
      from: "Ouro II",
      to: "Ouro I",
      timestamp: "2026-01-12T21:10:00Z"
    }
  },
  {
    mode: "Tributo",
    currentRank: "Prata I",
    currentTier: 1,
    currentDivision: "Prata",
    mmr: 1520,
    progressToNextRank: 38,
    gamesInRank: 15,
    winsInRank: 8,
    lossesInRank: 7,
    peakRank: "Ouro III",
    peakRankTimestamp: "2025-11-15T16:30:00Z",
    seasonStartRank: "Bronze I",
    lastRankChange: {
      from: "Prata II",
      to: "Prata I",
      timestamp: "2026-01-08T19:20:00Z"
    }
  },
  {
    mode: "Mata-Mata",
    currentRank: "Ouro III",
    currentTier: 3,
    currentDivision: "Ouro",
    mmr: 1650,
    progressToNextRank: 24,
    gamesInRank: 12,
    winsInRank: 7,
    lossesInRank: 5,
    peakRank: "Ouro II",
    peakRankTimestamp: "2025-12-10T14:50:00Z",
    seasonStartRank: "Prata III",
    lastRankChange: {
      from: "Prata I",
      to: "Ouro III",
      timestamp: "2026-01-03T17:35:00Z"
    }
  },
  {
    mode: "Geral",
    currentRank: "Ouro I",
    currentTier: 1,
    currentDivision: "Ouro",
    mmr: 1790,
    progressToNextRank: 55,
    gamesInRank: 120,
    winsInRank: 69,
    lossesInRank: 51,
    peakRank: "Platina III",
    peakRankTimestamp: "2025-12-20T10:00:00Z",
    seasonStartRank: "Prata II",
    lastRankChange: {
      from: "Ouro II",
      to: "Ouro I",
      timestamp: "2026-01-15T18:30:00Z"
    }
  }
];

export const mockLeaderboardPositions: LeaderboardPosition[] = [
  {
    mode: "Duelo 1v1",
    globalRank: 4523,
    regionalRank: 1247,
    percentile: 8.5,
    nearbyPlayers: [
      { rank: 4520, nickname: "SwordMaster_89", mmr: 1853 },
      { rank: 4521, nickname: "VikingRage", mmr: 1852 },
      { rank: 4522, nickname: "KnightOfHonor", mmr: 1851 },
      { rank: 4524, nickname: "SamuraiLegend", mmr: 1849 },
      { rank: 4525, nickname: "WuLinWarrior", mmr: 1848 }
    ]
  },
  {
    mode: "Briga 2v2",
    globalRank: 6234,
    regionalRank: 1789,
    percentile: 12.3,
    nearbyPlayers: [
      { rank: 6231, nickname: "DuoKings", mmr: 1723 },
      { rank: 6232, nickname: "TeamSlayers", mmr: 1722 },
      { rank: 6233, nickname: "BrawlBros", mmr: 1721 },
      { rank: 6235, nickname: "FightClub", mmr: 1719 },
      { rank: 6236, nickname: "WarParty", mmr: 1718 }
    ]
  },
  {
    mode: "Domínio 4v4",
    globalRank: 3892,
    regionalRank: 1023,
    percentile: 6.8,
    nearbyPlayers: [
      { rank: 3889, nickname: "DominionLord", mmr: 1883 },
      { rank: 3890, nickname: "ZoneCapture", mmr: 1882 },
      { rank: 3891, nickname: "PointDefender", mmr: 1881 },
      { rank: 3893, nickname: "TacticalPlay", mmr: 1879 },
      { rank: 3894, nickname: "StrategyKing", mmr: 1878 }
    ]
  },
  {
    mode: "Invasão",
    globalRank: 5103,
    regionalRank: 1456,
    percentile: 10.2,
    nearbyPlayers: [
      { rank: 5100, nickname: "InvaderX", mmr: 1838 },
      { rank: 5101, nickname: "BreachMaster", mmr: 1837 },
      { rank: 5102, nickname: "RamPusher", mmr: 1836 },
      { rank: 5104, nickname: "GateBreaker", mmr: 1834 },
      { rank: 5105, nickname: "SiegeExpert", mmr: 1833 }
    ]
  },
  {
    mode: "Tributo",
    globalRank: 8921,
    regionalRank: 2567,
    percentile: 18.5,
    nearbyPlayers: [
      { rank: 8918, nickname: "TributeRunner", mmr: 1523 },
      { rank: 8919, nickname: "OfferingCollector", mmr: 1522 },
      { rank: 8920, nickname: "ShrineGuard", mmr: 1521 },
      { rank: 8922, nickname: "RitualMaster", mmr: 1519 },
      { rank: 8923, nickname: "BlessingSeeker", mmr: 1518 }
    ]
  },
  {
    mode: "Mata-Mata",
    globalRank: 7234,
    regionalRank: 2012,
    percentile: 15.7,
    nearbyPlayers: [
      { rank: 7231, nickname: "EliminationPro", mmr: 1653 },
      { rank: 7232, nickname: "LastManStanding", mmr: 1652 },
      { rank: 7233, nickname: "TeamWipeKing", mmr: 1651 },
      { rank: 7235, nickname: "ClutchPlayer", mmr: 1649 },
      { rank: 7236, nickname: "RoundWinner", mmr: 1648 }
    ]
  },
  {
    mode: "Geral",
    globalRank: 4156,
    regionalRank: 1134,
    percentile: 7.9,
    nearbyPlayers: [
      { rank: 4153, nickname: "OverallChamp", mmr: 1793 },
      { rank: 4154, nickname: "AllRounder", mmr: 1792 },
      { rank: 4155, nickname: "VersatileWarrior", mmr: 1791 },
      { rank: 4157, nickname: "BalancedFighter", mmr: 1789 },
      { rank: 4158, nickname: "MixedModeKing", mmr: 1788 }
    ]
  }
];

/**
 * Helper function to get ranking details by mode
 */
export function getRankingByMode(mode: string): RankingProgression | undefined {
  return mockRankingDetails.find((ranking) => ranking.mode === mode);
}

/**
 * Helper function to get leaderboard position by mode
 */
export function getLeaderboardByMode(mode: string): LeaderboardPosition | undefined {
  return mockLeaderboardPositions.find((leaderboard) => leaderboard.mode === mode);
}

/**
 * Helper function to get all rankings sorted by MMR
 */
export function getRankingsSortedByMMR(): RankingProgression[] {
  return [...mockRankingDetails].sort((a, b) => b.mmr - a.mmr);
}

/**
 * Helper function to get rankings above certain MMR threshold
 */
export function getRankingsAboveMMR(threshold: number): RankingProgression[] {
  return mockRankingDetails.filter((ranking) => ranking.mmr >= threshold);
}

/**
 * Helper function to calculate total games across all modes
 */
export function getTotalGamesAcrossModes(): number {
  return mockRankingDetails.reduce((total, ranking) => total + ranking.gamesInRank, 0);
}

/**
 * Helper function to calculate overall win rate across all modes
 */
export function getOverallWinRate(): number {
  const totalWins = mockRankingDetails.reduce((total, ranking) => total + ranking.winsInRank, 0);
  const totalGames = getTotalGamesAcrossModes();
  return totalGames > 0 ? (totalWins / totalGames) * 100 : 0;
}
