import { createFileRoute } from "@tanstack/react-router";
import SignUpPage from "@/pages/Auth/SignUp";

export const Route = createFileRoute("/cadastro")({
  component: SignUpPage,
});
