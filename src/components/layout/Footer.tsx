import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-4 border-white/10 bg-[#0f1116]/95 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col md:flex-row md:justify-between w-full items-center gap-2 md:gap-0 md:h-[10vh]">
          <Logo />
          <p className="text-sm text-white">
            © 2025 GymCheck. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
