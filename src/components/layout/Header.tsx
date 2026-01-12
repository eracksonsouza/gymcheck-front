import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { label: "Benefícios", href: "#beneficios" },
    { label: "Como funciona", href: "#como-funciona" },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-white/5 bg-[#0f1116]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="currentColor"
            >
              <path d="M4.5 9h1.75V7.25a1.25 1.25 0 1 1 2.5 0V9h6.5V7.25a1.25 1.25 0 1 1 2.5 0V9h1.75a1.25 1.25 0 1 1 0 2.5H18.25v1.5h1.75a1.25 1.25 0 1 1 0 2.5H18.25v1.75a1.25 1.25 0 1 1-2.5 0V15h-6.5v1.75a1.25 1.25 0 1 1-2.5 0V15H4.5a1.25 1.25 0 1 1 0-2.5h1.75v-1.5H4.5A1.25 1.25 0 1 1 4.5 9Zm5.25 2.5v1.5h4.5v-1.5h-4.5Z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">GymCheck</span>
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
          <Button className="cursor-pointer hidden text-sm font-semibold text-white transition-colors hover:text-emerald-300 sm:block">
            Entrar
          </Button>
          <Button className="cursor-pointer rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-110 hover:shadow-emerald-500/35">
            Registre-se
          </Button>
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
              <button className="text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300">
                Entrar
              </button>
              <button className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110">
                Registre-se
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
