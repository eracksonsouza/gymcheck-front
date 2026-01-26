import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Loader2, User } from "lucide-react";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  name: string;
  email: string;
  isUploading: boolean;
  onAvatarChange: (file: File) => void;
}

export const ProfileAvatar = ({
  avatarUrl,
  name,
  email,
  isUploading,
  onAvatarChange,
}: ProfileAvatarProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        console.error("Arquivos rejeitados:", rejectedFiles);
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        console.log("Arquivo aceito:", file.name, file.type, file.size);
        onAvatarChange(file);
      }
    },
    [onAvatarChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    multiple: false,
    disabled: isUploading,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="flex flex-col items-center mb-8">
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer ${
          isDragActive ? "ring-4 ring-emerald-500" : ""
        }`}
      >
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-emerald-500/30 bg-slate-800">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400">
              <User className="h-16 w-16" />
            </div>
          )}
        </div>

        {/* Upload overlay */}
        <div
          className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity ${
            isUploading
              ? "bg-black/80 opacity-100"
              : isDragActive
                ? "bg-emerald-500/80 opacity-100"
                : "bg-black/60 opacity-0 group-hover:opacity-100"
          } ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          ) : (
            <div className="text-center">
              <Camera className="h-8 w-8 text-white mx-auto mb-1" />
              <span className="text-xs text-white">
                {isDragActive ? "Solte aqui" : "Alterar foto"}
              </span>
            </div>
          )}
        </div>
        <input {...getInputProps()} />
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-white">{name}</h2>
      <p className="text-sm text-slate-400">{email}</p>
    </div>
  );
};
