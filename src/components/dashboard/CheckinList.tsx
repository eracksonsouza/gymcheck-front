import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export interface Checkin {
  id: string;
  gymName: string;
  address: string;
  date: string;
  time: string;
  status: "VALIDADO" | "PENDENTE";
}

interface CheckinListProps {
  checkins: Checkin[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

const statusStyles = {
  VALIDADO: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  PENDENTE: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
  },
};

const CheckinList = ({
  checkins,
  title = "Últimos check-ins",
  showViewAll = true,
  viewAllHref = "/historico",
}: CheckinListProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-white">
          {title}
        </h3>
        {showViewAll && (
          <Link
            to={viewAllHref}
            className="group inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
          >
            Ver todos
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Checkin Items */}
      <div className="space-y-3">
        {checkins.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#12151a] p-8 text-center">
            <p className="text-sm text-slate-500">
              Nenhum check-in realizado ainda.
            </p>
          </div>
        ) : (
          checkins.map((checkin) => (
            <div
              key={checkin.id}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#12151a] p-4 transition-all duration-200 hover:border-white/10 hover:bg-[#14171c]"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-white truncate">
                      {checkin.gymName}
                    </h4>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        statusStyles[checkin.status].bg,
                        statusStyles[checkin.status].text,
                        statusStyles[checkin.status].border
                      )}
                    >
                      {checkin.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-400 truncate">
                    {checkin.address}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {checkin.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {checkin.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckinList;
