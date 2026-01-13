interface DashboardHeaderProps {
  userName: string;
  greeting?: string;
}

const DashboardHeader = ({
  userName,
  greeting = "Pronto para mais um treino?",
}: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "Usuário";

  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
        Olá, {firstName}! 💪
      </h1>
      <p className="text-slate-400 text-sm md:text-base">{greeting}</p>
    </div>
  );
};

export default DashboardHeader;
