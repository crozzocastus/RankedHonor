/**
 * ProfileBasicInfo Component
 * 
 * Informações básicas editáveis do perfil (nickname, email, região, facção).
 */

"use client";

import { FACTION_NAMES } from "@/lib/constants/game.constants";

type Faction = keyof typeof FACTION_NAMES;

interface ProfileBasicInfoProps {
  isEditing: boolean;
  nickname: string;
  email: string;
  region: string;
  faction: Faction;
  regions: string[];
  onNicknameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onFactionChange: (value: Faction) => void;
}

export function ProfileBasicInfo({
  isEditing,
  nickname,
  email,
  region,
  faction,
  regions,
  onNicknameChange,
  onEmailChange,
  onRegionChange,
  onFactionChange,
}: ProfileBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-gray-400">Nickname</label>
        {isEditing ? (
          <input
            type="text"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          />
        ) : (
          <p className="text-white">{nickname}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">
          Email da Ubisoft Connect
        </label>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          />
        ) : (
          <p className="text-white">{email}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">Região</label>
        {isEditing ? (
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-white">{region}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">Facção</label>
        {isEditing ? (
          <select
            value={faction}
            onChange={(e) => onFactionChange(e.target.value as Faction)}
            aria-label="Alterar facção"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          >
            {(Object.keys(FACTION_NAMES) as Faction[]).map((f) => (
              <option key={f} value={f}>
                {FACTION_NAMES[f]}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-white">{FACTION_NAMES[faction]}</p>
        )}
      </div>
    </div>
  );
}
