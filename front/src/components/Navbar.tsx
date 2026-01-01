import { Sword, User, LogOut, Home, Download } from 'lucide-react';

interface NavbarProps {
  currentUser: any;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onHomeClick: () => void;
}

export function Navbar({ currentUser, onLoginClick, onLogout, onProfileClick, onHomeClick }: NavbarProps) {
  const handleDownloadLauncher = () => {
    alert('Download do For Honor Ranked Launcher iniciado!\n\nO launcher é necessário para registrar suas partidas automaticamente no sistema de ranqueada.');
  };

  return (
    <nav className="bg-slate-900 border-b border-amber-600/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
            <Sword className="w-8 h-8 text-amber-500" />
            <span className="text-amber-500">FOR HONOR RANKED</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadLauncher}
              className="flex items-center gap-2 px-4 py-2 bg-green-700/30 hover:bg-green-700/50 text-green-400 border border-green-600/30 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar Launcher
            </button>
            
            {currentUser ? (
              <>
                <button
                  onClick={onHomeClick}
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-amber-500 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Início
                </button>
                <button
                  onClick={onProfileClick}
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-amber-500 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {currentUser.name}
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors rounded"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-slate-900 rounded transition-colors"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}