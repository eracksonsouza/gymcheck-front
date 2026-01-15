import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SearchGyms from "@/components/gymList/SearchGyms";

export const Route = createFileRoute("/buscar")({
  component: () => (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0f1116] p-4 md:p-6 lg:p-8">
        <SearchGyms />
      </div>
    </ProtectedRoute>
  ),
});
