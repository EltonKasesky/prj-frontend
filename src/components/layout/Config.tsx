import { useEffect, useState } from "react";
import {
    LoaderCircleIcon,
    AlertCircleIcon,
    RefreshCwIcon,
    UserXIcon,
    SettingsIcon,
} from "lucide-react";
import { UserService } from "../../services/user.services";
import type { UserResponseDTO } from "../../types/user.types";
import ConfigProfileCard from "../ui/config/ConfigProfileCard";
import ConfigEditProfileSection from "../ui/config/ConfigEditProfileSection";
import ConfigChangePasswordSection from "../ui/config/ConfigChangePasswordSection";
import ConfigDangerZoneSection from "../ui/config/ConfigDangerZoneSection";

export default function Config() {
    const [profile, setProfile] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await UserService.getProfile();
            setProfile(data);
        } catch (err: unknown) {
            const errorResponse = err as {
                response?: { data?: { message?: string } };
            };
            setError(
                errorResponse.response?.data?.message ||
                    "Não foi possível carregar as informações da conta. Verifique sua conexão.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            loadProfile();
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <main
                className="min-h-[calc(100vh-8rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 py-16 px-4 flex 
                    items-center justify-center"
            >
                <section
                    className="flex flex-col items-center justify-center p-8 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border 
                        dark:border-main-border-dark shadow-sm max-w-sm w-full animate-fade-in"
                >
                    <LoaderCircleIcon className="w-10 h-10 animate-spin text-highlight-bg dark:text-highlight-bg-dark mb-4" />
                    <p className="text-secondary-color dark:text-secondary-color-dark text-sm font-semibold text-center">
                        Carregando configurações da conta...
                    </p>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main
                className="min-h-[calc(100vh-8rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 py-16 px-4 flex items-center 
                    justify-center"
            >
                <section
                    className="flex flex-col items-center justify-center p-8 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-rose-500/20 
                        dark:border-rose-500/10 shadow-sm text-center max-w-md w-full gap-4 animate-fade-in"
                >
                    <div className="p-3 bg-rose-500/10 text-rose-500 rounded-full">
                        <AlertCircleIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                            Erro ao Carregar Configurações
                        </h3>
                        <p className="text-sm text-secondary-color dark:text-secondary-color-dark mt-2">
                            {error}
                        </p>
                    </div>
                    <button
                        onClick={loadProfile}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] 
                            text-white text-sm font-bold rounded-xl transition shadow-md cursor-pointer mt-2"
                    >
                        <RefreshCwIcon className="w-4 h-4" />
                        Tentar Novamente
                    </button>
                </section>
            </main>
        );
    }

    if (!profile) {
        return (
            <main
                className="min-h-[calc(100vh-8rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 py-16 px-4 flex items-center 
                    justify-center"
            >
                <section
                    className="flex flex-col items-center justify-center p-8 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border 
                        dark:border-main-border-dark shadow-sm text-center max-w-md w-full gap-4 animate-fade-in"
                >
                    <div className="p-3 bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-color dark:text-secondary-color-dark rounded-full">
                        <UserXIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                            Nenhum Dado Encontrado
                        </h3>
                        <p className="text-sm text-secondary-color dark:text-secondary-color-dark mt-2">
                            Não foi possível recuperar as informações do usuário
                            logado.
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-8rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 py-10 px-4">
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                <section className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl bg-highlight-bg/10 dark:bg-highlight-bg-dark/10">
                        <SettingsIcon className="w-6 h-6 text-highlight-bg dark:text-highlight-bg-dark" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-main-color dark:text-main-color-dark tracking-tight">
                            Configurações
                        </h1>
                        <p className="text-sm text-secondary-color dark:text-secondary-color-dark">
                            Gerencie as informações e segurança da sua conta.
                        </p>
                    </div>
                </section>

                <ConfigProfileCard profile={profile} />

                <ConfigEditProfileSection
                    profile={profile}
                    onProfileUpdated={loadProfile}
                />

                <ConfigChangePasswordSection />

                <ConfigDangerZoneSection profile={profile} />
            </div>
        </main>
    );
}
