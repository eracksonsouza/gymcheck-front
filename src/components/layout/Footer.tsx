import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0f1116]/95 backdrop-blur-md">
      <div className="flex justify-between w-full">
        <div className="flex justify-between w-full h-[10vh] items-center">
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
