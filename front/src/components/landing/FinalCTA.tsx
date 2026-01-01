import { Sword, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onCreateAccount: () => void;
}

export function FinalCTA({ onCreateAccount }: FinalCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-6 max-w-[1440px] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Sword className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-white mb-6">
            Pronto para provar que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">merece o topo?</span>
          </h2>

          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de guerreiros, suba no ranking e mostre suas habilidades para toda a comunidade
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={onCreateAccount}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-black rounded-lg transition-all flex items-center gap-3 text-lg"
            >
              Criar conta grátis
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onCreateAccount}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all text-lg"
            >
              Já tenho conta
            </button>
          </div>

          <div className="flex items-center justify-center gap-12 text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Gratuito para sempre
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sem pay-to-win
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% fair play
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
