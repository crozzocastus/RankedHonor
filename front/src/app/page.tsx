"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuickActions } from "@/components/landing/QuickActions";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MainFeed } from "@/components/landing/MainFeed";
import { Sidebar } from "@/components/landing/Sidebar";
import { RankingsSection } from "@/components/landing/RankingsSection";
import { GameModes } from "@/components/landing/GameModes";
import { ContentCreators } from "@/components/landing/ContentCreators";
import { LauncherSection } from "@/components/landing/LauncherSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Se já estiver logado, redirecionar para dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Se ainda está carregando, mostrar loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
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
      <Navbar
        variant="landing"
        onLoginClick={() => router.push("/login")}
        onRegisterClick={() => router.push("/register")}
      />

      <HeroSection onPlayNow={() => router.push("/register")} />

      <QuickActions />

      <HowItWorks />

      <div className="container mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <MainFeed />
          <Sidebar />
        </div>
      </div>

      <RankingsSection />

      <GameModes />

      <ContentCreators onBecomeCreator={() => router.push("/register")} />

      <LauncherSection />

      <FinalCTA onCreateAccount={() => router.push("/register")} />

      <Footer />
    </div>
  );
}
