import { createFileRoute } from "@tanstack/react-router";
import SignUpPage from "@/pages/_auth/SignUp";

export const Route = createFileRoute("/cadastro")({
  component: SignUpPage,
});
