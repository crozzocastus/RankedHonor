import { Sword, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onCreateAccount: () => void;
}

export function FinalCTA({ onCreateAccount }: FinalCTAProps) {
  return (
    <section className="bg-gradient-to-b from-black to-gray-950 py-24">
      <div className="container mx-auto max-w-[1440px] px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
            <Sword className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-6 text-white">
            Pronto para provar que{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              merece o topo?
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-400">
            Junte-se a milhares de guerreiros, suba no ranking e mostre suas habilidades para toda a
            comunidade
          </p>

          <div className="mb-12 flex items-center justify-center gap-4">
            <button
              onClick={onCreateAccount}
              className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-lg text-black transition-all hover:from-orange-600 hover:to-red-700"
            >
              Criar conta grátis
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={onCreateAccount}
              className="rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-lg text-white transition-all hover:bg-white/10"
            >
              Já tenho conta
            </button>
          </div>

          <div className="flex items-center justify-center gap-12 text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Gratuito para sempre
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Sem pay-to-win
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              100% fair play
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
