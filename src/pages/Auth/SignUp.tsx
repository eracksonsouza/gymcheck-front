import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0f15] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para home
          </Link>

          <h2 className="text-3xl font-bold text-white">Criar conta</h2>
          <p className="mt-2 text-slate-400">
            Comece sua jornada fitness hoje mesmo
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Nome completo
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-[#1a1d29] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#f97316] focus:ring-[#f97316]"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-[#1a1d29] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#f97316] focus:ring-[#f97316]"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-[#1a1d29] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#f97316] focus:ring-[#f97316]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirmar senha
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full bg-[#1a1d29] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#f97316] focus:ring-[#f97316]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] px-6 py-3 text-base font-semibold text-white shadow-[0_15px_40px_-12px_rgba(249,115,22,0.55)] transition hover:scale-[1.02] hover:shadow-[0_18px_45px_-10px_rgba(249,115,22,0.6)]"
          >
            Criar conta
          </Button>

          <div className="text-center text-sm text-slate-400">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-[#f97316] hover:text-[#fb923c] transition-colors"
            >
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
