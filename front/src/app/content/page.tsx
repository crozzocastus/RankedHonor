"use client";

import { Navbar } from '@/components/layout/Navbar';
import { ContentFeed } from '@/components/content/ContentFeed';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ContentPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleContentClick = () => {
    // Já está na página de conteúdo
  };

  const handleStatsClick = () => {
    if (user) {
      router.push("/dashboard#rankings");
    } else {
      router.push("/#rankings");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        variant={user ? "dashboard" : "landing"} 
        onContentClick={handleContentClick} 
        onStatsClick={handleStatsClick} 
      />
      <ContentFeed />
    </div>
  );
}
