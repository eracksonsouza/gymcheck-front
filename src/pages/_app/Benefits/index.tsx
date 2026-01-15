import checkEasyIcon from '@/assets/checkeasy-icon.png';
import anyWhereIcon from '@/assets/gymeverywhere.png';
import progressIcon from '@/assets/progress-icon.png';

const benefits = [
  {
    icon: checkEasyIcon,
    title: "Academias por todo lugar",
    description: "Acesse milhares de academias parceiras próximas de você.",
  },
  {
    icon: anyWhereIcon,
    title: "Check-in fácil",
    description:
      "Chegue, faça check-in pelo app e comece a treinar em segundos.",
  },
  {
    icon: progressIcon,
    title: "Acompanhe seu progresso",
    description: "Monitore seus treinos e conquistas em um só lugar.",
  },
];

const BenefitsPage = () => {
  return (
    <section className="bg-[#0d0f15] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Por que escolher o GymCheck?
          </h2>
          <p className="text-slate-400">
            Simplicidade e liberdade para você treinar em qualquer lugar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl bg-[#12141c] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition hover:-translate-y-1 hover:ring-emerald-400/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 text-emerald-300 shadow-inner shadow-emerald-500/20">
                <img src={icon} alt={title} className="h-12 w-12" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsPage;
