/**
 * Profile Page - Refatorada
 * 
 * Página de perfil do usuário com componentes modulares e dados avançados.
 * ~180 linhas (dentro da diretriz de 200 linhas)
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AvatarPicker } from "@/components/features/profile/AvatarPicker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Faction,
  FACTION_NAMES,
  getHeroById,
  DEFAULT_HEROES_BY_FACTION,
} from "@/lib/constants/game.constants";

// Componentes do perfil
import { ProfileHeader } from "@/components/dashboard/profile/ProfileHeader";
import { ProfileAvatar } from "@/components/dashboard/profile/ProfileAvatar";
import { ProfileBasicInfo } from "@/components/dashboard/profile/ProfileBasicInfo";
import { ProfileRankCard } from "@/components/dashboard/profile/ProfileRankCard";
import { ProfileGameModeRanks } from "@/components/dashboard/profile/ProfileGameModeRanks";
import { ProfilePerformanceStats } from "@/components/dashboard/profile/ProfilePerformanceStats";
import { HeroMetricsGrid } from "@/components/dashboard/profile/HeroMetricsGrid";
import { MatchHistoryList } from "@/components/dashboard/profile/MatchHistoryList";
import { DetailedRankings } from "@/components/dashboard/profile/DetailedRankings";

// Services
import {
  useHeroMetrics,
  useMatchHistory,
  useRankingDetails,
  useLeaderboard,
} from "@/services/profile-data.service";

const regions = ["Global", "EU", "NA", "SA", "ASIA"];

export default function ProfilePage() {
  const { user, updateProfile, changeFaction } = useAuth();
  const router = useRouter();
  
  // Estado de edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(user ? { ...user } : {});
  
  // Estados de UI
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [factionChangeDialogOpen, setFactionChangeDialogOpen] = useState(false);
  const [pendingFaction, setPendingFaction] = useState<Faction | null>(null);
  const [imageError, setImageError] = useState(false);

  // Dados avançados do perfil (com cache)
  const { metrics } = useHeroMetrics(user?.id || "");
  const { history, loadMore, hasMore, isLoading } = useMatchHistory(user?.id || "");
  const { rankings } = useRankingDetails(user?.id || "");
  const { leaderboard } = useLeaderboard(user?.id || "");

  // Redirecionamento se não logado
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Sincronizar editedUser com user
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  // Handlers
  const handleSave = async () => {
    await updateProfile(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const toggleProfileVisibility = () => {
    const newVisibility = editedUser.profileVisibility === "public" ? "private" : "public";
    setEditedUser({ ...editedUser, profileVisibility: newVisibility });
    updateProfile({ profileVisibility: newVisibility });
  };

  const handleFactionChange = (newFaction: Faction) => {
    setPendingFaction(newFaction);
    setFactionChangeDialogOpen(true);
  };

  const confirmFactionChange = async () => {
    if (pendingFaction) {
      await changeFaction(pendingFaction);
      setEditedUser({ ...editedUser, faction: pendingFaction });
      setFactionChangeDialogOpen(false);
      setPendingFaction(null);
    }
  };

  const handleAvatarSelect = async (newAvatar: string) => {
    await updateProfile({ avatar: newAvatar });
    setEditedUser({ ...editedUser, avatar: newAvatar });
    setImageError(false);
  };

  const handleContentClick = () => {
    router.push("/content");
  };

  const handleStatsClick = () => {
    alert("Rankings detalhados");
  };

  // Loading state
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Preparar dados para componentes
  const gameModeRanks = [
    { mode: "Duelo", rank: user.stats?.dueloRank || "Bronze III" },
    { mode: "Briga", rank: user.stats?.brigaRank || "Bronze III" },
    { mode: "Domínio", rank: user.stats?.dominioRank || "Bronze III" },
    { mode: "Invasão", rank: user.stats?.invasaoRank || "Bronze III" },
    { mode: "Tributo", rank: user.stats?.tributoRank || "Bronze III" },
    { mode: "Mata-mata", rank: user.stats?.mataMataRank || "Bronze III" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dashboard" onContentClick={handleContentClick} onStatsClick={handleStatsClick} />

      <div className="container mx-auto max-w-[1440px] px-6 py-8">
        {/* Container principal do perfil com borda laranja */}
        <div className="mb-8 rounded-xl border border-orange-600/30 bg-gradient-to-r from-orange-600/20 to-orange-600/20 p-8">
          <ProfileHeader
            profileVisibility={editedUser.profileVisibility}
            isEditing={isEditing}
            onToggleVisibility={toggleProfileVisibility}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar: Avatar e informações básicas */}
          <div className="space-y-6">
            <ProfileAvatar
              nickname={user.nickname}
              faction={user.faction}
              avatar={user.avatar}
              imageError={imageError}
              onImageError={() => setImageError(true)}
              onAvatarClick={() => setAvatarPickerOpen(true)}
            />

            <ProfileBasicInfo
              isEditing={isEditing}
              nickname={editedUser.nickname}
              email={editedUser.email}
              region={editedUser.region}
              faction={editedUser.faction}
              regions={regions}
              onNicknameChange={(value) => setEditedUser({ ...editedUser, nickname: value })}
              onEmailChange={(value) => setEditedUser({ ...editedUser, email: value })}
              onRegionChange={(value) => setEditedUser({ ...editedUser, region: value })}
              onFactionChange={handleFactionChange}
            />
          </div>

          {/* Main: Estatísticas */}
          <div className="space-y-6 lg:col-span-2">
            <ProfileRankCard rank={user.stats?.rank || "Bronze III"} />
            <ProfileGameModeRanks ranks={gameModeRanks} />
            <ProfilePerformanceStats
              matchesPlayed={user.stats?.matchesPlayed || 0}
              wins={user.stats?.wins || 0}
              losses={user.stats?.losses || 0}
              winRate={user.stats?.winRate || 0}
              kills={user.stats?.kills || 0}
              deaths={user.stats?.deaths || 0}
            />
          </div>
        </div>
        </div>
        {/* Fim do container laranja */}

        {/* Seção expandida: Dados avançados */}
        <div className="space-y-8">
          <HeroMetricsGrid metrics={metrics} />
          <MatchHistoryList
            matches={history}
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={loadMore}
          />
          <DetailedRankings rankings={rankings} leaderboard={leaderboard} />
        </div>
      </div>

      {/* Dialogs */}
      <AvatarPicker
        open={avatarPickerOpen}
        onOpenChange={setAvatarPickerOpen}
        currentFaction={user.faction}
        currentAvatar={user.avatar}
        onSelectAvatar={handleAvatarSelect}
      />

      <AlertDialog open={factionChangeDialogOpen} onOpenChange={setFactionChangeDialogOpen}>
        <AlertDialogContent className="border-gray-800 bg-gray-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-orange-500">
              Confirmar Mudança de Facção
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {pendingFaction && (
                <>
                  Mudar para{" "}
                  <span className="font-bold text-orange-500">
                    {FACTION_NAMES[pendingFaction]}
                  </span>{" "}
                  resetará seu avatar para{" "}
                  <span className="font-bold text-orange-500">
                    {getHeroById(DEFAULT_HEROES_BY_FACTION[pendingFaction])?.name}
                  </span>
                  . Você poderá escolher outro herói da nova facção depois. Confirmar?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmFactionChange}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
