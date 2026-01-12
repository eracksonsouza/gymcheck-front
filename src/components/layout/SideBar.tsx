import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Home,
  MapPin,
  Search,
  History,
  UserRound,
  Dumbbell,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", icon: Home, active: false },
  { label: "Próximas", icon: MapPin, active: false },
  { label: "Buscar", icon: Search, active: true },
  { label: "Histórico", icon: History, active: false },
  { label: "Perfil", icon: UserRound, active: false },
];

const ToggleSidebarButton = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed left-4 top-4 z-30 h-10 w-10 rounded-xl border border-white/10 bg-black/30 text-white backdrop-blur hover:bg-white/10 md:hidden"
      onClick={toggleSidebar}
    >
      {state === "expanded" ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );
};

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-[#0f1116] text-white">
        <Sidebar
          className="border-r border-white/5 bg-[#0f1116] text-slate-200"
          collapsible="offcanvas"
        >
          <SidebarHeader className="px-4 py-5">
            <div className="flex items-center gap-3 rounded-2xl bg-[#111621] p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">GymCheck</span>
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map(({ label, icon: Icon, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        className={cn(
                          "rounded-2xl px-3 py-2 font-medium",
                          active &&
                            "bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white"
                        )}
                        isActive={active}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-3 pb-4">
            <div className="rounded-2xl bg-[#111621] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400">
                  <UserRound className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">João Silva</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-emerald-200">
                    <span className="rounded-full bg-emerald-600/20 px-2 py-0.5">
                      Membro
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-slate-300 hover:bg-white/5"
                >
                  <UserRound className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-[#0f1116] flex-1 relative">
          <ToggleSidebarButton />
          <div className="min-h-screen">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SideBar;
