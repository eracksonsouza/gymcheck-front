import logoCheckGym from '@/assets/logo-checkgym.png';
import { Link } from '@tanstack/react-router';

const Logo = () => {
    return ( 
        <div className="flex items-center gap-2">
            <Link to="/" className="h-20 w-20 rounded-full flex items-center justify-center shadow-lg">
                <img src={logoCheckGym} alt="GymCheck Logo" />
            </Link>
            <span className="text-xl font-bold text-white">GymCheck</span>
        </div>
     );
}
 
export default Logo;