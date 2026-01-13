import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

const MetricCard = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconColor = "text-emerald-400",
  iconBgColor = "bg-emerald-500/10",
}: MetricCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#12151a] p-5 transition-all duration-300 hover:border-white/10 hover:bg-[#14171c]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-400">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
                trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            iconBgColor
          )}
        >
          <Icon className={cn("h-5 w-5 md:h-6 md:w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
