import { useAuth } from "@/contexts/AuthContext";
import {
  DashboardHeader,
  ActionCard,
  MetricCard,
  CheckinList,
  type Checkin,
} from "@/components/dashboard";
import { TrendingUp, Flame, Trophy } from "lucide-react";

// Dados mockados para demonstração
const mockCheckins: Checkin[] = [
  {
    id: "1",
    gymName: "Smart Fit - Paulista",
    address: "Av. Paulista, 1000",
    date: "Hoje",
    time: "08:30",
    status: "VALIDADO",
  },
  {
    id: "2",
    gymName: "Bio Ritmo - Jardins",
    address: "R. Oscar Freire, 500",
    date: "Ontem",
    time: "19:15",
    status: "VALIDADO",
  },
  {
    id: "3",
    gymName: "Smart Fit - Paulista",
    address: "Av. Paulista, 1000",
    date: "10/01",
    time: "07:45",
    status: "PENDENTE",
  },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f1116] p-4 md:p-6 lg:p-8">
      {/* Header de boas-vindas */}
      <DashboardHeader userName={user?.name || "Usuário"} />

      {/* Card de ação principal - Encontrar academia próxima */}
      <ActionCard
        title="Encontrar academia próxima"
        description="Veja as academias mais perto de você e faça check-in"
        buttonText="Ver academias"
        buttonHref="/buscar"
      />

      {/* Grid de Métricas */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Check-ins este mês"
          value="12"
          subtitle="3 academias diferentes"
          trend={{ value: "20% este mês", isPositive: true }}
          icon={TrendingUp}
          iconColor="text-emerald-400"
          iconBgColor="bg-emerald-500/10"
        />

        <MetricCard
          title="Sequência atual"
          value="5 dias"
          subtitle="Recorde: 12 dias"
          icon={Flame}
          iconColor="text-orange-400"
          iconBgColor="bg-orange-500/10"
        />

        <MetricCard
          title="Conquistas"
          value="3"
          subtitle="Nova conquista disponível!"
          icon={Trophy}
          iconColor="text-amber-400"
          iconBgColor="bg-amber-500/10"
        />
      </div>

      {/* Lista de últimos check-ins */}
      <div className="mt-6 md:mt-8">
        <CheckinList
          checkins={mockCheckins}
          title="Últimos check-ins"
          showViewAll
          viewAllHref="/historico"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
