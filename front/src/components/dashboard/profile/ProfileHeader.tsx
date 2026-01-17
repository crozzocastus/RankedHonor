/**
 * ProfileHeader Component
 * 
 * Cabeçalho do perfil com título, toggle de visibilidade e botões de edição.
 */

import { Eye, EyeOff, Settings } from "lucide-react";

interface ProfileHeaderProps {
  profileVisibility: "public" | "private";
  isEditing: boolean;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileHeader({
  profileVisibility,
  isEditing,
  onToggleVisibility,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-orange-500">Perfil do Jogador</h1>

      <div className="flex items-center gap-4">
        {/* Toggle de visibilidade */}
        <button
          onClick={onToggleVisibility}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
            profileVisibility === "public"
              ? "border border-green-600/30 bg-green-600/20 text-green-500"
              : "border border-red-600/30 bg-red-600/20 text-red-500"
          }`}
        >
          {profileVisibility === "public" ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          {profileVisibility === "public" ? "Público" : "Privado"}
        </button>

        {/* Botões de edição */}
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-white transition-colors hover:from-orange-600 hover:to-red-700"
          >
            <Settings className="h-4 w-4" />
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  );
}
