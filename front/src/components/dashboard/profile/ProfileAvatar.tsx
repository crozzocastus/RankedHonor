/**
 * ProfileAvatar Component
 * 
 * Avatar do usuário com funcionalidade de edição.
 */

import Image from "next/image";
import { Settings, Shield } from "lucide-react";
import { getAvatarPath, getFallbackInitials } from "@/lib/utils/profileHelpers";

interface ProfileAvatarProps {
  nickname: string;
  faction: string;
  avatar: string;
  imageError: boolean;
  onImageError: () => void;
  onAvatarClick: () => void;
}

export function ProfileAvatar({
  nickname,
  faction,
  avatar,
  imageError,
  onImageError,
  onAvatarClick,
}: ProfileAvatarProps) {
  return (
    <div className="text-center">
      <button
        onClick={onAvatarClick}
        className="group relative mx-auto mb-4 block"
        aria-label={`Avatar de ${nickname}`}
      >
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-800 transition-all group-hover:border-orange-500">
          {!imageError ? (
            <Image
              src={getAvatarPath(faction, avatar)}
              alt={`Avatar de ${nickname}`}
              width={128}
              height={128}
              className="h-full w-full object-cover"
              onError={onImageError}
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
              <span className="text-4xl font-bold text-white">
                {getFallbackInitials(nickname)}
              </span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Settings className="h-8 w-8 text-white" />
        </div>
      </button>
      <h2 className="mb-2 text-2xl font-bold text-white">{nickname}</h2>
      <div className="flex items-center justify-center gap-2">
        <Shield className="h-4 w-4 text-orange-500" />
        <span className="text-orange-500">Jogador Competitivo</span>
      </div>
    </div>
  );
}
