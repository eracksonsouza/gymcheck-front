import { useState } from "react";
import { gymsApi, type Gym } from "@/lib/api";

const SearchGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      setError("Digite pelo menos 1 caractere para buscar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { gyms } = await gymsApi.search(query.trim(), 1);
      setGyms(gyms);
    } catch (err: any) {
      console.error("Erro ao buscar academias:", err?.response?.data || err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      const details =
        typeof err.response?.data === "object"
          ? JSON.stringify(err.response.data)
          : err.response?.data;
      setError(serverMessage || "Erro ao carregar academias");
      if (details && !serverMessage?.includes(details)) {
        setError(`${serverMessage} (${details})`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Buscar Academias</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome da academia"
          className="flex-1 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition-colors"
        >
          Buscar
        </button>
      </form>

      {loading && <p className="text-white">Carregando academias...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && gyms.length === 0 && (
        <p className="text-slate-400">Nenhuma academia encontrada.</p>
      )}
      {!loading && !error && gyms.length > 0 && (
        <ul>
          {gyms.map((gym) => (
            <li key={gym.id} className="mb-4 p-4 bg-gray-800 rounded">
              <h2 className="text-xl font-semibold text-white">{gym.title}</h2>
              <p className="text-gray-400">{gym.description}</p>
              <p className="text-gray-400">Telefone: {gym.phone || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchGyms;
