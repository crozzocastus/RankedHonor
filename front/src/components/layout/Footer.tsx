"use client";

import { Sword, Github, MessageCircle, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-black">
      <div className="container mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                <Sword className="h-6 w-6 text-black" />
              </div>
              <span className="tracking-wider text-orange-500">RANKED HONOR</span>
            </div>
            <p className="text-gray-500">
              Sistema de ranqueada competitivo de For Honor, feito pela comunidade para a
              comunidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-white">Plataforma</h4>
            <div className="space-y-2">
              <a
                href="#rankings"
                className="block text-gray-500 transition-colors hover:text-orange-500"
              >
                Rankings
              </a>
              <a
                href="#como-funciona"
                className="block text-gray-500 transition-colors hover:text-orange-500"
              >
                Como funciona
              </a>
              <a
                href="#criadores"
                className="block text-gray-500 transition-colors hover:text-orange-500"
              >
                Criadores
              </a>
              <a
                href="#launcher"
                className="block text-gray-500 transition-colors hover:text-orange-500"
              >
                Launcher
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-white">Comunidade</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Discord
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                GitHub
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Fórum
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Suporte
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-white">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Termos de Uso
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Privacidade
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Regras
              </a>
              <a href="#" className="block text-gray-500 transition-colors hover:text-orange-500">
                Contato
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-900 pt-8 md:flex-row">
          <div className="text-gray-500">
            © 2026 Ranked Honor. Este projeto não é afiliado à Ubisoft.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30 hover:bg-orange-500/20"
            >
              <MessageCircle className="h-5 w-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30 hover:bg-orange-500/20"
            >
              <Github className="h-5 w-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30 hover:bg-orange-500/20"
            >
              <Twitter className="h-5 w-5 text-gray-500 hover:text-orange-500" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-orange-500/30 hover:bg-orange-500/20"
            >
              <Instagram className="h-5 w-5 text-gray-500 hover:text-orange-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
