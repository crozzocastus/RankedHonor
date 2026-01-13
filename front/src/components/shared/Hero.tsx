"use client";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Download, CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHdhcnJpb3IlMjBrbmlnaHR8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="For Honor"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-orange-500">SISTEMA DE RANQUEADA</h1>
            <p className="mb-6 text-slate-300">
              Prove seu valor em combate, suba no ranking e torne-se uma lenda entre os guerreiros.
              Acompanhe lives dos melhores players e entre na batalha!
            </p>

            <div className="mb-6 max-w-md rounded-lg border border-orange-600/30 bg-slate-900/90 p-4">
              <div className="flex items-start gap-3">
                <Download className="mt-1 h-5 w-5 flex-shrink-0 text-green-400" />
                <div className="flex-1">
                  <div className="mb-1 text-green-400">Launcher Oficial</div>
                  <p className="mb-2 text-slate-400">
                    Apenas 1 jogador por partida precisa ter o launcher para registrar o resultado
                  </p>
                  <ul className="mb-3 space-y-1 text-slate-500">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Registro automático de partidas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Atualização de rank em tempo real
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Proteção anti-trapaça
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded border border-orange-600/50 bg-orange-600/20 px-4 py-2">
                <div className="text-slate-400">Jogadores Ativos</div>
                <div className="text-orange-500">12,847</div>
              </div>
              <div className="rounded border border-orange-600/50 bg-orange-600/20 px-4 py-2">
                <div className="text-slate-400">Partidas Hoje</div>
                <div className="text-orange-500">3,421</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
