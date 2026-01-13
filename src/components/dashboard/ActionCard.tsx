import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

const ActionCard = ({
  title,
  description,
  buttonText,
  buttonHref = "/buscar",
  onButtonClick,
}: ActionCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-5 md:p-6 lg:p-8 shadow-xl shadow-emerald-500/10">
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5">
            {title}
          </h2>
          <p className="text-emerald-50/90 text-sm md:text-base max-w-md">
            {description}
          </p>
        </div>

        {buttonHref && !onButtonClick ? (
          <Link
            to={buttonHref}
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-5 py-3 font-semibold text-emerald-600 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:shadow-xl active:scale-[0.98]"
          >
            <MapPin className="h-5 w-5" />
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button
            onClick={onButtonClick}
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-5 py-3 font-semibold text-emerald-600 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:shadow-xl active:scale-[0.98]"
          >
            <MapPin className="h-5 w-5" />
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
