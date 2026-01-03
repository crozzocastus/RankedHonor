'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { QuickActions } from '@/components/landing/QuickActions';
import { MainFeed } from '@/components/landing/MainFeed';
import { Sidebar } from '@/components/landing/Sidebar';
import { RankingsSection } from '@/components/landing/RankingsSection';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [isQuickRankedLoading, setIsQuickRankedLoading] = useState(false);
  const [quickRankedStatus, setQuickRankedStatus] = useState('');

  // Redirecionar para login se não estiver autenticado (apenas no cliente)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Atualizar região quando o usuário carregar
  useEffect(() => {
    if (user) {
      setSelectedRegion(user.region || 'Global');
    }
  }, [user]);

  // Se ainda está carregando ou não há usuário, mostrar loading
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-500" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleQuickRankedClick = () => {
    setIsQuickRankedLoading(true);
    setQuickRankedStatus('Buscando partida...');

    // Simular busca automática baseada na região e modo mais ativo
    setTimeout(() => {
      setQuickRankedStatus('Partida encontrada!');
      setTimeout(() => {
        setIsQuickRankedLoading(false);
        setQuickRankedStatus('');
        alert('Partida encontrada! (Mock - Ranqueada Rápida)');
      }, 2000);
    }, 3000);
  };

  const handleRankedClick = () => {
    // Navegar para /ranked
    router.push('/ranked');
  };

  const handleContentClick = () => {
    // Navegar para página de conteúdo ou rolar para seção de criadores
    alert('Conteúdo - Criadores de conteúdo e lives');
  };

  const handleStatsClick = () => {
    // Navegar para rankings detalhados
    alert('Rankings detalhados');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        onContentClick={handleContentClick}
        onStatsClick={handleStatsClick}
      />
      
      {/* Dashboard Hero - Elementos principais mantidos no topo */}
      <DashboardHero 
        onQuickRankedClick={handleQuickRankedClick}
        isQuickRankedLoading={isQuickRankedLoading}
        quickRankedStatus={quickRankedStatus}
      />

      {/* Welcome Message - Sutil, não quebra a continuidade */}
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="py-4">
          <p className="text-amber-500 text-center">
            Bem-vindo de volta, <span className="font-bold">{user.nickname}</span>! 
            <span className="text-gray-400 ml-2">Pronto para dominar?</span>
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
      <div className="container mx-auto px-6 py-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <MainFeed region={selectedRegion} />
          <Sidebar region={selectedRegion} />
        </div>
      </div>

      {/* Rankings Section - Mantido para acesso rápido */}
      <RankingsSection />
      
      {/* Loading Overlay - Global para busca de ranqueada */}
      {isQuickRankedLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-lg text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-500" />
            <p className="text-white">{quickRankedStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
}