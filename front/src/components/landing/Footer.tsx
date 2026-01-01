import { Sword, Github, MessageCircle, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="container mx-auto px-6 max-w-[1440px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Sword className="w-6 h-6 text-black" />
              </div>
              <span className="text-orange-500 tracking-wider">RANKED HONOR</span>
            </div>
            <p className="text-gray-500">
              Sistema de ranqueada competitivo de For Honor, feito pela comunidade para a comunidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4">Plataforma</h4>
            <div className="space-y-2">
              <a href="#rankings" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Rankings
              </a>
              <a href="#como-funciona" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Como funciona
              </a>
              <a href="#criadores" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Criadores
              </a>
              <a href="#launcher" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Launcher
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Comunidade</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Discord
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                GitHub
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Fórum
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Suporte
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Privacidade
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Regras
              </a>
              <a href="#" className="block text-gray-500 hover:text-orange-500 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500">
            © 2026 Ranked Honor. Este projeto não é afiliado à Ubisoft.
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/30 rounded-lg flex items-center justify-center transition-all">
              <MessageCircle className="w-5 h-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/30 rounded-lg flex items-center justify-center transition-all">
              <Github className="w-5 h-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/30 rounded-lg flex items-center justify-center transition-all">
              <Twitter className="w-5 h-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/30 rounded-lg flex items-center justify-center transition-all">
              <Instagram className="w-5 h-5 text-gray-500 hover:text-orange-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
