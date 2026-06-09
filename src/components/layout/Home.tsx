import {
    AlbumIcon,
    IdCardLanyardIcon,
    TrophyIcon,
    UsersIcon,
} from "lucide-react";
import { FeatureCard } from "../ui/home/FeatureCard";
import { AlbumHighlight } from "../ui/home/AlbumHighlight";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function Home() {
    const [figures, setFigures] = useState(0);
    const [teams, setTeams] = useState(0);
    const [authors, SetAuthors] = useState(0);
    const [album, setAlbum] = useState(0);
    const [missingFigures, setMissingFigures] = useState(0);
    const [missingPercent, setMissingPercent] = useState(0);

    useEffect(() => {
        const setupData = async () => {
            setFigures(0);
            setAlbum(0);
            setTeams(0);
            SetAuthors(0);
            setMissingFigures(0);
            setMissingPercent(0);
        };

        setupData();
    }, []);

    return (
        <main className="min-h-screen bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300">
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

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-zinc-50 
                            text-white dark:text-zinc-950 font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02]"
                    >
                        <AlbumIcon className="w-5 h-5 mr-2" />
                        Acessar Álbum
                    </Link>

                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-highlight-bg dark:bg-yellow-500 
                            text-white font-bold rounded-2xl shadow-md shadow-teal-500/20 dark:shadow-yellow-600 transition-all transform hover:scale-[1.02]"
                    >
                        <IdCardLanyardIcon className="w-5 h-5 mr-2" />
                        Acessar Figurinhas
                    </Link>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-12 lg:pb-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2">
                        <AlbumHighlight figures={figures} teams={teams} />
                    </div>

                    <div
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col 
                            justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl text-main-color dark:text-main-color-dark">
                                    Progresso do Álbum
                                </h3>
                                <span
                                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-secondary-color 
                                        dark:text-secondary-color-dark"
                                >
                                    Faltam {missingFigures}
                                </span>
                            </div>

                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden mb-2">
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
                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary-color dark:text-secondary-color-dark">
                                    Total de Autores
                                </span>
                                <span className="font-bold text-main-color dark:text-main-color-dark">
                                    {authors}
                                </span>
                            </div>
                            <Link
                                to={"/"}
                                className="flex justify-center py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 
                                    text-main-color dark:text-main-color-dark font-semibold rounded-xl text-sm transition-colors"
                            >
                                Adicionar Figurinhas
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-100/60 dark:bg-zinc-900/30 border-t border-zinc-200/50 dark:border-zinc-800/50 py-8 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
                        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
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
