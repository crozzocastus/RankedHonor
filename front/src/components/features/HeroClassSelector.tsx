"use client";

import React, { useState } from "react";
import { HeroClass } from "@/types";
import { ALL_HEROES, HeroClass as GameHeroClass } from "@/lib/constants/game.constants";
import { Shield, Swords, Weight, Blend } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface HeroClassSelectorProps {
  selectedHero: string | null;
  preferredClasses: HeroClass[];
  onHeroSelect: (heroId: string | null) => void;
  onClassToggle: (heroClass: HeroClass) => void;
}

export function HeroClassSelector({
  selectedHero,
  preferredClasses,
  onHeroSelect,
  onClassToggle,
}: HeroClassSelectorProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "class">("hero");

  const classIcons: Record<HeroClass, React.ReactNode> = {
    Vanguardeiro: <Swords className="w-5 h-5" />,
    Pesado: <Shield className="w-5 h-5" />,
    Assassino: <Weight className="w-5 h-5" />,
    Híbrido: <Blend className="w-5 h-5" />,
  };

  const classColors: Record<HeroClass, string> = {
    Vanguardeiro: "from-orange-600 to-orange-800",
    Pesado: "from-blue-600 to-blue-800",
    Assassino: "from-red-600 to-red-800",
    Híbrido: "from-purple-600 to-purple-800",
  };

  const herosByClass: Record<HeroClass, typeof ALL_HEROES> = {
    Vanguardeiro: ALL_HEROES.filter((h) => h.heroClass === "Vanguardeiro"),
    Pesado: ALL_HEROES.filter((h) => h.heroClass === "Pesado"),
    Assassino: ALL_HEROES.filter((h) => h.heroClass === "Assassino"),
    Híbrido: ALL_HEROES.filter((h) => h.heroClass === "Híbrido"),
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">
        Preferências de Jogo
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("hero")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg font-semibold transition-colors",
            activeTab === "hero"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          )}
        >
          Herói Preferido
        </button>
        <button
          onClick={() => setActiveTab("class")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg font-semibold transition-colors",
            activeTab === "class"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          )}
        >
          Classes Preferidas
        </button>
      </div>

      {/* Conteúdo */}
      {activeTab === "hero" ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-400 text-center">
            Selecione seu herói preferido. Clique novamente para desselecionar.
          </p>

          {/* Grid de heróis por classe */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {(Object.keys(herosByClass) as HeroClass[]).map((heroClass) => (
              <div key={heroClass}>
                <div
                  className={cn(
                    "flex items-center gap-2 mb-2 px-3 py-1 rounded bg-gradient-to-r",
                    classColors[heroClass]
                  )}
                >
                  {classIcons[heroClass]}
                  <span className="font-semibold text-white text-sm">
                    {heroClass}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pl-2">
                  {herosByClass[heroClass].map((hero) => (
                    <button
                      key={hero.id}
                      onClick={() =>
                        onHeroSelect(selectedHero === hero.id ? null : hero.id)
                      }
                      className={cn(
                        "p-2 rounded-lg border-2 transition-all text-xs font-medium text-center",
                        selectedHero === hero.id
                          ? "border-yellow-400 bg-yellow-900/50 text-yellow-100 shadow-lg shadow-yellow-500/50"
                          : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
                      )}
                      title={hero.name}
                    >
                      {hero.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-400 text-center">
            Selecione suas classes preferidas (múltipla escolha)
          </p>

          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(classIcons) as HeroClass[]).map((heroClass) => {
              const isSelected = preferredClasses.includes(heroClass);
              return (
                <button
                  key={heroClass}
                  onClick={() => onClassToggle(heroClass)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                    isSelected
                      ? "border-blue-400 bg-blue-900/50 shadow-lg shadow-blue-500/30"
                      : "border-slate-600 bg-slate-800 hover:border-slate-500 hover:bg-slate-700"
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded bg-gradient-to-br",
                      classColors[heroClass]
                    )}
                  >
                    {classIcons[heroClass]}
                  </div>
                  <div className="flex-1 text-left">
                    <div
                      className={cn(
                        "font-semibold text-sm",
                        isSelected ? "text-blue-100" : "text-slate-200"
                      )}
                    >
                      {heroClass}
                    </div>
                    <div className="text-xs text-slate-400">
                      {herosByClass[heroClass].length} heróis
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {preferredClasses.length > 0 && (
            <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-700">
              <p className="text-xs text-slate-400 mb-2">Classes selecionadas:</p>
              <div className="flex flex-wrap gap-2">
                {preferredClasses.map((heroClass) => (
                  <span
                    key={heroClass}
                    className="px-2 py-1 bg-blue-800 text-blue-100 rounded text-xs font-medium flex items-center gap-1"
                  >
                    {classIcons[heroClass]}
                    {heroClass}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
