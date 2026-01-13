"use client";

import { Sword, ChevronDown } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = ["Global", "EU", "NA", "SA", "ASIA"];

export function Header({
  onLoginClick,
  onRegisterClick,
  selectedRegion,
  onRegionChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-500/20 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
              <Sword className="h-6 w-6 text-black" />
            </div>
            <span className="tracking-wider text-orange-500">RANKED HONOR</span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#rankings" className="text-gray-300 transition-colors hover:text-orange-500">
              Rankings
            </a>
            <a
              href="#como-funciona"
              className="text-gray-300 transition-colors hover:text-orange-500"
            >
              Como funciona
            </a>
            <a href="#criadores" className="text-gray-300 transition-colors hover:text-orange-500">
              Criadores
            </a>
            <a href="#launcher" className="text-gray-300 transition-colors hover:text-orange-500">
              Launcher
            </a>
          </nav>

          {/* Region + Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className="cursor-pointer appearance-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 pr-10 text-gray-300 transition-colors hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>

            <button
              onClick={onLoginClick}
              className="px-5 py-2 text-gray-300 transition-colors hover:text-orange-500"
            >
              Entrar
            </button>

            <button
              onClick={onRegisterClick}
              className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2.5 text-black transition-all hover:from-orange-600 hover:to-red-700"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
