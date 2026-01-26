import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import SideBar from "@/components/layout/SideBar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const RootComponent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Rotas públicas que não devem mostrar sidebar
  const publicRoutes = ["/", "/login", "/cadastro"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Mostrar sidebar apenas se estiver autenticado E não for rota pública
  const shouldShowSidebar = isAuthenticated && !isPublicRoute;

  return shouldShowSidebar ? (
    <SideBar>
      <Outlet />
    </SideBar>
  ) : (
    <Outlet />
  );
};

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
  ),
});
