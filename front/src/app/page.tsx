'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { QuickActions } from '@/components/landing/QuickActions';
import { MainFeed } from '@/components/landing/MainFeed';
import { Sidebar } from '@/components/landing/Sidebar';
import { RankingsSection } from '@/components/landing/RankingsSection';
import { GameModes } from '@/components/landing/GameModes';
import { ContentCreators } from '@/components/landing/ContentCreators';
import { LauncherSection } from '@/components/landing/LauncherSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('Global');

  // Se já estiver logado, redirecionar para dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Se ainda está carregando, mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se já está logado, não renderizar nada (o useEffect vai redirecionar)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onLoginClick={() => router.push('/login')}
        onRegisterClick={() => router.push('/register')}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />

      <HeroSection onPlayNow={() => router.push('/register')} />

      <QuickActions />

      <div className="container mx-auto px-6 py-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <MainFeed region={selectedRegion} />
          <Sidebar region={selectedRegion} />
        </div>
      </div>

      <RankingsSection />

      <GameModes />

      <ContentCreators onBecomeCreator={() => router.push('/register')} />

      <LauncherSection />

      <FinalCTA onCreateAccount={() => router.push('/register')} />

      <Footer />
    </div>
  );
}
