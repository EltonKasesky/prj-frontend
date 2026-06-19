import {
    AlbumIcon,
    AlertCircleIcon,
    IdCardLanyardIcon,
    TrophyIcon,
    UsersIcon,
    XIcon,
} from "lucide-react";
import { FeatureCard } from "../ui/home/FeatureCard";
import { AlbumHighlight } from "../ui/home/AlbumHighlight";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { StatisticsService } from "../../services/statistics.services";

export default function Home() {
    const { isAuthenticated, isAdmin, isAuthor, isCollector } = useAuth();
    const [figures, setFigures] = useState(0);
    const [teams, setTeams] = useState(0);
    const [authors, setAuthors] = useState(0);
    const [album, setAlbum] = useState(0);
    const [missingFigures, setMissingFigures] = useState(0);
    const [missingPercent, setMissingPercent] = useState(0);
    const [homeError, setHomeError] = useState<string | null>(null);

    useEffect(() => {
        const getStatsForFillHomePage = async () => {
            try {
                const response = await StatisticsService.getStatsForHomePage();
                setAuthors(response.authors);
                setFigures(response.figures);
                setTeams(response.teams);
                setAlbum(response.album);
                setMissingFigures(response.album - response.figures);
                setMissingPercent((response.album / response.figures) * 100);
            } catch (error: unknown) {
                const err = error as {
                    response?: { data?: { message?: string } };
                };
                setHomeError(
                    err.response?.data?.message ||
                        "Falha ao buscar dados para a página inicial.",
                );
            }
        };

        getStatsForFillHomePage();
    }, []);

    const canShowAccessAlbumButton = () => {
        if (isAuthenticated && (isAdmin || isAuthor || isCollector))
            return true;

        return false;
    };

    const canShowAccessFiguresButton = () => {
        if (isAuthenticated && (isAdmin || isAuthor)) return true;

        return false;
    };

    return (
        <main className="min-h-screen bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 animate-fade-in">
            {homeError && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                        <div className="flex items-center gap-2">
                            <AlertCircleIcon className="w-4 h-4 shrink-0" />
                            {homeError}
                        </div>
                        <button
                            onClick={() => setHomeError(null)}
                            className="p-1 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                            <XIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}
            <section className="relative max-w-7xl mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-500/15 dark:bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

                <h1 className="text-4xl font-black tracking-tight text-main-color dark:text-main-color-dark sm:text-6xl max-w-4xl mx-auto leading-[1.15]">
                    O Álbum de Figurinhas Digital da{" "}
                    <span
                        className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-yellow-600 
                            dark:via-amber-400 dark:to-amber-200"
                    >
                        Copa do Mundo 2026
                    </span>
                </h1>

                <p className="mt-6 text-lg text-main-color dark:text-main-color-dark max-w-2xl mx-auto leading-relaxed">
                    Crie suas figurinhas, coloque-as no álbum e complete com
                    todos os jogadores da copa de 2026.
                </p>

                {isAuthenticated && (
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {canShowAccessAlbumButton() && (
                            <Link
                                to="/album"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-zinc-50
                                    text-white dark:text-zinc-950 font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02]"
                            >
                                <AlbumIcon className="w-5 h-5 mr-2" />
                                Acessar Álbum
                            </Link>
                        )}

                        {canShowAccessFiguresButton() && (
                            <Link
                                to="/figures"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-highlight-bg dark:bg-yellow-500 
                                    text-white font-bold rounded-2xl shadow-md shadow-teal-500/20 dark:shadow-yellow-600 transition-all transform hover:scale-[1.02]"
                            >
                                <IdCardLanyardIcon className="w-5 h-5 mr-2" />
                                Acessar Figurinhas
                            </Link>
                        )}
                    </div>
                )}
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-12 lg:pb-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2">
                        <AlbumHighlight figures={figures} teams={teams} />
                    </div>

                    <div
                        className="bg-main-bg dark:bg-main-bg-dark p-8 rounded-3xl border border-main-border dark:border-main-border-dark shadow-md flex flex-col 
                            justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl text-main-color dark:text-main-color-dark">
                                    Progresso do Álbum
                                </h3>
                                <span
                                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-color 
                                        dark:text-secondary-color-dark"
                                >
                                    Faltam {missingFigures}
                                </span>
                            </div>

                            <div className="w-full bg-secondary-bg dark:bg-secondary-bg-dark h-3 rounded-full overflow-hidden mb-2">
                                <div
                                    className="bg-linear-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${missingPercent}%` }}
                                />
                            </div>
                            <p className="text-sm font-medium text-secondary-color dark:text-secondary-color-dark mb-8">
                                {missingPercent}% do álbum preenchido ({album}{" "}
                                de {figures})
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="p-4 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary-color dark:text-secondary-color-dark">
                                    Total de Autores
                                </span>
                                <span className="font-bold text-main-color dark:text-main-color-dark">
                                    {authors}
                                </span>
                            </div>
                            {canShowAccessFiguresButton() && (
                                <Link
                                    to={"/figures"}
                                    className="flex justify-center py-3 bg-secondary-bg dark:bg-secondary-bg-dark
                                    text-main-color dark:text-main-color-dark font-semibold rounded-xl text-sm transition-colors"
                                >
                                    Adicionar Figurinhas
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-secondary-bg dark:bg-secondary-bg-dark border-t border-main-border dark:border-main-border-dark py-8 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
                        <h2 className="text-2xl font-extrabold text-main-color dark:text-main-color-dark sm:text-3xl">
                            Como funciona o Álbum da Copa?
                        </h2>
                        <p className="mt-4 text-secondary-color dark:text-secondary-color-dark">
                            Esqueça o papel e a cola física. Crie figurinhas e
                            gerencie o Álbum de qualquer dispositivo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={IdCardLanyardIcon}
                            title="Criação de Figuras"
                            description="Os autores tem acesso a criação de novas figurinhas, podendo ser adicionado no álbum."
                        />
                        <FeatureCard
                            icon={AlbumIcon}
                            title="Álbum de Figurinhas"
                            description="Os colecionadores podem adicionar as figurinhas criadas ao Álbum."
                        />
                        <FeatureCard
                            icon={TrophyIcon}
                            title="Copa de 2026"
                            description="O Álbum se situa na copa de 2026, com figuras criadas de autores para colecionadores."
                        />
                        <FeatureCard
                            icon={UsersIcon}
                            title="Comunidade"
                            description="A comunidade de autores e colecionadores gerenciam o Álbum."
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
