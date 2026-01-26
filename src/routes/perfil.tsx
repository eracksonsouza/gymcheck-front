import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ProfilePage from "@/pages/_app/Profile";

export const Route = createFileRoute('/perfil')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
