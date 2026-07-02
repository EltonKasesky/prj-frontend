import { AlertCircleIcon, LoaderCircleIcon, MinusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import StickerImage from "./StickerImage";
import type { StickerResponseDTO } from "../../../types/sticker.types";

interface StickerDetailModalProps {
    sticker: StickerResponseDTO;
    quantity?: number;
    userStickerId?: string;
    isCollector: boolean;
    onClose: () => void;
    onRemove: (userStickerId: string) => Promise<void>;
}

export default function StickerDetailModal({
    sticker,
    quantity,
    userStickerId,
    isCollector,
    onClose,
    onRemove,
}: StickerDetailModalProps) {
    const [removing, setRemoving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const owned = (quantity ?? 0) > 0;

    const handleRemove = async () => {
        if (!userStickerId) return;

        try {
            setRemoving(true);
            setError(null);
            await onRemove(userStickerId);
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            setError(
                e.response?.data?.message ||
                    "Falha ao remover figurinha da coleção.",
            );
        } finally {
            setRemoving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md max-h-[90vh] bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark
                    shadow-2xl overflow-hidden flex flex-col"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-main-border dark:border-main-border-dark shrink-0">
                    <h3 className="font-extrabold text-main-color dark:text-main-color-dark">
                        Detalhes da figurinha
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-secondary-color dark:text-secondary-color-dark hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark
                            rounded-lg cursor-pointer transition-colors"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-4 overflow-y-auto">
                    <StickerImage
                        stickerId={sticker.id}
                        alt={sticker.name}
                        className={`w-full aspect-square object-cover rounded-xl ${
                            isCollector && !owned ? "grayscale opacity-40" : ""
                        }`}
                    />

                    <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                            {sticker.name}
                        </h4>
                        {sticker.description && (
                            <p className="text-sm text-secondary-color dark:text-secondary-color-dark">
                                {sticker.description}
                            </p>
                        )}
                    </div>

                    <div
                        className={`grid gap-2 text-center ${isCollector ? "grid-cols-3" : "grid-cols-2"}`}
                    >
                        <div className="p-2 rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark/40">
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark">
                                Página
                            </p>
                            <p className="font-bold text-main-color dark:text-main-color-dark">
                                {sticker.page}
                            </p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark/40">
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark">
                                Número
                            </p>
                            <p className="font-bold text-main-color dark:text-main-color-dark">
                                {sticker.number}
                            </p>
                        </div>
                        {isCollector && (
                            <div className="p-2 rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark/40">
                                <p className="text-xs text-secondary-color dark:text-secondary-color-dark">
                                    Quantidade
                                </p>
                                <p className="font-bold text-main-color dark:text-main-color-dark">
                                    {quantity ?? 0}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="p-2 rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark/40">
                        <p className="text-xs text-secondary-color dark:text-secondary-color-dark mb-1">
                            Tag
                        </p>
                        <p className="font-mono text-xs text-main-color dark:text-main-color-dark break-all select-all">
                            {sticker.tag}
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                            <AlertCircleIcon className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {isCollector && owned && userStickerId && (
                        <button
                            onClick={handleRemove}
                            disabled={removing}
                            className="flex items-center justify-center gap-2 py-2 px-3 bg-rose-500 hover:scale-[1.02] rounded-lg transition
                                text-white text-sm font-semibold cursor-pointer shadow-md"
                        >
                            {removing ? (
                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                            ) : (
                                <MinusCircleIcon className="w-4 h-4" />
                            )}
                            Remover uma unidade da coleção
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
