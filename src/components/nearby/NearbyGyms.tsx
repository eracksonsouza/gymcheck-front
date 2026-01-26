import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";
import { BadgeCheck, Clock3, Loader2, MapPin, Route, Star } from "lucide-react";
import { gymsApi, type Gym } from "@/lib/api";

type GymStatus = "ABERTO" | "FECHADO";
type FilterState = "all" | "open" | "closed" | "empty" | "loading";
type GeoStatus = "idle" | "loading" | "granted" | "denied" | "error";

type NearbyGym = Gym & {
  name?: string;
  address?: string;
  rating?: number;
  status?: GymStatus;
  openHours?: string;
};

const DEFAULT_CENTER: LatLngExpression = [-23.561684, -46.655981];
const MAX_DISTANCE_METERS = 5000;

// Ícone do usuário destacado em verde
const createUserIcon = () =>
  L.divIcon({
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    html: `
      <div class="relative grid place-items-center">
        <div class="h-8 w-8 rounded-full bg-emerald-400 shadow-[0_0_0_10px_rgba(16,185,129,0.12)]"></div>
        <div class="absolute -bottom-2 h-2 w-2 rounded-full bg-emerald-200 animate-ping"></div>
      </div>
    `,
  });

// Ícone das academias com cor baseada no status
const createGymIcon = (status?: GymStatus) =>
  L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `
      <div class="grid place-items-center h-7 w-7 rounded-full ${
        status === "ABERTO"
          ? "bg-emerald-500/90 shadow-[0_0_0_8px_rgba(16,185,129,0.12)]"
          : status === "FECHADO"
            ? "bg-red-500/90 shadow-[0_0_0_8px_rgba(248,113,113,0.12)]"
            : "bg-slate-400/80 shadow-[0_0_0_8px_rgba(148,163,184,0.12)]"
      }">
        <span class="text-sm text-white font-semibold">⬤</span>
      </div>
    `,
  });

const formatDistance = (distance?: number) => {
  if (!distance && distance !== 0) return "—";
  if (distance < 1000) return `${Math.round(distance)}m`;
  return `${(distance / 1000).toFixed(1)} km`;
};

const formatHours = (hours?: string) => hours || "Horário não informado";

const statusLabel = (status?: GymStatus) => {
  if (!status) return "Sem status";
  return status === "ABERTO" ? "Aberto" : "Fechado";
};

// Ajusta a câmera do mapa quando a posição do usuário chega
const FlyToUser = ({ position }: { position?: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 0.9 });
    }
  }, [map, position]);

  return null;
};

