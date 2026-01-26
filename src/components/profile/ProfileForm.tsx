import { Mail, MapPin, Phone, User } from "lucide-react";
import type { UpdateProfileRequest } from "@/lib/api";

interface ProfileFormProps {
  formData: UpdateProfileRequest;
  isEditing: boolean;
  onChange: (field: keyof UpdateProfileRequest, value: string) => void;
}

export const ProfileForm = ({
  formData,
  isEditing,
  onChange,
}: ProfileFormProps) => {
  const inputClassName = `w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-colors`;

  return (
    <div className="space-y-6">
      {/* Nome */}
      <div>
        <label className="flex text-sm font-medium text-slate-300 mb-2 items-center gap-2">
          <User className="h-4 w-4 text-emerald-400" />
          Nome completo
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          disabled={!isEditing}
          className={inputClassName}
          placeholder="Seu nome completo"
        />
      </div>

      {/* Email */}
      <div>
        <label className="flex text-sm font-medium text-slate-300 mb-2 items-center gap-2">
          <Mail className="h-4 w-4 text-emerald-400" />
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          disabled={!isEditing}
          className={inputClassName}
          placeholder="seu@email.com"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="flex text-sm font-medium text-slate-300 mb-2 items-center gap-2">
          <Phone className="h-4 w-4 text-emerald-400" />
          Telefone
        </label>
        <input
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          disabled={!isEditing}
          className={inputClassName}
          placeholder="(11) 98765-4321"
        />
      </div>

      {/* Localização */}
      <div>
        <label className="flex text-sm font-medium text-slate-300 mb-2 items-center gap-2">
          <MapPin className="h-4 w-4 text-emerald-400" />
          Localização
        </label>
        <input
          type="text"
          value={formData.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
          disabled={!isEditing}
          className={inputClassName}
          placeholder="Cidade, Estado"
        />
      </div>
    </div>
  );
};
