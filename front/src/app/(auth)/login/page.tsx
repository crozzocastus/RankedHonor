"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sword, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Se já estiver logado, redirecionar para dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(formData.nickname, formData.password);

    if (!success) {
      setError("Nickname ou senha incorretos. Tente novamente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto max-w-[1440px] px-6 py-16">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Sword className="h-12 w-12 text-orange-500" />
              <h1 className="text-3xl font-bold text-orange-500">FOR HONOR RANKED</h1>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Entrar na Conta</h2>
            <p className="text-gray-400">
              Acesse seu perfil para acompanhar suas estatísticas e ranqueadas
            </p>
          </div>

          {/* Formulário */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nickname */}
              <div>
                <label htmlFor="nickname" className="mb-2 block text-sm font-medium text-gray-300">
                  Nickname
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Seu nickname do jogo"
                />
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-600/30 bg-red-900/20 p-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-500">{error}</span>
                </div>
              )}

              {/* Botão de submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-3 font-bold text-white transition-colors hover:from-orange-600 hover:to-red-700 disabled:bg-gray-700"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Links auxiliares */}
            <div className="mt-6 space-y-2 text-center">
              <p className="text-gray-400">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-orange-500 transition-colors hover:text-orange-400"
                >
                  Criar conta
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Dica: Use nickname "WarLegend" e senha "123456" para teste
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
