import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import HeroPage from "@/pages/Hero/Index";
import BenefitsPage from "@/pages/Benefits/Index";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <HeroPage />
      <BenefitsPage />
      <Footer />
    </>
  );
}
