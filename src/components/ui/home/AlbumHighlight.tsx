import { SparklesIcon, UsersIcon, TrophyIcon } from "lucide-react";

interface AlbumHighlightProps {
    figures: number;
    teams: number;
}

export function AlbumHighlight({ figures, teams }: AlbumHighlightProps) {
    return (
        <div className="relative overflow-hidden bg-linear-to-br from-teal-600 via-emerald-600 to-cyan-700 rounded-3xl p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md mb-4">
                    <SparklesIcon className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />{" "}
                    Edição Limitada
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight mb-4 sm:text-4xl">
                    Complete a história da maior Copa de todos os tempos!
                </h2>
                <p className="text-emerald-50 mb-6 leading-relaxed">
                    Colecione os craques das seleções que estão fazendo história
                    nos gramados do Canadá, Estados Unidos e México.
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                    <div className="flex items-center gap-3">
                        <UsersIcon className="w-5 h-5 text-emerald-200" />
                        <div>
                            <p className="text-xs text-emerald-200">
                                Total de Figurinhas
                            </p>
                            <p className="font-bold text-lg">
                                {figures} Figuras
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <TrophyIcon className="w-5 h-5 text-emerald-200" />
                        <div>
                            <p className="text-xs text-emerald-200">
                                Total de Times
                            </p>
                            <p className="font-bold text-lg">{teams} Times</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
