import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  authApi,
  type AuthResponse,
  type SignInRequest,
  type SignUpRequest,
} from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const fetchProfile = async () => {
    const profile = await authApi.getProfile();
    const profileData = (profile as { user?: User }).user || profile;
    saveUser(profileData);
    return profileData;
  };

  // Ao iniciar, verificar se existe token salvo e buscar perfil
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          saveUser(userData);
        }

        await fetchProfile();
      } catch (error) {
        console.error("Erro ao carregar usuário do storage ou perfil:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    void loadUserFromStorage();
  }, []);

  const signIn = async (data: SignInRequest) => {
    try {
      const response: AuthResponse = await authApi.signIn(data);

      // Salvar token e dados do usuário
      localStorage.setItem("token", response.token);

      if (response.user) {
        saveUser(response.user);
      } else {
        await fetchProfile();
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const signUp = async (data: SignUpRequest) => {
    try {
      const response: AuthResponse = await authApi.signUp(data);

      // Salvar token e dados do usuário
      localStorage.setItem("token", response.token);

      if (response.user) {
        saveUser(response.user);
      } else {
        await fetchProfile();
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, signIn, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
