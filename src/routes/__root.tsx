import { createRootRoute, Outlet } from "@tanstack/react-router";
import SideBar from "@/components/layout/SideBar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const RootComponent = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
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
