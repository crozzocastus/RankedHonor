'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { User, Shield, Trophy, Target, Swords, Users, Crown, Medal, Award, Settings, Eye, EyeOff } from 'lucide-react';

// Mock de avatares de heróis do For Honor
const heroAvatars = [
  { id: 'warden', name: 'Warden', faction: 'Knights' },
  { id: 'raider', name: 'Raider', faction: 'Vikings' },
  { id: 'orochi', name: 'Orochi', faction: 'Samurai' },
  { id: 'conqueror', name: 'Conqueror', faction: 'Knights' },
  { id: 'berzerker', name: 'Berzerker', faction: 'Vikings' },
  { id: 'kensei', name: 'Kensei', faction: 'Samurai' },
  { id: 'peacekeeper', name: 'Peacekeeper', faction: 'Knights' },
  { id: 'valkyrie', name: 'Valkyrie', faction: 'Vikings' },
  { id: 'shugoki', name: 'Shugoki', faction: 'Samurai' }
];

const regions = ['Global', 'EU', 'NA', 'SA', 'ASIA'];

const rankIcons = {
  bronze: Medal,
  silver: Medal,
  gold: Award,
  platinum: Trophy,
  diamond: Crown
};

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(user ? { ...user } : {});
  const [showPassword, setShowPassword] = useState(false);

  // Se não estiver logado, redirecionar para login
  useEffect(() => {
    if (!user) {
      router.push('/login');
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
    const newVisibility = editedUser.profileVisibility === 'public' ? 'private' : 'public';
    setEditedUser({ ...editedUser, profileVisibility: newVisibility });
  };

  const getRankColor = (rank: string) => {
    if (rank.toLowerCase().includes('bronze')) return 'text-orange-600';
    if (rank.toLowerCase().includes('prata') || rank.toLowerCase().includes('silver')) return 'text-gray-400';
    if (rank.toLowerCase().includes('ouro') || rank.toLowerCase().includes('gold')) return 'text-yellow-500';
    if (rank.toLowerCase().includes('platina') || rank.toLowerCase().includes('platinum')) return 'text-purple-500';
    if (rank.toLowerCase().includes('diamante') || rank.toLowerCase().includes('diamond')) return 'text-cyan-500';
    return 'text-gray-500';
  };

  const getRankIcon = (rank: string) => {
    if (rank.toLowerCase().includes('bronze')) return rankIcons.bronze;
    if (rank.toLowerCase().includes('prata') || rank.toLowerCase().includes('silver')) return rankIcons.silver;
    if (rank.toLowerCase().includes('ouro') || rank.toLowerCase().includes('gold')) return rankIcons.gold;
    if (rank.toLowerCase().includes('platina') || rank.toLowerCase().includes('platinum')) return rankIcons.platinum;
    if (rank.toLowerCase().includes('diamante') || rank.toLowerCase().includes('diamond')) return rankIcons.diamond;
    return rankIcons.bronze;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-8 max-w-[1440px]">
        {/* Header do Perfil */}
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-600/30 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-amber-500">Perfil do Jogador</h1>
            <div className="flex items-center gap-4">
              {/* Toggle de visibilidade */}
              <button
                onClick={toggleProfileVisibility}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  editedUser.profileVisibility === 'public' 
                    ? 'bg-green-600/20 text-green-500 border border-green-600/30' 
                    : 'bg-red-600/20 text-red-500 border border-red-600/30'
                }`}
              >
                {editedUser.profileVisibility === 'public' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {editedUser.profileVisibility === 'public' ? 'Público' : 'Privado'}
              </button>

              {/* Botões de edição */}
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar e informações básicas */}
            <div className="space-y-6">
              {/* Avatar */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-black">{user.nickname[0].toUpperCase()}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{user.nickname}</h2>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500">Jogador Competitivo</span>
                </div>
              </div>

              {/* Informações editáveis */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nickname</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.nickname}
                      onChange={(e) => setEditedUser({ ...editedUser, nickname: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  ) : (
                    <p className="text-white">{user.nickname}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email da Ubisoft Connect</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  ) : (
                    <p className="text-white">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Região</label>
                  {isEditing ? (
                    <select
                      value={editedUser.region}
                      onChange={(e) => setEditedUser({ ...editedUser, region: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white">{user.region}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Estatísticas principais */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rank Geral */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Rank Geral
                </h3>
                <div className="flex items-center gap-4">
                  {(() => {
                    const RankIcon = getRankIcon(user.stats?.rank || 'Bronze III');
                    return <RankIcon className="w-12 h-12 text-yellow-500" />;
                  })()}
                  <div>
                    <p className={`text-2xl font-bold ${getRankColor(user.stats?.rank || 'Bronze III')}`}>
                      {user.stats?.rank || 'Bronze III'}
                    </p>
                    <p className="text-gray-400">Temporada 2024</p>
                  </div>
                </div>
              </div>

              {/* Ranks por modo de jogo */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Swords className="w-6 h-6 text-orange-500" />
                  Ranks por Modo
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { mode: 'Duelo', rank: user.stats?.dueloRank },
                    { mode: 'Briga', rank: user.stats?.brigaRank },
                    { mode: 'Domínio', rank: user.stats?.dominioRank },
                    { mode: 'Invasão', rank: user.stats?.invasaoRank },
                    { mode: 'Tributo', rank: user.stats?.tributoRank },
                    { mode: 'Mata-mata', rank: user.stats?.mataMataRank }
                  ].map(({ mode, rank }) => {
                    const RankIcon = getRankIcon(rank || 'Bronze III');
                    return (
                      <div key={mode} className="bg-gray-800 rounded-lg p-4 text-center">
                        <RankIcon className={`w-8 h-8 mx-auto mb-2 ${getRankColor(rank || 'Bronze III')}`} />
                        <p className="text-white font-semibold">{mode}</p>
                        <p className={`text-sm ${getRankColor(rank || 'Bronze III')}`}>{rank || 'Bronze III'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Estatísticas gerais */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  Desempenho Geral
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{user.stats?.matchesPlayed || 0}</p>
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
                    <p className="text-2xl font-bold text-amber-500">{user.stats?.winRate || 0}%</p>
                    <p className="text-gray-400">Win Rate</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Swords className="w-5 h-5 text-red-500" />
                      <span className="text-white font-semibold">Kills</span>
                    </div>
                    <p className="text-2xl font-bold text-red-500">{user.stats?.kills?.toLocaleString() || 0}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <span className="text-white font-semibold">Mortes</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">{user.stats?.deaths?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
