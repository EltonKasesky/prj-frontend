import { useEffect, useState } from "react";
import {
    LoaderCircleIcon,
    AlertCircleIcon,
    SaveIcon,
    CheckCircleIcon,
    UserIcon,
} from "lucide-react";
import { UserService } from "../../../services/user.services";
import type { UserResponseDTO } from "../../../types/user.types";
import InputLabel from "../InputLabel";

interface ConfigEditProfileSectionProps {
    profile: UserResponseDTO;
    onProfileUpdated: () => void;
}

export default function ConfigEditProfileSection({
    profile,
    onProfileUpdated,
}: ConfigEditProfileSectionProps) {
    const [editName, setEditName] = useState(profile.name);
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (profileSuccess) {
            const timer = setTimeout(() => setProfileSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [profileSuccess]);

    const handleUpdateProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        setProfileError(null);
        setProfileSuccess(null);

        if (!editName.trim()) {
            setProfileError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            setSavingProfile(true);
            await UserService.updateProfile({
                name: editName.trim(),
            });
            setProfileSuccess("Dados atualizados com sucesso!");
            onProfileUpdated();
        } catch (err: unknown) {
            const errorResponse = err as {
                response?: { data?: { message?: string } };
            };
            setProfileError(
                errorResponse.response?.data?.message ||
                    "Falha ao atualizar os dados. Tente novamente.",
            );
        } finally {
            setSavingProfile(false);
        }
    };

    return (
        <section className="p-6 rounded-2xl border border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark shadow-sm">
            <div className="flex items-center gap-2 mb-1">
                <UserIcon className="w-5 h-5 text-highlight-bg dark:text-highlight-bg-dark" />
                <h2 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                    Editar Dados Pessoais
                </h2>
            </div>
            <p className="text-sm text-secondary-color dark:text-secondary-color-dark border-b border-main-border dark:border-main-border-dark pb-4 mb-4">
                Atualize suas informações cadastrais abaixo.
            </p>

            <form
                onSubmit={handleUpdateProfile}
                className="flex flex-col gap-4"
            >
                <InputLabel
                    label="Nome Completo"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Ex.: João Silva"
                    required
                />

                {profileError && (
                    <div
                        className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm 
                            font-medium animate-fade-in"
                    >
                        <AlertCircleIcon className="w-4 h-4 shrink-0" />
                        {profileError}
                    </div>
                )}

                {profileSuccess && (
                    <div
                        className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 
                            text-sm font-medium animate-fade-in"
                    >
                        <CheckCircleIcon className="w-4 h-4 shrink-0" />
                        {profileSuccess}
                    </div>
                )}

                <div className="flex justify-end border-t border-main-border dark:border-main-border-dark pt-4">
                    <button
                        type="submit"
                        disabled={savingProfile}
                        className="flex justify-center items-center w-full sm:w-auto gap-2 py-2 px-4 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-white text-sm font-semibold cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {savingProfile ? (
                            <>
                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
