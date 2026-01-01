import { ImageWithFallback } from './figma/ImageWithFallback';
import { Download, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10" />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHdhcnJpb3IlMjBrbmlnaHR8ZW58MXx8fHwxNzY3MzA0NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="For Honor"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-amber-500 mb-4">SISTEMA DE RANQUEADA</h1>
            <p className="text-slate-300 mb-6">
              Prove seu valor em combate, suba no ranking e torne-se uma lenda entre os guerreiros.
              Acompanhe lives dos melhores players e entre na batalha!
            </p>
            
            <div className="bg-slate-900/90 border border-amber-600/30 rounded-lg p-4 mb-6 max-w-md">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="text-green-400 mb-1">Launcher Oficial</div>
                  <p className="text-slate-400 mb-2">
                    Apenas 1 jogador por partida precisa ter o launcher para registrar o resultado
                  </p>
                  <ul className="text-slate-500 space-y-1 mb-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Registro automático de partidas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Atualização de rank em tempo real
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Proteção anti-trapaça
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-amber-600/20 border border-amber-600/50 rounded">
                <div className="text-slate-400">Jogadores Ativos</div>
                <div className="text-amber-500">12,847</div>
              </div>
              <div className="px-4 py-2 bg-amber-600/20 border border-amber-600/50 rounded">
                <div className="text-slate-400">Partidas Hoje</div>
                <div className="text-amber-500">3,421</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}