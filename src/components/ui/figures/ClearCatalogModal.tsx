import { useState } from "react";
import {
    AlertTriangleIcon,
    LoaderCircleIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";
import { StickerService } from "../../../services/sticker.services";

interface ClearCatalogModalProps {
    onClose: () => void;
    onCleared: () => void;
}

export default function ClearCatalogModal({
    onClose,
    onCleared,
}: ClearCatalogModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            setError(null);
            await StickerService.clearCatalog();
            onCleared();
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            setError(
                e.response?.data?.message ||
                    "Falha ao limpar o catálogo de figurinhas.",
            );
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark shadow-2xl overflow-hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-main-border dark:border-main-border-dark">
                    <h3 className="flex items-center gap-2 font-extrabold text-rose-600 dark:text-rose-400">
                        <AlertTriangleIcon className="w-5 h-5" />
                        Limpar catálogo
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-secondary-color dark:text-secondary-color-dark hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark
                            rounded-lg cursor-pointer transition-colors"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-4">
                    <p className="text-sm text-main-color dark:text-main-color-dark leading-relaxed">
                        Você está prestes a apagar{" "}
                        <strong>todas as figurinhas do álbum</strong>. Elas vão
                        sumir para <strong>todos os usuários</strong>,
                        incluindo as figurinhas que colecionadores já
                        adquiriram.
                    </p>
                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                        Essa ação é irreversível e não pode ser desfeita.
                    </p>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                            <AlertTriangleIcon className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex justify-center items-center gap-2 py-2 px-3 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] rounded-lg transition
                                text-main-color dark:text-main-color-dark text-md font-semibold cursor-pointer shadow-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={loading}
                            className="flex justify-center items-center gap-2 py-2 px-3 bg-rose-500 hover:bg-rose-600 hover:scale-[1.02] rounded-lg transition
                                text-white text-md font-semibold cursor-pointer shadow-md"
                        >
                            {loading ? (
                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2Icon className="w-4 h-4" />
                            )}
                            Sim, apagar tudo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
