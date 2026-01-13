'use client';

import { Sword, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = ['Global', 'EU', 'NA', 'SA', 'ASIA'];

export function Header({ onLoginClick, onRegisterClick, selectedRegion, onRegionChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-orange-500/20">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Sword className="w-6 h-6 text-black" />
            </div>
            <span className="text-orange-500 tracking-wider">RANKED HONOR</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#rankings" className="text-gray-300 hover:text-orange-500 transition-colors">
              Rankings
            </a>
            <a href="#como-funciona" className="text-gray-300 hover:text-orange-500 transition-colors">
              Como funciona
            </a>
            <a href="#criadores" className="text-gray-300 hover:text-orange-500 transition-colors">
              Criadores
            </a>
            <a href="#launcher" className="text-gray-300 hover:text-orange-500 transition-colors">
              Launcher
            </a>
          </nav>

          {/* Region + Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className="appearance-none bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-gray-300 hover:border-orange-500 transition-colors cursor-pointer focus:outline-none focus:border-orange-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <button
              onClick={onLoginClick}
              className="px-5 py-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              Entrar
            </button>

            <button
              onClick={onRegisterClick}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-black rounded-lg transition-all"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
