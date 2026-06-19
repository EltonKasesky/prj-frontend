import { CheckCircle2Icon } from "lucide-react";

export default function DashboardEngagementChart() {
    return (
        <div
            className="lg:col-span-2 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-main-border dark:border-main-border-dark 
                shadow-md flex flex-col justify-between"
        >
            <div>
                <h3 className="font-bold text-lg text-main-color dark:text-main-color-dark">
                    Engajamento da Comunidade
                </h3>
                <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-0.5">
                    Interações com o álbum nos últimos 7 dias.
                </p>
            </div>

            <div className="flex items-end justify-between gap-3 pt-6 pb-2">
                {[40, 55, 48, 70, 85, 62, 90].map((val, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-lg h-60 flex items-end overflow-hidden">
                            <div
                                className="w-full bg-linear-to-t from-teal-500 to-emerald-400 dark:from-yellow-600 dark:to-amber-400 group-hover:opacity-85 
                                    rounded-t-lg transition-all duration-500 ease-out"
                                style={{ height: `${val}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium text-secondary-color dark:text-secondary-color-dark">
                            {
                                [
                                    "Domingo",
                                    "Segunda",
                                    "Terça",
                                    "Quarta",
                                    "Quinta",
                                    "Sexta",
                                    "Sábado",
                                ][i]
                            }
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex items-center pt-4 border-t border-main-border dark:border-main-border-dark text-xs text-secondary-color dark:text-secondary-color-dark">
                <span className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2Icon className="w-3.5 h-3.5" /> Atualizado em
                    tempo real
                </span>
            </div>
        </div>
    );
}
