'use client';

import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { QuickActions } from '@/components/landing/QuickActions';
import { MainFeed } from '@/components/landing/MainFeed';
import { Sidebar } from '@/components/landing/Sidebar';
import { RankingsSection } from '@/components/landing/RankingsSection';
import { GameModes } from '@/components/landing/GameModes';
import { ContentCreators } from '@/components/landing/ContentCreators';
import { LauncherSection } from '@/components/landing/LauncherSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { AuthModal } from '@/components/AuthModal';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRegion, setSelectedRegion] = useState('Global');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email);
    setIsAuthModalOpen(false);
    // Aqui seria a lógica real de login
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register:', name, email);
    setIsAuthModalOpen(false);
    // Aqui seria a lógica real de registro
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onLoginClick={() => handleOpenAuth('login')}
        onRegisterClick={() => handleOpenAuth('register')}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />

      <HeroSection onPlayNow={() => handleOpenAuth('register')} />

      <QuickActions />

      <div className="container mx-auto px-6 py-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <MainFeed region={selectedRegion} />
          <Sidebar region={selectedRegion} />
        </div>
      </div>

      <RankingsSection />

      <GameModes />

      <ContentCreators onBecomeCreator={() => handleOpenAuth('register')} />

      <LauncherSection />

      <FinalCTA onCreateAccount={() => handleOpenAuth('register')} />

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        initialMode={authMode}
      />
    </div>
  );
}
