'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Sword, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const { register, isLoading, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Se já estiver logado, redirecionar para dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (formData.nickname.length < 3) {
      setError('O nickname deve ter pelo menos 3 caracteres.');
      return;
    }

    const success = await register(formData.nickname, formData.email, formData.password);
    
    if (success) {
      setSuccess(true);
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      setError('Este nickname já está em uso. Escolha outro.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 max-w-[1440px]">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sword className="w-12 h-12 text-amber-500" />
              <h1 className="text-3xl font-bold text-amber-500">FOR HONOR RANKED</h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Criar Conta</h2>
            <p className="text-gray-400">
              Junte-se à comunidade competitiva de For Honor
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nickname */}
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Seu nickname único"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Mínimo 3 caracteres. Será seu nome de jogador.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email da Ubisoft Connect *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="seu.email@ubisoft.com"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Use o mesmo email da sua conta Ubisoft.
                  </p>
                </div>

                {/* Senha */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12"
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12"
                      placeholder="Digite a senha novamente"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Erro */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 text-sm">{error}</span>
                  </div>
                )}

                {/* Botão de submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </button>
              </form>
            ) : (
              // Sucesso
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Conta Criada!</h3>
                <p className="text-gray-400 mb-4">
                  Sua conta foi criada com sucesso. Redirecionando para o dashboard...
                </p>
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            )}

            {/* Links auxiliares */}
            {!success && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-amber-500 hover:text-amber-400 transition-colors">
                    Entrar
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
