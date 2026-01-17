"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  User,
  Shield,
  Trophy,
  Target,
  Swords,
  Users,
  Crown,
  Medal,
  Award,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
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

const regions = ["Global", "EU", "NA", "SA", "ASIA"];

const rankIcons = {
  bronze: Medal,
  silver: Medal,
  gold: Award,
  platinum: Trophy,
  diamond: Crown,
};

export default function ProfilePage() {
  const { user, updateProfile, changeFaction } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(user ? { ...user } : {});
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [factionChangeDialogOpen, setFactionChangeDialogOpen] = useState(false);
  const [pendingFaction, setPendingFaction] = useState<Faction | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Se não estiver logado, redirecionar para login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Atualizar editedUser quando o usuário mudar
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const toggleProfileVisibility = () => {
    const newVisibility = editedUser.profileVisibility === "public" ? "private" : "public";
    setEditedUser({ ...editedUser, profileVisibility: newVisibility });
  };

  const handleFactionChange = (newFaction: Faction) => {
    if (newFaction !== user.faction) {
      setPendingFaction(newFaction);
      setFactionChangeDialogOpen(true);
    }
  };

  const confirmFactionChange = () => {
    if (pendingFaction) {
      changeFaction(pendingFaction);
      setEditedUser({
        ...editedUser,
        faction: pendingFaction,
        avatar: DEFAULT_HEROES_BY_FACTION[pendingFaction],
      });
      setPendingFaction(null);
      setFactionChangeDialogOpen(false);
    }
  };

  const handleAvatarSelect = (heroId: string) => {
    setEditedUser({ ...editedUser, avatar: heroId });
    updateProfile({ avatar: heroId });
  };

  const getAvatarImagePath = () => {
    if (!user.faction || !user.avatar) return "";
    const factionFolder = user.faction.toLowerCase().replace(" ", "-");
    return `/icons/heroes/${factionFolder}/${user.avatar}.png`;
  };

  const getAvatarFallback = () => {
    return user.nickname[0].toUpperCase();
  };

  const getRankColor = (rank: string) => {
    if (rank.toLowerCase().includes("bronze")) return "text-orange-600";
    if (rank.toLowerCase().includes("prata") || rank.toLowerCase().includes("silver"))
      return "text-gray-400";
    if (rank.toLowerCase().includes("ouro") || rank.toLowerCase().includes("gold"))
      return "text-yellow-500";
    if (rank.toLowerCase().includes("platina") || rank.toLowerCase().includes("platinum"))
      return "text-purple-500";
    if (rank.toLowerCase().includes("diamante") || rank.toLowerCase().includes("diamond"))
      return "text-cyan-500";
    return "text-gray-500";
  };

  const getRankIcon = (rank: string) => {
    if (rank.toLowerCase().includes("bronze")) return rankIcons.bronze;
    if (rank.toLowerCase().includes("prata") || rank.toLowerCase().includes("silver"))
      return rankIcons.silver;
    if (rank.toLowerCase().includes("ouro") || rank.toLowerCase().includes("gold"))
      return rankIcons.gold;
    if (rank.toLowerCase().includes("platina") || rank.toLowerCase().includes("platinum"))
      return rankIcons.platinum;
    if (rank.toLowerCase().includes("diamante") || rank.toLowerCase().includes("diamond"))
      return rankIcons.diamond;
    return rankIcons.bronze;
  };

  const handleContentClick = () => {
    router.push("/dashboard/content");
  };

  const handleStatsClick = () => {
    alert("Rankings detalhados");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dashboard" onContentClick={handleContentClick} onStatsClick={handleStatsClick} />

      <div className="container mx-auto max-w-[1440px] px-6 py-8">
        {/* Header do Perfil */}
        <div className="mb-8 rounded-xl border border-orange-600/30 bg-gradient-to-r from-orange-600/20 to-orange-600/20 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-orange-500">Perfil do Jogador</h1>
            <div className="flex items-center gap-4">
              {/* Toggle de visibilidade */}
              <button
                onClick={toggleProfileVisibility}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                  editedUser.profileVisibility === "public"
                    ? "border border-green-600/30 bg-green-600/20 text-green-500"
                    : "border border-red-600/30 bg-red-600/20 text-red-500"
                }`}
              >
                {editedUser.profileVisibility === "public" ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {editedUser.profileVisibility === "public" ? "Público" : "Privado"}
              </button>

              {/* Botões de edição */}
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-white transition-colors hover:from-orange-600 hover:to-red-700"
                >
                  <Settings className="h-4 w-4" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Avatar e informações básicas */}
            <div className="space-y-6">
              {/* Avatar */}
              <div className="text-center">
                <button
                  onClick={() => setAvatarPickerOpen(true)}
                  className="group relative mx-auto mb-4 block"
                  aria-label={`Avatar de ${user.nickname}`}
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-800 transition-all group-hover:border-orange-500">
                    {!imageError ? (
                      <Image
                        src={getAvatarImagePath()}
                        alt={`Avatar de ${user.nickname}`}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                        onError={() => {
                          setImageError(true);
                        }}
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
                        <span className="text-4xl font-bold text-white">
                          {getAvatarFallback()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                </button>
                <h2 className="mb-2 text-2xl font-bold text-white">{user.nickname}</h2>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-500">Jogador Competitivo</span>
                </div>
              </div>

              {/* Informações editáveis */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Nickname</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.nickname}
                      onChange={(e) => setEditedUser({ ...editedUser, nickname: e.target.value })}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{user.nickname}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">
                    Email da Ubisoft Connect
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">Região</label>
                  {isEditing ? (
                    <select
                      value={editedUser.region}
                      onChange={(e) => setEditedUser({ ...editedUser, region: e.target.value })}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white">{user.region}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">Facção</label>
                  {isEditing ? (
                    <select
                      value={editedUser.faction}
                      onChange={(e) => handleFactionChange(e.target.value as Faction)}
                      aria-label="Alterar facção"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    >
                      {(Object.keys(FACTION_NAMES) as Faction[]).map((faction) => (
                        <option key={faction} value={faction}>
                          {FACTION_NAMES[faction]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white">{FACTION_NAMES[user.faction]}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Estatísticas principais */}
            <div className="space-y-6 lg:col-span-2">
              {/* Rank Geral */}
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Rank Geral
                </h3>
                <div className="flex items-center gap-4">
                  {(() => {
                    const RankIcon = getRankIcon(user.stats?.rank || "Bronze III");
                    return <RankIcon className="h-12 w-12 text-yellow-500" />;
                  })()}
                  <div>
                    <p
                      className={`text-2xl font-bold ${getRankColor(user.stats?.rank || "Bronze III")}`}
                    >
                      {user.stats?.rank || "Bronze III"}
                    </p>
                    <p className="text-gray-400">Temporada 2024</p>
                  </div>
                </div>
              </div>

              {/* Ranks por modo de jogo */}
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <Swords className="h-6 w-6 text-orange-500" />
                  Ranks por Modo
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    { mode: "Duelo", rank: user.stats?.dueloRank },
                    { mode: "Briga", rank: user.stats?.brigaRank },
                    { mode: "Domínio", rank: user.stats?.dominioRank },
                    { mode: "Invasão", rank: user.stats?.invasaoRank },
                    { mode: "Tributo", rank: user.stats?.tributoRank },
                    { mode: "Mata-mata", rank: user.stats?.mataMataRank },
                  ].map(({ mode, rank }) => {
                    const RankIcon = getRankIcon(rank || "Bronze III");
                    return (
                      <div key={mode} className="rounded-lg bg-gray-800 p-4 text-center">
                        <RankIcon
                          className={`mx-auto mb-2 h-8 w-8 ${getRankColor(rank || "Bronze III")}`}
                        />
                        <p className="font-semibold text-white">{mode}</p>
                        <p className={`text-sm ${getRankColor(rank || "Bronze III")}`}>
                          {rank || "Bronze III"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Estatísticas gerais */}
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <Target className="h-6 w-6 text-blue-500" />
                  Desempenho Geral
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {user.stats?.matchesPlayed || 0}
                    </p>
                    <p className="text-gray-400">Partidas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">{user.stats?.wins || 0}</p>
                    <p className="text-gray-400">Vitórias</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-500">{user.stats?.losses || 0}</p>
                    <p className="text-gray-400">Derrotas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-500">
                      {user.stats?.winRate || 0}%
                    </p>
                    <p className="text-gray-400">Win Rate</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-800 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Swords className="h-5 w-5 text-red-500" />
                      <span className="font-semibold text-white">Kills</span>
                    </div>
                    <p className="text-2xl font-bold text-red-500">
                      {user.stats?.kills?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-800 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-white">Mortes</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">
                      {user.stats?.deaths?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Picker Dialog */}
      <AvatarPicker
        open={avatarPickerOpen}
        onOpenChange={setAvatarPickerOpen}
        currentFaction={user.faction}
        currentAvatar={user.avatar}
        onSelectAvatar={handleAvatarSelect}
      />

      {/* Faction Change Confirmation Dialog */}
      <AlertDialog open={factionChangeDialogOpen} onOpenChange={setFactionChangeDialogOpen}>
        <AlertDialogContent className="border-gray-800 bg-gray-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-orange-500">Confirmar Mudança de Facção</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {pendingFaction && (
                <>
                  Mudar para <span className="font-bold text-orange-500">{FACTION_NAMES[pendingFaction]}</span> resetará
                  seu avatar para{" "}
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
