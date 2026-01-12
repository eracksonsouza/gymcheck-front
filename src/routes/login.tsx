import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/pages/_auth/SignIn";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
