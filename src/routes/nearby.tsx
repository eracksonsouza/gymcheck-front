import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NearbyGyms from "@/components/nearby/NearbyGyms";

export const Route = createFileRoute("/nearby")({
  component: () => (
    <ProtectedRoute>
      <NearbyGyms />
    </ProtectedRoute>
  ),
});
