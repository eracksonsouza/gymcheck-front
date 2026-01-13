import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 401 (não autorizado), limpar token e redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Tipos
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

export interface Gym {
  id: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface CheckIn {
  id: string;
  created_at: string;
  validated_at: string | null;
  gym: Gym;
}

export interface CreateGymRequest {
  title: string;
  description?: string;
  phone?: string;
  latitude: number;
  longitude: number;
}

export interface CheckInHistoryResponse {
  checkIns: CheckIn[];
}

export interface NearbyGymsParams {
  latitude: number;
  longitude: number;
}

// Funções de autenticação
export const authApi = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await api.post("/sessions", data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await api.post("/users", data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/me");
    return response.data;
  },
};

// Funções de academias
export const gymsApi = {
  // Listar academias próximas
  getNearby: async (params: NearbyGymsParams): Promise<{ gyms: Gym[] }> => {
    const response = await api.get("/gyms/nearby", { params });
    return response.data;
  },

  // Buscar academia por ID
  getById: async (id: string): Promise<{ gym: Gym }> => {
    const response = await api.get(`/gyms/${id}`);
    return response.data;
  },

  // Buscar academias por nome
  search: async (query: string): Promise<{ gyms: Gym[] }> => {
    const response = await api.get("/gyms/search", { params: { q: query } });
    return response.data;
  },

  // Criar academia (apenas admin)
  create: async (data: CreateGymRequest): Promise<{ gym: Gym }> => {
    const response = await api.post("/gyms", data);
    return response.data;
  },
};

// Funções de check-ins
export const checkInsApi = {
  // Fazer check-in em uma academia
  create: async (gymId: string): Promise<{ checkIn: CheckIn }> => {
    const response = await api.post(`/gyms/${gymId}/check-ins`);
    return response.data;
  },

  // Histórico de check-ins do usuário
  getHistory: async (page = 1): Promise<CheckInHistoryResponse> => {
    const response = await api.get("/check-ins/history", { params: { page } });
    return response.data;
  },

  // Validar check-in (apenas admin)
  validate: async (checkInId: string): Promise<{ checkIn: CheckIn }> => {
    const response = await api.patch(`/check-ins/${checkInId}/validate`);
    return response.data;
  },

  // Listar check-ins pendentes de validação (apenas admin)
  getPending: async (): Promise<{ checkIns: CheckIn[] }> => {
    const response = await api.get("/check-ins/pending");
    return response.data;
  },
};

export default api;
