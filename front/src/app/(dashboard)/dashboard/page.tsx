"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useMatchmaking } from "@/contexts/MatchmakingContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { QuickActions } from "@/components/landing/QuickActions";
import { MainFeed } from "@/components/landing/MainFeed";
import { Sidebar } from "@/components/landing/Sidebar";
import { RankingsSection } from "@/components/landing/RankingsSection";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { startSearch } = useMatchmaking();
  const router = useRouter();
  const [isQuickRankedLoading, setIsQuickRankedLoading] = useState(false);
  const [quickRankedStatus, setQuickRankedStatus] = useState("");

  // Redirecionar para login se não estiver autenticado (apenas no cliente)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Se ainda está carregando ou não há usuário, mostrar loading
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-orange-500" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleQuickRankedClick = () => {
    // Iniciar busca de partida global
    startSearch("Ranqueada Rápida - 1v1", 90);
    setIsQuickRankedLoading(true);
    setQuickRankedStatus("Buscando partida...");

    // Simular feedback rápido e depois deixar o FloatingMatchmaking gerenciar
    setTimeout(() => {
      setIsQuickRankedLoading(false);
      setQuickRankedStatus("");
    }, 2000);
  };

  const handleRankedClick = () => {
    // Navegar para /ranked
    router.push("/ranked");
  };

  const handleContentClick = () => {
    // Navegar para página de conteúdo
    router.push("/dashboard/content");
  };

  const handleStatsClick = () => {
    // Navegar para rankings detalhados
    alert("Rankings detalhados");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="dashboard" onContentClick={handleContentClick} onStatsClick={handleStatsClick} />

      {/* Dashboard Hero - Elementos principais mantidos no topo */}
      <DashboardHero
        onQuickRankedClick={handleQuickRankedClick}
        isQuickRankedLoading={isQuickRankedLoading}
        quickRankedStatus={quickRankedStatus}
      />

      {/* Welcome Message - Sutil, não quebra a continuidade */}
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="py-4">
          <p className="text-center text-orange-500">
            Bem-vindo de volta, <span className="font-bold">{user.nickname}</span>!
            <span className="ml-2 text-gray-400">Pronto para dominar?</span>
          </p>
        </div>
      </div>

      {/* Quick Actions - Mantido para consistência visual */}
      <QuickActions
        onQuickRankedClick={handleQuickRankedClick}
        isQuickRankedLoading={isQuickRankedLoading}
        quickRankedStatus={quickRankedStatus}
      />

      {/* Main Feed e Sidebar - Mantidos para consistência */}
      <div className="container mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <MainFeed />
          <Sidebar />
        </div>
      </div>

      {/* Rankings Section - Mantido para acesso rápido */}
      <RankingsSection />

      {/* Loading Overlay - Global para busca de ranqueada */}
      {isQuickRankedLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-slate-900 p-8 text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-orange-500" />
            <p className="text-white">{quickRankedStatus}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
