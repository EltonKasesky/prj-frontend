import { useEffect, useState } from "react";
import { ImageOffIcon, LoaderCircleIcon } from "lucide-react";
import { StickerService } from "../../../services/sticker.services";

interface StickerImageProps {
    stickerId: string;
    alt: string;
    className?: string;
}

export default function StickerImage({
    stickerId,
    alt,
    className,
}: StickerImageProps) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let currentUrl: string | null = null;
        let cancelled = false;

        setLoading(true);
        setFailed(false);
        setObjectUrl(null);

        StickerService.getStickerImageBlob(stickerId)
            .then((blob) => {
                if (cancelled) return;
                currentUrl = URL.createObjectURL(blob);
                setObjectUrl(currentUrl);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
            if (currentUrl) URL.revokeObjectURL(currentUrl);
        };
    }, [stickerId]);

    if (loading) {
        return (
            <div
                className={`flex items-center justify-center bg-secondary-bg dark:bg-secondary-bg-dark/40 ${className}`}
            >
                <LoaderCircleIcon className="w-5 h-5 animate-spin text-secondary-color dark:text-secondary-color-dark" />
            </div>
        );
    }

    if (failed || !objectUrl) {
        return (
            <div
                className={`flex items-center justify-center bg-secondary-bg dark:bg-secondary-bg-dark/40 ${className}`}
            >
                <ImageOffIcon className="w-5 h-5 text-secondary-color dark:text-secondary-color-dark" />
            </div>
        );
    }

    return <img src={objectUrl} alt={alt} className={className} />;
}
