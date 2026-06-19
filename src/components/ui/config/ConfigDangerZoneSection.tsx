import { useState } from "react";
import { useNavigate } from "react-router";
import {
    LoaderCircleIcon,
    AlertCircleIcon,
    ShieldAlertIcon,
    XIcon,
    AlertTriangleIcon,
    Trash2Icon,
} from "lucide-react";
import { UserService } from "../../../services/user.services";
import type { UserResponseDTO } from "../../../types/user.types";
import { useAuth } from "../../../context/AuthContext";

interface ConfigDangerZoneSectionProps {
    profile: UserResponseDTO;
}

export default function ConfigDangerZoneSection({
    profile,
}: ConfigDangerZoneSectionProps) {
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [deactivating, setDeactivating] = useState(false);
    const [deactivateError, setDeactivateError] = useState<string | null>(null);

    const handleDeactivateAccount = async () => {
        try {
            setDeactivating(true);
            await UserService.deactivateAccount();
            logout();
            navigate("/login");
        } catch (err: unknown) {
            const errorResponse = err as {
                response?: { data?: { message?: string } };
            };
            setDeactivateError(
                errorResponse.response?.data?.message ||
                    "Falha ao desativar a conta. Tente novamente.",
            );
            setDeactivating(false);
        }
    };

    return (
        <>
            <section className="p-6 rounded-2xl border border-rose-500/20 dark:border-rose-500/10 bg-main-bg dark:bg-main-bg-dark shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldAlertIcon className="w-5 h-5 text-rose-500" />
                    <h2 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                        Segurança da Conta
                    </h2>
                </div>
                <p className="text-sm text-secondary-color dark:text-secondary-color-dark border-b border-rose-500/10 dark:border-rose-500/5 pb-4 mb-4">
                    Ações sensíveis relacionadas à sua conta. Tenha cuidado ao
                    executar operações nesta seção.
                </p>

                <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-500/5 
                        dark:bg-rose-500/5 border border-rose-500/10 dark:border-rose-500/10"
                >
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-main-color dark:text-main-color-dark">
                            Desativar Conta
                        </h3>
                        <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-1">
                            Ao desativar sua conta, você perderá o acesso ao
                            sistema. Esta ação pode ser revertida por um
                            administrador.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setDeactivateError(null);
                            setShowDeactivateModal(true);
                        }}
                        className="flex justify-center items-center w-full sm:w-auto gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg 
                            transition-all hover:scale-[1.02] cursor-pointer shadow-md shrink-0"
                    >
                        <Trash2Icon className="w-4 h-4" />
                        Desativar Conta
                    </button>
                </div>
            </section>

            {showDeactivateModal && (
                <>
                    <div
                        onClick={() =>
                            !deactivating && setShowDeactivateModal(false)
                        }
                        className="fixed inset-0 bg-black/60 z-45 transition-opacity duration-300 backdrop-blur-xs"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="relative w-full max-w-md p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-rose-500/20 
                                dark:border-rose-500/10 shadow-2xl animate-fade-in"
                        >
                            <button
                                onClick={() =>
                                    !deactivating &&
                                    setShowDeactivateModal(false)
                                }
                                className="absolute top-4 right-4 p-1.5 text-secondary-color dark:text-secondary-color-dark hover:text-main-color 
                                    dark:hover:text-main-color-dark transition-colors cursor-pointer rounded-lg hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark"
                                disabled={deactivating}
                            >
                                <XIcon className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-full">
                                    <AlertTriangleIcon className="w-10 h-10" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                                        Desativar Conta
                                    </h3>
                                    <p className="text-sm text-secondary-color dark:text-secondary-color-dark mt-2">
                                        Tem certeza de que deseja desativar sua
                                        conta? Você será desconectado
                                        imediatamente e perderá o acesso ao
                                        sistema.
                                    </p>
                                </div>

                                {authUser && (
                                    <div
                                        className="w-full p-3 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark/40 border border-main-border 
                                        dark:border-main-border-dark"
                                    >
                                        <p className="text-xs text-secondary-color dark:text-secondary-color-dark">
                                            Conta a ser desativada:
                                        </p>
                                        <p className="text-sm font-bold text-main-color dark:text-main-color-dark mt-0.5">
                                            {profile.email}
                                        </p>
                                    </div>
                                )}

                                {deactivateError && (
                                    <div
                                        className="w-full flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 
                                            dark:text-rose-400 text-sm font-medium animate-fade-in text-left"
                                    >
                                        <AlertCircleIcon className="w-4 h-4 shrink-0" />
                                        {deactivateError}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                                    <button
                                        onClick={() =>
                                            setShowDeactivateModal(false)
                                        }
                                        disabled={deactivating}
                                        className="flex-1 flex justify-center items-center gap-2 py-2.5 px-4 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] 
                                            rounded-lg transition text-main-color dark:text-main-color-dark text-sm font-semibold cursor-pointer shadow-md
                                            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleDeactivateAccount}
                                        disabled={deactivating}
                                        className="flex-1 flex justify-center items-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 hover:scale-[1.02] 
                                            rounded-lg transition text-white text-sm font-semibold cursor-pointer shadow-md
                                            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {deactivating ? (
                                            <>
                                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                                                Desativando...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2Icon className="w-4 h-4" />
                                                Sim, Desativar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
