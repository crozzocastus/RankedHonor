'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Swords, MapPin } from 'lucide-react';

const gameModes = [
  { value: 'duel', label: 'Duelo (1x1)' },
  { value: 'brawl', label: 'Briga (2x2)' },
  { value: 'domination', label: 'Domínio (4x4)' },
  { value: 'invasion', label: 'Invasão' },
  { value: 'tribute', label: 'Tributo' },
  { value: 'elimination', label: 'Mata-mata' },
];

const regions = [
  { value: 'global', label: 'Global' },
  { value: 'player-region', label: 'Região do Jogador' },
  { value: 'eu', label: 'Europa' },
  { value: 'na', label: 'América do Norte' },
  { value: 'sa', label: 'América do Sul' },
  { value: 'asia', label: 'Ásia' },
];

export default function RankedPage() {
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('player-region');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');

  // Mock user - em produção viria do contexto de auth
  const currentUser = { name: 'Jogador Teste', role: 'player' };

  const handleSearch = () => {
    if (!selectedMode) return;

    setIsSearching(true);
    setSearchStatus('Buscando partida...');

    // Simular matchmaking
    setTimeout(() => {
      setSearchStatus('Partida encontrada!');
      setTimeout(() => {
        setIsSearching(false);
        setSearchStatus('');
        // Aqui seria navegação para a partida ou algo
        alert('Partida encontrada! (Mock)');
      }, 2000);
    }, 3000);
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">
            Buscar Partida Ranqueada
          </h1>
          <p className="text-slate-400">
            Configure seus filtros e encontre a partida perfeita
          </p>
        </div>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-500">
              <Swords className="w-5 h-5" />
              Configurações da Partida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Modo de Jogo *
                </label>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Selecione um modo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {gameModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Região
                </label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={!selectedMode || isSearching}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {searchStatus}
                  </>
                ) : (
                  <>
                    <Swords className="w-4 h-4 mr-2" />
                    Buscar Partida
                  </>
                )}
              </Button>
            </div>

            {searchStatus && !isSearching && (
              <div className="text-center text-green-400 font-medium">
                {searchStatus}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}