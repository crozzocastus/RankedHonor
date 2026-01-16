"use client";

import { useState, useEffect, useRef } from 'react';
import { useMatchmaking } from '@/contexts/MatchmakingContext';
import { Loader2, Clock, Minimize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FloatingMatchmaking() {
  const { isSearching, searchStartTime, estimatedTime, gameMode, cancelSearch, completeSearch } = useMatchmaking();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const widgetRef = useRef<HTMLDivElement>(null);

  console.log('FloatingMatchmaking render:', { isSearching, searchStartTime, gameMode });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (!isSearching || !searchStartTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - searchStartTime) / 1000);
      setElapsedTime(elapsed);

      if (elapsed >= estimatedTime + Math.random() * 30) {
        completeSearch();
        alert('Partida encontrada! Conectando...');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSearching, searchStartTime, estimatedTime, completeSearch]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  if (!isSearching) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={widgetRef}
      className="fixed z-50"
      style={{
        left: position.x ? `${position.x}px` : 'auto',
        top: position.y ? `${position.y}px` : 'auto',
        right: position.x ? 'auto' : '24px',
        bottom: position.y ? 'auto' : '24px',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {isHidden ? (
        <button
          onMouseDown={handleMouseDown}
          onClick={(e) => {
            e.stopPropagation();
            setIsHidden(false);
          }}
          className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-full p-3 shadow-2xl shadow-orange-500/20 hover:scale-110 transition-transform"
          title="Expandir"
        >
          <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
        </button>
      ) : (
        <div 
          onMouseDown={handleMouseDown}
          className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl p-6 shadow-2xl shadow-orange-500/20 min-w-[320px] select-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Buscando Partida</h3>
                <p className="text-gray-400 text-xs">{gameMode}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsHidden(true);
              }}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              title="Minimizar"
            >
              <Minimize2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-white font-semibold">{formatTime(elapsedTime)}</span>
            </div>
            <span className="text-gray-400 text-xs">
              Estimado: {formatTime(estimatedTime)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((elapsedTime / estimatedTime) * 100, 100)}%` }}
            />
          </div>
        </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push('/ranked');
              }}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Ver Detalhes
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                cancelSearch();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
