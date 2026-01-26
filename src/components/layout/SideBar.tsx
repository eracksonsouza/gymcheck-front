import React, { useState } from "react";
import {
  Home,
  MapPin,
  Search,
  History,
  UserRound,
  Dumbbell,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Início", icon: Home, href: "/dashboard" },
  { label: "Nearby", icon: MapPin, href: "/nearby" },
  { label: "Buscar", icon: Search, href: "/buscar" },
  { label: "Histórico", icon: History, href: "/historico" },
  { label: "Perfil", icon: UserRound, href: "/perfil" },
];

interface SideBarProps {
  children: React.ReactNode;
  activeItem?: string;
}

const SideBar = ({ children, activeItem = "Início" }: SideBarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen bg-[#0f1116]">
        {/* SIDEBAR DESKTOP */}
        <aside
          className={cn(
            "hidden md:flex flex-col h-screen sticky top-0 bg-zinc-900 border-r border-white/5 transition-all duration-300",
            isCollapsed ? "w-16" : "w-64",
          )}
        >
          <div className="flex items-center justify-between h-16 px-3 shrink-0">
            <div
              className={cn(
                "flex items-center gap-3",
                isCollapsed && "justify-center w-full",
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-bold text-white">GymCheck</span>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <PanelLeftClose className="h-5 w-5" />
              </button>
            )}
          </div>

          {isCollapsed && (
            <div className="px-2 pb-2">
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-full p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex justify-center"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="mx-3 h-px bg-white/5" />

          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  activeItem === item.label || isActiveRoute(item.href);
                const linkElement = (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-all duration-200",
                      isActive
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                );
                if (isCollapsed) {
                  return (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <li>{linkElement}</li>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-zinc-800 text-white border-zinc-700"
                      >
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
                return <li key={item.label}>{linkElement}</li>;
              })}
            </ul>
          </nav>

          <div className="mt-auto p-3 border-t border-white/5 shrink-0">
            <div
              className={cn(
                "rounded-xl bg-zinc-800/50 p-3",
                isCollapsed && "p-2",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  isCollapsed && "flex-col gap-2",
                )}
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-400/20 to-emerald-600/20 ring-2 ring-emerald-500/20">
                  <UserRound className="h-5 w-5 text-emerald-400" />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-500" />
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {user?.name || "Usuário"}
                      </p>
                      <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {user?.role === "ADMIN" ? "ADMIN" : "MEMBRO"}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Sair"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </>
                )}
                {isCollapsed && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={logout}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-zinc-800 text-white border-zinc-700"
                    >
                      Sair
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE OVERLAY */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* SIDEBAR MOBILE */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-zinc-900 border-r border-white/5 transition-transform duration-300 md:hidden",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between h-16 px-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">GymCheck</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-4 h-px bg-white/5" />
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  activeItem === item.label || isActiveRoute(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition-all",
                        isActive
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                          : "text-slate-400 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-white/5 shrink-0">
            <div className="rounded-xl bg-zinc-800/50 p-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-400/20 to-emerald-600/20 ring-2 ring-emerald-500/20">
                  <UserRound className="h-5 w-5 text-emerald-400" />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || "Usuário"}
                  </p>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {user?.role === "ADMIN" ? "ADMIN" : "MEMBRO"}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex items-center gap-4 h-14 px-4 bg-[#0f1116]/95 border-b border-white/5 backdrop-blur-md md:hidden shrink-0">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-white hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-emerald-500" />
              <span className="font-bold text-white">GymCheck</span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SideBar;
