import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * Componente para proteger rotas que precisam de autenticação
 *
 * Uso:
 * ```tsx
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 * ```
 *
 * Para rotas admin:
 * ```tsx
 * <ProtectedRoute requireAdmin>
 *   <AdminPage />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Enquanto carrega o estado de autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0f15] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  // Se não está autenticado, mostra loading enquanto redireciona
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f15] flex items-center justify-center">
        <div className="text-white text-lg">Redirecionando...</div>
      </div>
    );
  }

  // Se requer admin mas o usuário não é admin
  if (requireAdmin && user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#0d0f15] flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Você não tem permissão para acessar esta página.
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
