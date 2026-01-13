import { Link, useNavigate } from "@tanstack/react-router";
import LoginForm from "@/components/LoginForm";
import Logo from "@/components/layout/Logo";
import type { SignInFormData } from "@/lib/validations/auth";
import loginImage from "@/assets/login-image.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SignInFormData) => {
    try {
      setError(null);
      await signIn(data);
      // Redirecionar para o dashboard após login bem-sucedido
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      const message =
        error.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f15] flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6">
        <Logo />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-16 left-16 max-w-md">
              <h1 className="text-5xl font-bold text-white leading-tight mb-4">
                Treine sua mente
                <br />e seu corpo.
              </h1>
              <p className="text-slate-300 text-lg">
                Acesse milhares de academias com um único plano e acompanhe seu
                progresso.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Acesse sua conta
              </h2>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <LoginForm onSubmit={handleSubmit} />

            <div className="text-center">
              <p className="text-slate-400 text-sm mb-4">
                Ainda não tem acesso?
              </p>
              <Link to="/cadastro">
                <button className="w-full py-3 border-2 border-emerald-500 text-emerald-500 font-medium rounded-lg hover:bg-emerald-500/10 transition-colors">
                  Criar conta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
