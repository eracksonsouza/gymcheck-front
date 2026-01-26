# Profile Components

Componentes reutilizáveis para a página de perfil do usuário.

## Estrutura

```
profile/
├── AlertMessage.tsx       # Mensagens de erro/sucesso
├── ProfileAvatar.tsx      # Avatar com upload
├── ProfileForm.tsx        # Formulário de dados do usuário
├── ProfileActions.tsx     # Botões de ação
└── index.ts              # Exports centralizados
```

## Componentes

### AlertMessage

Exibe mensagens de feedback (erro ou sucesso).

**Props:**

- `type`: 'error' | 'success'
- `message`: string

### ProfileAvatar

Gerencia o avatar do usuário com funcionalidade de upload.

**Props:**

- `avatarUrl`: string | null | undefined
- `name`: string
- `email`: string
- `isUploading`: boolean
- `onAvatarChange`: (file: File) => void

### ProfileForm

Formulário com campos do perfil (nome, email, telefone, localização).

**Props:**

- `formData`: UpdateProfileRequest
- `isEditing`: boolean
- `onChange`: (field: keyof UpdateProfileRequest, value: string) => void

### ProfileActions

Botões de ação (editar, salvar, cancelar, logout).

**Props:**

- `isEditing`: boolean
- `isSaving`: boolean
- `onEdit`: () => void
- `onSave`: () => void
- `onCancel`: () => void
- `onLogout`: () => void

## Custom Hook

### useProfile

Hook que gerencia toda a lógica de estado e requisições do perfil.

**Retorna:**

- `profile`: UserProfile | null
- `formData`: UpdateProfileRequest
- `isEditing`: boolean
- `loading`: boolean
- `saving`: boolean
- `uploadingAvatar`: boolean
- `error`: string | null
- `success`: string | null
- `setIsEditing`: (value: boolean) => void
- `handleInputChange`: (field, value) => void
- `handleAvatarUpload`: (file: File) => Promise<void>
- `handleSave`: () => Promise<void>
- `handleCancel`: () => void
- `loadProfile`: () => Promise<void>

## Uso

```tsx
import { useProfile } from "@/hooks/useProfile";
import {
  AlertMessage,
  ProfileAvatar,
  ProfileForm,
  ProfileActions,
} from "@/components/profile";

const ProfilePage = () => {
  const {
    profile,
    formData,
    isEditing,
    // ... outros estados
    handleAvatarUpload,
    handleInputChange,
    // ... outros handlers
  } = useProfile();

  return (
    <div>
      {error && <AlertMessage type="error" message={error} />}

      <ProfileAvatar
        avatarUrl={profile?.avatarUrl}
        name={profile?.name}
        email={profile?.email}
        isUploading={uploadingAvatar}
        onAvatarChange={handleAvatarUpload}
      />

      <ProfileForm
        formData={formData}
        isEditing={isEditing}
        onChange={handleInputChange}
      />

      <ProfileActions
        isEditing={isEditing}
        isSaving={saving}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
        onLogout={handleLogout}
      />
    </div>
  );
};
```

## Benefícios da Refatoração

1. **Separação de Responsabilidades**: Cada componente tem uma única responsabilidade
2. **Reutilizabilidade**: Componentes podem ser usados em outros contextos
3. **Testabilidade**: Mais fácil testar componentes isolados
4. **Manutenibilidade**: Código mais organizado e fácil de manter
5. **Legibilidade**: Código principal mais limpo e fácil de entender
