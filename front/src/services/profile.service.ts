import { User, UserStats } from "@/types/user";

/**
 * Interface para dados públicos de perfil
 * (visível para todos independente de privacidade)
 */
export interface PublicProfile {
  id: string;
  nickname: string;
  avatar: string;
  faction: string;
  rank: string;
  region: string;
  ubisoftId?: string;
  inGameNick?: string;
}

/**
 * Interface para dados completos de perfil
 * (apenas para perfis públicos ou próprio usuário)
 */
export interface FullProfile extends PublicProfile {
  stats: UserStats;
  email?: string;
  profileVisibility: "public" | "private";
}

/**
 * Serviço para gerenciar visualização de perfis
 * respeitando configurações de privacidade
 */
export class ProfileService {
  /**
   * Obtém o perfil de um usuário respeitando privacidade
   * @param user - Dados completos do usuário
   * @param viewerId - ID do usuário que está visualizando
   * @returns Dados do perfil (públicos ou completos)
   */
  static getProfile(
    user: User,
    viewerId: string
  ): PublicProfile | FullProfile {
    const isOwnProfile = user.id === viewerId;
    const isPublic = user.profileVisibility === "public";

    // Dados públicos básicos (sempre visíveis)
    const publicData: PublicProfile = {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      faction: user.faction,
      rank: user.stats?.rank || "Bronze III",
      region: user.region,
      ubisoftId: user.ubisoftId,
      inGameNick: user.inGameNick,
    };

    // Se é o próprio perfil ou perfil público, retornar dados completos
    if (isOwnProfile || isPublic) {
      return {
        ...publicData,
        stats: user.stats || this.getDefaultStats(),
        email: isOwnProfile ? user.email : undefined,
        profileVisibility: user.profileVisibility,
      } as FullProfile;
    }

    // Perfil privado - apenas dados públicos
    return publicData;
  }

  /**
   * Verifica se um usuário pode ver estatísticas detalhadas
   * @param user - Usuário alvo
   * @param viewerId - ID do visualizador
   * @returns true se pode ver stats
   */
  static canViewStats(user: User, viewerId: string): boolean {
    return user.id === viewerId || user.profileVisibility === "public";
  }

  /**
   * Verifica se um usuário pode ver email
   * @param user - Usuário alvo
   * @param viewerId - ID do visualizador
   * @returns true se pode ver email
   */
  static canViewEmail(user: User, viewerId: string): boolean {
    return user.id === viewerId;
  }

  /**
   * Filtra dados de um usuário para lobby
   * (usado ao enviar dados via WebSocket)
   * @param user - Usuário completo
   * @param viewerId - ID de quem está visualizando
   * @returns Dados filtrados para lobby
   */
  static getLobbyPlayerData(user: User, viewerId: string) {
    const canViewStats = this.canViewStats(user, viewerId);

    return {
      userId: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      faction: user.faction,
      rank: user.stats?.rank || "Bronze III",
      role: null, // Será definido pelo jogador
      ubisoftId: user.ubisoftId,
      inGameNick: user.inGameNick,
      profileVisibility: user.profileVisibility,
      stats: canViewStats ? user.stats : undefined,
      teamId: undefined, // Será definido pelo matchmaking
    };
  }

  /**
   * Retorna estatísticas padrão para novos usuários
   */
  private static getDefaultStats(): UserStats {
    return {
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
  }

  /**
   * Máscara de dados sensíveis para logs
   * @param user - Usuário
   * @returns Dados seguros para logging
   */
  static getSafeLogData(user: User) {
    return {
      id: user.id,
      nickname: user.nickname,
      region: user.region,
      faction: user.faction,
      profileVisibility: user.profileVisibility,
      // Email mascarado
      email: user.email
        ? user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
        : undefined,
    };
  }
}

/**
 * Hook para usar o serviço de perfil
 * (para uso futuro quando integrado com Context API)
 */
export function useProfileService() {
  return {
    getProfile: ProfileService.getProfile,
    canViewStats: ProfileService.canViewStats,
    canViewEmail: ProfileService.canViewEmail,
    getLobbyPlayerData: ProfileService.getLobbyPlayerData,
  };
}
