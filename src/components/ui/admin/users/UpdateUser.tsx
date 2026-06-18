import { useEffect, useState } from "react";
import {
    ShieldCheckIcon,
    PenToolIcon,
    DatabaseIcon,
    LoaderCircleIcon,
    SaveIcon,
    CheckIcon,
    Undo2Icon,
} from "lucide-react";
import { UserService } from "../../../../services/user.services";
import type { UserResponseDTO } from "../../../../types/user.types";
import { ProfileService } from "../../../../services/profile.services";

interface UpdateUserProps {
    userId: string;
    update: boolean;
    setUpdate: (update: boolean) => void;
}

interface RoleConfig {
    key: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
}

export default function UpdateUser({ userId, setUpdate }: UpdateUserProps) {
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [initialRoles, setInitialRoles] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const rolesList: RoleConfig[] = [
        {
            key: "ROLE_ADMIN",
            name: "Administrador",
            description: "Acesso total ao sistema e gerenciamento de usuários.",
            icon: ShieldCheckIcon,
            activeColor:
                "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400",
        },
        {
            key: "ROLE_AUTHOR",
            name: "Autor",
            description:
                "Permissão para criar, editar e gerenciar as figurinhas do sistema.",
            icon: PenToolIcon,
            activeColor:
                "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        {
            key: "ROLE_COLLECTOR",
            name: "Colecionador",
            description:
                "Permissão para editar e manipular as figurinhas do álbum.",
            icon: DatabaseIcon,
            activeColor:
                "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    ];

    const getUserData = async () => {
        try {
            setLoading(true);
            const data = await UserService.getUserById(userId);
            setUser(data);

            const profilesData = await ProfileService.getUserProfiles(userId);
            const userRoles = profilesData.map((profile) => profile.name);

            setInitialRoles(userRoles);
            setSelectedRoles(userRoles);
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            alert(
                err.response?.data?.message ||
                    "Falha ao carregar dados do usuário.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            await getUserData();
        };

        fetchUserData();
    }, [userId]);

    const handleRoleToggle = (roleKey: string) => {
        if (selectedRoles.includes(roleKey)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== roleKey));
        } else {
            setSelectedRoles([...selectedRoles, roleKey]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setSaving(true);

            const rolesToAdd = selectedRoles.filter(
                (role) => !initialRoles.includes(role),
            );
            const rolesToRemove = initialRoles.filter(
                (role) => !selectedRoles.includes(role),
            );

            if (rolesToAdd.length > 0) {
                await ProfileService.addProfilesToUser(userId, {
                    profileNames: rolesToAdd,
                });
            }

            if (rolesToRemove.length > 0) {
                await ProfileService.removeProfilesFromUser(userId, {
                    profileNames: rolesToRemove,
                });
            }

            setUpdate(false);
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            alert(
                err.response?.data?.message ||
                    "Falha ao atualizar perfis do usuário.",
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div
                className="flex flex-col items-center justify-center py-12 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border 
                    dark:border-main-border-dark shadow-sm"
            >
                <LoaderCircleIcon className="w-8 h-8 animate-spin text-highlight-bg dark:text-highlight-bg-dark mb-3" />
                <p className="text-secondary-color dark:text-secondary-color-dark text-sm font-medium">
                    Carregando dados do usuário...
                </p>
            </div>
        );
    }

    return (
        <section
            className="flex flex-col gap-6 w-full p-6 rounded-2xl border border-main-border dark:border-main-border-dark bg-main-bg 
                dark:bg-main-bg-dark shadow-sm animate-fade-in"
        >
            <div className="flex flex-col gap-1 border-b border-main-border dark:border-main-border-dark pb-4">
                <h2 className="text-xl font-extrabold text-main-color dark:text-main-color-dark">
                    Editar Perfis de Acesso
                </h2>
                <p className="text-secondary-color dark:text-secondary-color-dark text-sm">
                    Gerencie quais funções e níveis de permissão este usuário
                    possui no sistema.
                </p>
            </div>

            {user && (
                <div
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark/40 border border-main-border 
                        dark:border-main-border-dark"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-full bg-highlight-bg dark:bg-highlight-bg-dark flex items-center justify-center font-bold 
                                text-white text-lg"
                        >
                            {(user.name || "").charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-md text-main-color dark:text-main-color-dark">
                                {user.name}
                            </h3>
                            <p className="text-sm text-secondary-color dark:text-secondary-color-dark">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto flex items-center gap-2">
                        <span className="text-xs font-semibold text-secondary-color dark:text-secondary-color-dark">
                            Status:
                        </span>
                        <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                user.status
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            }`}
                        >
                            {user.status ? "Ativo" : "Inativo"}
                        </span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-main-color dark:text-main-color-dark">
                        Perfis de Acesso Disponíveis
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {rolesList.map((role) => {
                            const isSelected = selectedRoles.includes(role.key);
                            const IconComponent = role.icon;

                            return (
                                <button
                                    key={role.key}
                                    type="button"
                                    onClick={() => handleRoleToggle(role.key)}
                                    className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer select-none group relative ${
                                        isSelected
                                            ? role.activeColor +
                                              " shadow-sm ring-1 ring-offset-0 ring-current"
                                            : "border-main-border dark:border-main-border-dark bg-secondary-bg dark:bg-secondary-bg-dark/40 hover:border-secondary-color dark:hover:border-secondary-color-dark"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                            isSelected
                                                ? "bg-main-bg dark:bg-secondary-bg-dark border-transparent text-main-color dark:text-main-color-dark"
                                                : "border-main-border dark:border-main-border-dark bg-transparent group-hover:border-secondary-color dark:group-hover:border-secondary-color-dark"
                                        }`}
                                    >
                                        {isSelected && (
                                            <CheckIcon className="w-3.5 h-3.5 stroke-3" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className={`p-2 rounded-lg ${
                                                isSelected
                                                    ? "bg-main-bg dark:bg-main-bg-dark"
                                                    : "bg-main-bg dark:bg-main-bg-dark text-secondary-color dark:text-secondary-color-dark"
                                            }`}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-md text-main-color dark:text-main-color-dark">
                                            {role.name}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed text-secondary-color dark:text-secondary-color-dark">
                                        {role.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-main-border dark:border-main-border-dark pt-4">
                    <button
                        className="flex justify-center items-center gap-2 py-2 px-3 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-main-color dark:text-main-color-dark text-md font-semibold cursor-pointer shadow-md"
                        onClick={() => setUpdate(false)}
                    >
                        <Undo2Icon className="w-4 h-4" />
                        Cancelar
                    </button>
                    <button
                        disabled={saving}
                        className="flex justify-center items-center gap-2 py-2 px-3 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-white text-md font-semibold cursor-pointer shadow-md"
                        type="submit"
                    >
                        {saving ? (
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
