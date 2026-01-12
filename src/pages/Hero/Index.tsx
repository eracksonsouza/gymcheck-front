import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const heroBg = new URL("../../assets/gyms-hero-page.jpg", import.meta.url).href;

const HeroPage = () => {
  const phrases = [
    "quiser.",
    "Faça check-in na palma da sua mão.",
    "Várias academias disponíveis.",
    "Planos exclusivos.",
    "Suporte diferenciado.",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[phraseIndex];
    const pauseAtEnd = 1200;
    const isComplete = displayText === fullText && !isDeleting;
    const delay = isComplete ? pauseAtEnd : isDeleting ? 45 : 95;

    const timer = window.setTimeout(() => {
      if (!isDeleting && displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
        return;
      }

      if (!isDeleting && displayText.length === fullText.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayText.length > 0) {
        setDisplayText(fullText.slice(0, displayText.length - 1));
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return (
    <section className="relative isolate overflow-hidden bg-[#0d0f15] text-white min-h-[80vh] md:min-h-screen flex items-center">
      <div className="absolute inset-0 h-[100vh] w-full">
        <img
          src={heroBg}
          alt="Academia moderna com equipamentos e iluminação premium"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f15] via-[#0d0f15]/85 to-[#0d0f15]/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-8">
          <span className="inline-flex rounded-full bg-[#47230f]/80 px-4 py-2 text-sm font-semibold text-amber-200 shadow-lg shadow-amber-900/30 ring-1 ring-white/10">
            Sua academia em qualquer lugar
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-[1.05]">
              Gym Check{" "}
              <span className="relative inline-flex min-w-[14ch] items-center bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                {displayText}
                <span
                  aria-hidden
                  className="ml-1 h-6 w-[2px] bg-white/80 animate-pulse"
                />
              </span>
            </h1>
            <p className="text-lg text-slate-300 sm:text-xl transition-opacity duration-500">
              Acesse milhares de academias parceiras com um único plano. Faça
              check-in e comece a treinar em segundos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/cadastro">
              <Button className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] px-6 py-3 text-base font-semibold text-white shadow-[0_15px_40px_-12px_rgba(249,115,22,0.55)] transition hover:scale-[1.01] hover:shadow-[0_18px_45px_-10px_rgba(249,115,22,0.6)]">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button className="inline-flex items-center justify-center rounded-xl border border-[#f97316] px-6 py-3 text-base font-semibold text-[#f97316] transition hover:border-[#fb923c] hover:text-[#fb923c] hover:shadow-[0_10px_30px_-18px_rgba(249,115,22,0.65)]">
                Fazer login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
