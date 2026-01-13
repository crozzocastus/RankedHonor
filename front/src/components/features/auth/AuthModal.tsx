"use client";

import { useState } from "react";
import { X, Sword } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      onLogin(email, password);
    } else {
      onRegister(name, email, password);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md rounded-lg border border-orange-500/30 bg-gray-900 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <Sword className="h-8 w-8 text-orange-500" />
          <h2 className="text-orange-500">
            {mode === "login" ? "ENTRAR NA BATALHA" : "NOVO GUERREIRO"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-2 block text-gray-400">Nome de Guerreiro</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-400">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-gradient-to-r from-orange-500 to-red-600 py-3 text-black transition-all hover:from-orange-600 hover:to-red-700"
          >
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-orange-500 transition-colors hover:text-orange-400"
          >
            {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
