"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface PreparationTimerProps {
  startedAt: number;
  durationSeconds: number;
  onComplete: () => void;
}

export function PreparationTimer({
  startedAt,
  durationSeconds,
  onComplete,
}: PreparationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(0, durationSeconds - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startedAt, durationSeconds, onComplete]);

  const progress = ((durationSeconds - timeLeft) / durationSeconds) * 100;

  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-5 h-5 text-yellow-300" />
        <h3 className="text-lg font-bold text-yellow-100">
          Período de Preparação
        </h3>
      </div>
      
      <p className="text-sm text-yellow-200">
        Defina suas estratégias e posições. A partida começará em:
      </p>
      
      <div className="text-4xl font-bold text-yellow-300 font-mono">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      
      {/* Barra de progresso */}
      <div className="w-full bg-yellow-950 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
