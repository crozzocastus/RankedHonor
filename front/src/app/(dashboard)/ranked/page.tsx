"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Swords, MapPin } from "lucide-react";

const gameModes = [
  { value: "duel", label: "Duelo (1x1)" },
  { value: "brawl", label: "Briga (2x2)" },
  { value: "domination", label: "Domínio (4x4)" },
  { value: "invasion", label: "Invasão" },
  { value: "tribute", label: "Tributo" },
  { value: "elimination", label: "Mata-mata" },
];

const regions = [
  { value: "global", label: "Global" },
  { value: "player-region", label: "Região do Jogador" },
  { value: "eu", label: "Europa" },
  { value: "na", label: "América do Norte" },
  { value: "sa", label: "América do Sul" },
  { value: "asia", label: "Ásia" },
];

export default function RankedPage() {
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("player-region");
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState("");

  // Mock user - em produção viria do contexto de auth
  const currentUser = { name: "Jogador Teste", role: "player" };

  const handleSearch = () => {
    if (!selectedMode) return;

    setIsSearching(true);
    setSearchStatus("Buscando partida...");

    // Simular matchmaking
    setTimeout(() => {
      setSearchStatus("Partida encontrada!");
      setTimeout(() => {
        setIsSearching(false);
        setSearchStatus("");
        // Aqui seria navegação para a partida ou algo
        alert("Partida encontrada! (Mock)");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-orange-500">Buscar Partida Ranqueada</h1>
          <p className="text-slate-400">Configure seus filtros e encontre a partida perfeita</p>
        </div>

        <Card className="border-slate-700 bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500">
              <Swords className="h-5 w-5" />
              Configurações da Partida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Modo de Jogo *
                </label>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger className="border-slate-600 bg-slate-800">
                    <SelectValue placeholder="Selecione um modo" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-600 bg-slate-800">
                    {gameModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Região</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="border-slate-600 bg-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-600 bg-slate-800">
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
                className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 hover:from-orange-600 hover:to-red-700 disabled:bg-slate-600"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {searchStatus}
                  </>
                ) : (
                  <>
                    <Swords className="mr-2 h-4 w-4" />
                    Buscar Partida
                  </>
                )}
              </Button>
            </div>

            {searchStatus && !isSearching && (
              <div className="text-center font-medium text-green-400">{searchStatus}</div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
