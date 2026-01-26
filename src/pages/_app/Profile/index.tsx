import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import {
  AlertMessage,
  ProfileAvatar,
  ProfileForm,
  ProfileActions,
} from "@/components/profile";

const ProfilePage = () => {
  const { logout } = useAuth();
  const {
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
  } = useProfile();

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair da sua conta?")) {
      logout();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-emerald-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando perfil...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">Erro ao carregar perfil.</p>
          <button
            onClick={loadProfile}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1116] text-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-slate-400">Gerencie suas informações pessoais</p>
        </div>

        {/* Mensagens de feedback */}
        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}

        {/* Card principal */}
        <div className="rounded-2xl border border-emerald-900/40 bg-gradient-to-br from-[#0d111a] via-[#0d111a] to-[#0b0e17] p-6 md:p-8 shadow-xl">
          {/* Avatar Section */}
          <ProfileAvatar
            avatarUrl={profile.avatarUrl}
            name={profile.name}
            email={profile.email}
            isUploading={uploadingAvatar}
            onAvatarChange={handleAvatarUpload}
          />

          {/* Form Section */}
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onChange={handleInputChange}
          />

          {/* Action Buttons */}
          <ProfileActions
            isEditing={isEditing}
            isSaving={saving}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
            onLogout={handleLogout}
          />
        </div>

        {/* Info adicional */}
        {profile.created_at && (
          <div className="mt-6 text-center text-sm text-slate-500">
            Membro desde{" "}
            {new Date(profile.created_at).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
