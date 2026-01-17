"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sword, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Faction, FACTION_NAMES } from "@/lib/constants/game.constants";

export default function RegisterPage() {
  const { register, isLoading, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    faction: "" as Faction | "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Se já estiver logado, redirecionar para dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (formData.nickname.length < 3) {
      setError("O nickname deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!formData.faction) {
      setError("Você deve escolher uma facção.");
      return;
    }

    const success = await register(formData.nickname, formData.email, formData.password, formData.faction);

    if (success) {
      setSuccess(true);
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setError("Este nickname já está em uso. Escolha outro.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar variant="landing" />

      <div className="container mx-auto max-w-[1440px] px-6 py-16">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Sword className="h-12 w-12 text-orange-500" />
              <h1 className="text-3xl font-bold text-orange-500">RANKED HONOR</h1>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Criar Conta</h2>
            <p className="text-gray-400">Junte-se à comunidade competitiva de For Honor</p>
          </div>

          {/* Formulário */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nickname */}
                <div>
                  <label
                    htmlFor="nickname"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Nickname *
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                    minLength={3}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Seu nickname único"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Mínimo 3 caracteres. Será seu nome de jogador.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email da Ubisoft Connect *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="seu.email@ubisoft.com"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Use o mesmo email da sua conta Ubisoft.
                  </p>
                </div>

                {/* Facção */}
                <div>
                  <label htmlFor="faction" className="mb-2 block text-sm font-medium text-gray-300">
                    Facção *
                  </label>
                  <select
                    id="faction"
                    name="faction"
                    value={formData.faction}
                    onChange={handleChange}
                    required
                    aria-label="Escolha sua facção"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>
                      Selecione sua facção
                    </option>
                    {(Object.keys(FACTION_NAMES) as Faction[]).map((faction) => (
                      <option key={faction} value={faction}>
                        {FACTION_NAMES[faction]}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Sua facção define seu avatar padrão. Pode ser alterada depois.
                  </p>
                </div>

                {/* Senha */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      placeholder="Mínimo 6 caracteres"
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

                {/* Confirmar Senha */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      placeholder="Digite a senha novamente"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
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
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </button>
              </form>
            ) : (
              // Sucesso
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 text-xl font-bold text-white">Conta Criada!</h3>
                <p className="mb-4 text-gray-400">
                  Sua conta foi criada com sucesso. Redirecionando para o dashboard...
                </p>
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              </div>
            )}

            {/* Links auxiliares */}
            {!success && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Já tem uma conta?{" "}
                  <Link
                    href="/login"
                    className="text-orange-500 transition-colors hover:text-orange-400"
                  >
                    Entrar
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
