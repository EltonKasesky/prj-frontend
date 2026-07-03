import StickerImage from "./StickerImage";
import type { StickerResponseDTO } from "../../../types/sticker.types";

interface StickerCardProps {
    sticker: StickerResponseDTO;
    quantity?: number;
    onClick: () => void;
}

export default function StickerCard({
    sticker,
    quantity,
    onClick,
}: StickerCardProps) {
    const owned = (quantity ?? 0) > 0;

    return (
        <button
            type="button"
            onClick={onClick}
            title={sticker.name}
            className="relative flex flex-col rounded-xl border border-main-border dark:border-main-border-dark overflow-hidden bg-main-bg
                dark:bg-main-bg-dark hover:scale-[1.03] transition-transform cursor-pointer text-left shadow-sm"
        >
            <div className="relative aspect-square w-full">
                <StickerImage
                    stickerId={sticker.id}
                    alt={sticker.name}
                    className={`w-full h-full object-cover ${
                        owned ? "" : "grayscale opacity-40"
                    }`}
                />

                {quantity !== undefined && owned && (
                    <span
                        className="absolute top-1.5 right-1.5 bg-highlight-bg dark:bg-highlight-bg-dark text-white text-xs font-bold
                            rounded-full min-w-[1.5rem] h-6 flex items-center justify-center px-1.5 shadow-md"
                    >
                        x{quantity}
                    </span>
                )}
            </div>

            <div className="p-2">
                <p className="text-xs font-bold text-main-color dark:text-main-color-dark truncate">
                    {sticker.number}. {sticker.name}
                </p>
            </div>
        </button>
    );
}
