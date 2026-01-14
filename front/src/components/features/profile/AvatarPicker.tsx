"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Faction, getHeroesByFaction, Hero } from "@/lib/constants/game.constants";

interface AvatarPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFaction: Faction;
  currentAvatar: string;
  onSelectAvatar: (heroId: string) => void;
}

export function AvatarPicker({
  open,
  onOpenChange,
  currentFaction,
  currentAvatar,
  onSelectAvatar,
}: AvatarPickerProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const heroes = getHeroesByFaction(currentFaction);

  const handleImageLoad = (heroId: string) => {
    setLoadingStates((prev) => ({ ...prev, [heroId]: false }));
  };

  const handleImageError = (heroId: string) => {
    setLoadingStates((prev) => ({ ...prev, [heroId]: false }));
    setImageErrors((prev) => ({ ...prev, [heroId]: true }));
  };

  const handleSelect = (heroId: string) => {
    onSelectAvatar(heroId);
    onOpenChange(false);
  };

  const getImagePath = (hero: Hero) => {
    const factionFolder = currentFaction.toLowerCase().replace(" ", "-");
    // Try .svg first, will fallback to .png in onError
    return `/icons/heroes/${factionFolder}/${hero.id}.svg`;
  };

  const getFallbackInitials = (heroName: string) => {
    return heroName.substring(0, 2).toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-500">
            Escolher Avatar
          </DialogTitle>
          <p className="text-sm text-gray-400">
            Selecione um herói da sua facção para ser seu avatar
          </p>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {heroes.map((hero) => {
              const isSelected = hero.id === currentAvatar;
              const isLoading = loadingStates[hero.id];
              const hasError = imageErrors[hero.id];

              return (
                <button
                  key={hero.id}
                  onClick={() => handleSelect(hero.id)}
                  aria-label={`Selecionar ${hero.name}`}
                  className={`
                    relative flex items-center justify-center rounded-xl border p-4
                    transition-all
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/20 scale-105"
                        : "border-gray-800 bg-gray-900 hover:border-orange-500/30 hover:bg-orange-500/10 hover:scale-105"
                    }
                  `}
                >
                  {isLoading && (
                    <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-800" />
                  )}

                  {!hasError ? (
                    <div className="relative h-20 w-20">
                      <Image
                        src={getImagePath(hero)}
                        alt={hero.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                        onLoad={() => handleImageLoad(hero.id)}
                        onError={() => {
                          // Try .png fallback
                          const img = document.querySelector(
                            `img[alt="${hero.name}"]`
                          ) as HTMLImageElement;
                          if (img && img.src.endsWith(".svg")) {
                            const factionFolder = currentFaction.toLowerCase().replace(" ", "-");
                            img.src = `/icons/heroes/${factionFolder}/${hero.id}.png`;
                          } else {
                            handleImageError(hero.id);
                          }
                        }}
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    // Fallback: Show first 2 letters
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                      <span className="text-2xl font-bold text-white">
                        {getFallbackInitials(hero.name)}
                      </span>
                    </div>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
