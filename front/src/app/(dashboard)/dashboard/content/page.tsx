"use client";

import { Navbar } from '@/components/layout/Navbar';
import { ContentFeed } from '@/components/content/ContentFeed';
import { useRouter } from 'next/navigation';

export default function ContentPage() {
  const router = useRouter();

  const handleContentClick = () => {
    // Já está na página de conteúdo
  };

  const handleStatsClick = () => {
    alert("Rankings detalhados");
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar onContentClick={handleContentClick} onStatsClick={handleStatsClick} />
      <ContentFeed />
    </div>
  );
}
