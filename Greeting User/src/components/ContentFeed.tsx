import React, { useState, useRef, useEffect } from 'react';
import { Filter, Users, Video, Image as ImageIcon, Mic, FileText, Radio } from 'lucide-react';
import { ContentCard } from './ContentCard';
import { mockPosts } from '../data/mockPosts';

type ContentFilter = 'all' | 'following' | 'videos' | 'images' | 'audio' | 'text' | 'live' | 'ranked';

export function ContentFeed() {
  const [activeFilter, setActiveFilter] = useState<ContentFilter>('all');
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  const filteredPosts = mockPosts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'following') return post.isFollowing;
    if (activeFilter === 'ranked') return post.isRankedContent;
    if (activeFilter === 'videos') return post.type === 'video';
    if (activeFilter === 'images') return post.type === 'image';
    if (activeFilter === 'audio') return post.type === 'audio';
    if (activeFilter === 'text') return post.type === 'text';
    if (activeFilter === 'live') return post.type === 'live';
    return true;
  });

  const handleScroll = (direction: 'up' | 'down') => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    if (direction === 'down' && currentPostIndex < filteredPosts.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
    } else if (direction === 'up' && currentPostIndex > 0) {
      setCurrentPostIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsScrolling(false), 600);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleScroll('down');
    } else if (e.deltaY < 0) {
      handleScroll('up');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
      }
    }
  };

  const filterButtons: Array<{ type: ContentFilter; label: string; icon: React.ReactNode }> = [
    { type: 'all', label: 'Todos', icon: <Filter className="w-4 h-4" /> },
    { type: 'following', label: 'Seguindo', icon: <Users className="w-4 h-4" /> },
    { type: 'videos', label: 'Vídeos', icon: <Video className="w-4 h-4" /> },
    { type: 'live', label: 'Ao Vivo', icon: <Radio className="w-4 h-4" /> },
    { type: 'images', label: 'Imagens', icon: <ImageIcon className="w-4 h-4" /> },
    { type: 'audio', label: 'Áudio', icon: <Mic className="w-4 h-4" /> },
    { type: 'text', label: 'Texto', icon: <FileText className="w-4 h-4" /> },
    { type: 'ranked', label: 'Ranqueado', icon: <span className="text-orange-500 font-bold text-xs">R</span> },
  ];

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Filters Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {filterButtons.map((filter) => (
              <button
                key={filter.type}
                onClick={() => {
                  setActiveFilter(filter.type);
                  setCurrentPostIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.type
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Feed */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="h-full w-full overflow-hidden"
      >
        <div
          className="transition-transform duration-500 ease-out h-full"
          style={{
            transform: `translateY(-${currentPostIndex * 100}vh)`,
          }}
        >
          {filteredPosts.map((post, index) => (
            <div key={post.id} className="h-screen w-full">
              <ContentCard
                post={post}
                isActive={index === currentPostIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {filteredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPostIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentPostIndex
                ? 'bg-orange-500 h-8'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Post Counter */}
      <div className="absolute bottom-6 left-6 z-20 text-sm text-gray-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {currentPostIndex + 1} / {filteredPosts.length}
      </div>
    </div>
  );
}
