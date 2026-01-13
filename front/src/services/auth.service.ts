import { User, UserStats } from "@/types/user";
import {
  AUTH_STORAGE_KEY,
  API_DELAY,
  DEFAULT_REGION,
  DEFAULT_AVATAR,
  MOCK_PASSWORD,
} from "@/lib/constants/auth.constants";

// Mock users for development/testing
export const mockUsers: User[] = [
  {
    id: "1",
    nickname: "WarLegend",
    email: "war@legend.com",
    region: "EU",
    avatar: "warden",
    profileVisibility: "public",
    stats: {
      rank: "Diamante II",
      dueloRank: "Diamante I",
      brigaRank: "Diamante III",
      dominioRank: "Platina I",
      invasaoRank: "Platina II",
      tributoRank: "Ouro III",
      mataMataRank: "Ouro I",
      matchesPlayed: 1247,
      wins: 789,
      losses: 458,
      winRate: 63.3,
      kills: 15420,
      deaths: 8934,
    },
  },
];

/**
 * Simulates API delay for more realistic async behavior
 */
async function simulateApiDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, API_DELAY));
}

/**
 * Authenticate user with mock credentials
 * @param nickname - User's nickname
 * @param password - User's password
 * @returns User object if successful, null otherwise
 */
export async function loginUser(nickname: string, password: string): Promise<User | null> {
  await simulateApiDelay();

  const foundUser = mockUsers.find((u) => u.nickname === nickname);

  if (foundUser && password === MOCK_PASSWORD) {
    return { ...foundUser }; // Return a copy to avoid mutations
  }

  return null;
}

/**
 * Register a new user
 * @param nickname - User's nickname
 * @param email - User's email
 * @param password - User's password
 * @returns User object if successful, null if nickname already exists
 */
export async function registerUser(
  nickname: string,
  email: string,
  password: string
): Promise<User | null> {
  await simulateApiDelay();

  // Check if nickname already exists
  if (mockUsers.some((u) => u.nickname === nickname)) {
    return null; // Duplicate nickname
  }

  // Create new user with default stats
  const defaultStats: UserStats = {
    rank: "Bronze III",
    dueloRank: "Bronze III",
    brigaRank: "Bronze III",
    dominioRank: "Bronze III",
    invasaoRank: "Bronze III",
    tributoRank: "Bronze III",
    mataMataRank: "Bronze III",
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    kills: 0,
    deaths: 0,
  };

  const newUser: User = {
    id: Date.now().toString(),
    nickname,
    email,
    region: DEFAULT_REGION,
    avatar: DEFAULT_AVATAR,
    profileVisibility: "public",
    stats: defaultStats,
  };

  mockUsers.push(newUser);
  return { ...newUser }; // Return a copy to avoid mutations
}

/**
 * Get user from localStorage
 * @returns Stored user or null
 */
export function getSavedUser(): User | null {
  try {
    if (typeof window === "undefined") return null;
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error retrieving saved user:", error);
    return null;
  }
}

/**
 * Save user to localStorage
 * @param user - User to save
 */
export function saveUser(user: User | null): void {
  try {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

/**
 * Validate user exists in mock data
 * @param userId - User ID to validate
 * @returns User if found, null otherwise
 */
export function validateUser(userId: string): User | null {
  return mockUsers.find((u) => u.id === userId) || null;
}

/**
 * Update user in mock data
 * @param userId - User ID to update
 * @param updates - Partial user updates
 * @returns Updated user or null if not found
 */
export function updateUserInMockData(userId: string, updates: Partial<User>): User | null {
  const userIndex = mockUsers.findIndex((u) => u.id === userId);
  if (userIndex === -1) return null;

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  return { ...mockUsers[userIndex] };
}
