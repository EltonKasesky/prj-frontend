import type { AlbumProgressResponseDTO } from "../../../types/userSticker.types";

interface AlbumProgressProps {
    progress: AlbumProgressResponseDTO;
}

export default function AlbumProgress({ progress }: AlbumProgressProps) {
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-main-color dark:text-main-color-dark">
                    Progresso da coleção
                </span>
                <span className="text-sm font-bold text-highlight-color dark:text-highlight-color-dark">
                    {progress.collected} de {progress.total} (
                    {progress.percentage.toFixed(1)}%)
                </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-secondary-bg dark:bg-secondary-bg-dark overflow-hidden">
                <div
                    className="h-full bg-highlight-bg dark:bg-highlight-bg-dark transition-all duration-500"
                    style={{
                        width: `${Math.min(100, Math.max(0, progress.percentage))}%`,
                    }}
                />
            </div>
        </div>
    );
}
