import { LogOut, Loader2, Save, User, X } from "lucide-react";

interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

export const ProfileActions = ({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  onLogout,
}: ProfileActionsProps) => {
  if (!isEditing) {
    return (
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <User className="h-5 w-5" />
          Editar Perfil
        </button>
        <button
          onClick={onLogout}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-6 py-3 font-semibold text-red-300 hover:bg-red-500/20 hover:border-red-500/60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <LogOut className="h-5 w-5" />
          Sair da Conta
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="h-5 w-5" />
            Salvar Alterações
          </>
        )}
      </button>
      <button
        onClick={onCancel}
        disabled={isSaving}
        className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <X className="h-5 w-5" />
        Cancelar
      </button>
    </div>
  );
};
