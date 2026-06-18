import { Link } from "react-router";
import { CompassIcon, HomeIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <main className="flex-1 flex flex-col items-center justify-center bg-secondary-bg dark:bg-secondary-bg-dark px-4 py-16 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-teal-500/10 dark:bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="text-center max-w-xl mx-auto z-10">
                    <div className="relative inline-flex items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200/50 dark:border-zinc-800 shadow-xl mb-8 group transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-linear-to-tr from-teal-500/10 to-emerald-500/10 dark:from-amber-500/5 dark:to-amber-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CompassIcon className="w-16 h-16 text-highlight-color dark:text-highlight-color-dark animate-spin [animation-duration:15s] group-hover:text-main-hover dark:group-hover:text-main-hover-dark" />
                    </div>

                    <h1 className="text-8xl font-black tracking-tight text-main-color dark:text-main-color-dark select-none">
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-500 dark:from-yellow-600 dark:to-amber-400">
                            404
                        </span>
                    </h1>

                    <h2 className="mt-4 text-2xl font-bold text-main-color dark:text-main-color-dark">
                        Página não encontrada
                    </h2>

                    <p className="mt-4 text-secondary-color dark:text-secondary-color-dark max-w-md mx-auto leading-relaxed">
                        A página que você está procurando não existe, foi
                        removida ou você não possui permissão para acessá-la.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-zinc-900 
                                text-main-color dark:text-main-color-dark font-bold rounded-2xl border border-zinc-200 dark:border-zinc-800 
                                shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-all transform hover:scale-[1.02]"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Voltar
                        </button>

                        <Link
                            to="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-highlight-bg dark:bg-highlight-bg-dark 
                                text-white font-bold rounded-2xl shadow-md shadow-teal-500/10 dark:shadow-amber-500/10 
                                hover:bg-main-hover dark:hover:bg-main-hover-dark transition-all transform hover:scale-[1.02]"
                        >
                            <HomeIcon className="w-4 h-4 mr-2" />
                            Início
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
