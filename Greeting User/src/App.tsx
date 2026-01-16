import React, { useState } from 'react';
import { ContentFeed } from './components/ContentFeed';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'content' | 'rankings'>('content');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">FH</span>
            </div>
            <span className="font-bold text-sm tracking-wider">FOR HONOR RANKED</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-sm ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`text-sm ${activeTab === 'content' ? 'text-orange-500' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              Conteúdo
            </button>
            <button 
              onClick={() => setActiveTab('rankings')}
              className={`text-sm ${activeTab === 'rankings' ? 'text-orange-500' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              Rankings
            </button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Torneios
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm rounded hover:from-green-500 hover:to-green-600 transition-all">
              Entrar / Cadastro
            </button>
            <button className="px-3 py-1.5 border border-gray-700 text-gray-300 text-sm rounded hover:border-gray-600 transition-colors">
              Idioma
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {activeTab === 'content' && <ContentFeed />}
        {activeTab === 'home' && (
          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
            Home tab (existing interface)
          </div>
        )}
        {activeTab === 'rankings' && (
          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
            Rankings tab (existing interface)
          </div>
        )}
      </main>
    </div>
  );
}
