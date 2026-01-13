import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import HeroPage from "@/pages/_app/Hero";
import BenefitsPage from "@/pages/_app/Benefits";
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