const NearbyGyms = () => {
  const [gyms, setGyms] = useState<NearbyGym[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<FilterState>("all");

  const userIcon = useMemo(createUserIcon, []);

  // Busca geolocalização do usuário
  useEffect(() => {
    setGeoStatus("loading");

    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador.");
      setGeoStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        setGeoStatus("granted");
      },
      (err) => {
        console.error("Erro na geolocalização", err);
        setGeoStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Permita a localização para ver academias próximas."
            : "Não foi possível obter sua localização.",
        );
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, []);

  // Busca academias próximas
  const fetchNearbyGyms = useCallback(async (pageToLoad = 1) => {
    if (!userPosition) return;

    setLoading(true);
    setError(null);
    try {
      const { gyms: responseGyms } = await gymsApi.getNearby({
        latitude: (userPosition as [number, number])[0],
        longitude: (userPosition as [number, number])[1],
        page: pageToLoad,
      });

      const mappedGyms: NearbyGym[] = responseGyms.map((gym) => ({
        ...gym,
        name: gym.name || gym.title,
        address:
          gym.address ||
          gym.description ||
          "Endereço não disponível no momento",
        rating:
          typeof gym.rating === "number"
            ? gym.rating
            : Math.max(3.5, Math.random() * 1.5 + 3.5),
        status: (gym.status as GymStatus) || "ABERTO",
        openHours: gym.openHours || "06h - 23h",
      }));

      setGyms((prev) =>
        pageToLoad === 1 ? mappedGyms : [...prev, ...mappedGyms],
      );
      setPage(pageToLoad);
    } catch (error: unknown) {
      console.error("Erro ao buscar academias próximas:", error);

      let serverMessage: string | undefined;

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object"
      ) {
        const responseData = (error as {
          response?: { data?: Record<string, unknown> };
        }).response?.data;

        if (responseData && typeof responseData === "object") {
          const message = responseData.message;
          const errorText = responseData.error;

          if (typeof message === "string" || typeof errorText === "string") {
            serverMessage = (message as string) || (errorText as string);
          }
        }
      }

      if (!serverMessage && error instanceof Error) {
        serverMessage = error.message;
      }

      setError(serverMessage || "Erro ao carregar academias próximas.");
    } finally {
      setLoading(false);
    }
  }, [userPosition]);

  useEffect(() => {
    if (userPosition && activeFilter !== "loading") {
      fetchNearbyGyms(1);
    }
  }, [userPosition, activeFilter, fetchNearbyGyms]);

  const filteredGyms = useMemo(() => {
    if (activeFilter === "empty") return [];

    if (activeFilter === "open") {
      return gyms.filter(
        (gym) =>
          gym.status === "ABERTO" &&
          typeof gym.distance === "number" &&
          gym.distance <= MAX_DISTANCE_METERS,
      );
    }
    if (activeFilter === "closed") {
      return gyms.filter(
        (gym) =>
          gym.status === "FECHADO" &&
          typeof gym.distance === "number" &&
          gym.distance <= MAX_DISTANCE_METERS,
      );
    }
    return gyms.filter(
      (gym) =>
        typeof gym.distance === "number" &&
        gym.distance <= MAX_DISTANCE_METERS,
    );
  }, [activeFilter, gyms]);

  const displayGyms =
    activeFilter === "loading" ? [] : (filteredGyms as NearbyGym[]);

  const handleFilterChange = (filter: FilterState) => {
    setActiveFilter(filter);
    if (filter === "loading") {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f16] text-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:py-10">
        {/* Cabeçalho */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Explorar
            </p>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Academias próximas de você
            </h1>
            <p className="text-sm text-slate-400">
              Baseado na sua localização atual e em tempo real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "open", label: "aberto" },
              { key: "closed", label: "fechado" },
              { key: "empty", label: "empty" },
              { key: "loading", label: "loading" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key as FilterState)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 ${
                  activeFilter === filter.key
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_10px_40px_-16px_rgba(16,185,129,0.6)]"
                    : "border-emerald-500/30 text-emerald-200/80 hover:border-emerald-500/60 hover:text-emerald-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.95fr]">
          {/* Bloco do mapa */}
          <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-emerald-900/40 bg-gradient-to-br from-[#0d111a] via-[#0d111a] to-[#0b0e17]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <MapContainer
              center={userPosition || DEFAULT_CENTER}
              zoom={userPosition ? 14 : 13}
              className="relative z-10 h-full w-full"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FlyToUser position={userPosition || undefined} />

              {userPosition && (
                <Marker position={userPosition} icon={userIcon}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold text-emerald-600">
                        Você está aqui
                      </p>
                      <p className="text-slate-600">
                        Lat: {(userPosition as [number, number])[0].toFixed(4)}{" "}
                        | Lng: {(userPosition as [number, number])[1].toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {displayGyms.map((gym) => (
                <Marker
                  key={gym.id}
                  position={[gym.latitude, gym.longitude]}
                  icon={createGymIcon(gym.status as GymStatus)}
                >
                  <Popup>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-slate-900">
                        {gym.name || gym.title}
                      </p>
                      <p className="text-slate-700">{gym.address}</p>
                      <p className="text-emerald-700 font-semibold">
                        {formatDistance(gym.distance)}
                      </p>
                      <p className="text-slate-700">{statusLabel(gym.status)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Overlay de status da geolocalização */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex flex-wrap gap-2">
              {[
                { key: "granted", label: "granted", active: geoStatus === "granted" },
                { key: "loading", label: "loading", active: geoStatus === "loading" },
                { key: "denied", label: "denied", active: geoStatus === "denied" },
                { key: "empty", label: "empty", active: activeFilter === "empty" },
              ].map((item) => (
                <span
                  key={item.key}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    item.active
                      ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-200"
                      : "border-slate-600/60 text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {(loading || geoStatus === "loading") && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 rounded-full border border-emerald-500/40 bg-[#0d111a]/80 px-4 py-2 text-sm text-emerald-200 shadow-lg shadow-emerald-500/10">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Atualizando academias próximas...
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="relative flex h-full max-h-[calc(100vh-180px)] flex-col gap-3 overflow-hidden rounded-2xl border border-emerald-900/40 bg-gradient-to-b from-[#0f131b] via-[#101521] to-[#0b0e17] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                  Lista
                </p>
                <h2 className="text-xl font-semibold text-white">
                  Academias encontradas
                </h2>
              </div>
              <button
                onClick={() => fetchNearbyGyms(page + 1)}
                className="rounded-full border border-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:border-emerald-500/60 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
              >
                Carregar mais
              </button>
            </div>

            <div className="custom-scrollbar -mr-2 flex-1 space-y-3 overflow-y-auto pr-2">
              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {(loading || activeFilter === "loading") &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="animate-pulse rounded-2xl border border-emerald-900/30 bg-slate-900/40 p-4"
                  >
                    <div className="mb-4 h-3 w-24 rounded-full bg-slate-700/60" />
                    <div className="mb-2 h-5 w-48 rounded bg-slate-700/60" />
                    <div className="mb-3 h-3 w-56 rounded bg-slate-800/60" />
                    <div className="h-3 w-28 rounded bg-slate-800/60" />
                  </div>
                ))}

              {!loading && displayGyms.length === 0 && !error && (
                <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/40 p-6 text-center">
                  <p className="text-lg font-semibold text-slate-200">
                    Nenhuma academia por aqui
                  </p>
                  <p className="text-sm text-slate-400">
                    Tente alterar os filtros ou verificar sua localização.
                  </p>
                </div>
              )}

              {!loading &&
                displayGyms.map((gym, index) => (
                  <div
                    key={gym.id}
                    className={`relative overflow-hidden rounded-2xl border ${
                      index === 0 ? "border-emerald-500/60" : "border-slate-800"
                    } bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      {index === 0 ? (
                        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                          Perto de você
                        </span>
                      ) : (
                        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                          Destaque
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          gym.status === "ABERTO"
                            ? "bg-emerald-500/10 text-emerald-200"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {statusLabel(gym.status)}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800/80 text-emerald-300">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">
                            {gym.name || gym.title}
                          </h3>
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="h-4 w-4 fill-amber-400" />
                            <span className="text-sm font-semibold">
                              {(gym.rating || 4.5).toFixed(1)}
                            </span>
                          </span>
                        </div>
                        <p className="flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          {gym.address}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                          <span className="flex items-center gap-1 text-emerald-300">
                            <Route className="h-4 w-4" />
                            {formatDistance(gym.distance)}
                          </span>
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock3 className="h-4 w-4" />
                            {formatHours(gym.openHours)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </aside>
        </div>

        {/* Sugestões futuras */}
        <div className="mt-2 grid gap-4 rounded-2xl border border-emerald-900/40 bg-slate-900/40 p-4 sm:grid-cols-3">
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-400" />
            <div>
              <p className="font-semibold text-white">Traçar rota</p>
              <p>Mostrar rota até a academia com tempo estimado.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-400" />
            <div>
              <p className="font-semibold text-white">Ordenar por distância</p>
              <p>Permitir ordenar por proximidade ou avaliação.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-400" />
            <div>
              <p className="font-semibold text-white">Favoritos</p>
              <p>Salvar academias favoritas e receber alertas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyGyms;
