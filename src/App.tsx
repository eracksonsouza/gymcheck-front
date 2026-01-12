

import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import BenefitsPage from "./pages/Benefits/Index";
import HeroPage from "./pages/Hero/Index";

function App() {
  return (
    <SideBar>
      <div className="min-h-screen bg-[#0f1116] text-white">
        <Header />
        <HeroPage />
        <BenefitsPage />
      </div>
    </SideBar>
  );
}

export default App
