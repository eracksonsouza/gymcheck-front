import { useState, useEffect } from "react";
import {
  authApi,
  type UserProfile,
  type UpdateProfileRequest,
} from "@/lib/api";

interface UseProfileReturn {
  profile: UserProfile | null;
  formData: UpdateProfileRequest;
  isEditing: boolean;
  loading: boolean;
  saving: boolean;
  uploadingAvatar: boolean;
  error: string | null;
  success: string | null;
  setIsEditing: (value: boolean) => void;
  handleInputChange: (field: keyof UpdateProfileRequest, value: string) => void;
  handleAvatarUpload: (file: File) => Promise<void>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  loadProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await authApi.getProfile();
      setProfile(profileData);
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
      });
    } catch (err: any) {
      console.error("Erro ao carregar perfil:", err);
      setError("Não foi possível carregar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    console.log("Iniciando upload do avatar:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    setUploadingAvatar(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Chamando API para upload...");
      const { avatarUrl } = await authApi.uploadAvatar(file);
      console.log("Upload bem-sucedido, avatarUrl:", avatarUrl);
      setProfile((prev) => (prev ? { ...prev, avatarUrl } : null));
      setSuccess("Foto de perfil atualizada com sucesso!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Erro detalhado ao fazer upload da foto:", {
        error: err,
        response: err.response,
        data: err.response?.data,
        status: err.response?.status,
        message: err.message,
      });
      const apiMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null);
      setError(apiMessage || "Erro ao fazer upload da foto.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleInputChange = (
    field: keyof UpdateProfileRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { user: updatedUser } = await authApi.updateProfile(formData);
      setProfile(updatedUser);
      setIsEditing(false);
      setSuccess("Perfil atualizado com sucesso!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err.response?.data?.message || "Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    }
  };

  return {
    profile,
    formData,
    isEditing,
    loading,
    saving,
    uploadingAvatar,
    error,
    success,
    setIsEditing,
    handleInputChange,
    handleAvatarUpload,
    handleSave,
    handleCancel,
    loadProfile,
  };
};
