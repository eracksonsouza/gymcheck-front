import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { label: "Benefícios", href: "#beneficios" },
    { label: "Como funciona", href: "#como-funciona" },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-white/5 bg-[#0f1116]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-10 text-sm text-slate-400">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-2 py-1 transition-colors hover:bg-white/5 hover:text-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button className="cursor-pointer hidden text-sm font-semibold text-white transition-colors hover:text-emerald-300 sm:block">
                  Dashboard
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  Olá, {user?.name?.split(" ")[0]}
                </span>
                <Button
                  onClick={logout}
                  className="cursor-pointer rounded-full bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition"
                >
                  Sair
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="cursor-pointer hidden text-sm font-semibold text-white transition-colors hover:text-emerald-300 sm:block">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="cursor-pointer rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-110 hover:shadow-emerald-500/35">
                  Registre-se
                </Button>
              </Link>
            </>
          )}
          <Button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition hover:border-white/20 hover:bg-white/5 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-b border-white/5 bg-[#0f1116]/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 pb-4 pt-2 text-sm text-slate-200">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 px-3 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300">
                  Entrar
                </button>
              </Link>
              <Link
                to="/cadastro"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                <button className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110">
                  Registre-se
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
