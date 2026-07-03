import { useEffect, useState } from "react";
import {
    AlertCircleIcon,
    LoaderCircleIcon,
    PencilIcon,
    Trash2Icon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AlbumService } from "../../services/album.services";
import { UserStickerService } from "../../services/userSticker.services";
import type { AlbumDetailsDTO } from "../../types/album.types";
import type { StickerResponseDTO } from "../../types/sticker.types";
import type {
    AlbumProgressResponseDTO,
    UserStickerResponseDTO,
} from "../../types/userSticker.types";
import AlbumProgress from "../ui/album/AlbumProgress";
import AcquireStickerForm from "../ui/album/AcquireStickerForm";
import AlbumCoverImage from "../ui/album/AlbumCoverImage";
import UpdateAlbum from "../ui/album/UpdateAlbum";
import StickerCard from "../ui/sticker/StickerCard";
import StickerDetailModal from "../ui/sticker/StickerDetailModal";

export default function Album() {
    const { isCollector, isAuthor } = useAuth();

    const [album, setAlbum] = useState<AlbumDetailsDTO | null>(null);
    const [editingAlbum, setEditingAlbum] = useState(false);
    const [collection, setCollection] = useState<UserStickerResponseDTO[]>(
        [],
    );
    const [progress, setProgress] = useState<AlbumProgressResponseDTO | null>(
        null,
    );
    const [selectedSticker, setSelectedSticker] =
        useState<StickerResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const collectionByTag = new Map(
        collection.map((item) => [item.tag, item]),
    );

    const refreshCollection = async () => {
        if (!isCollector) return;

        const [collectionData, summaryData] = await Promise.all([
            UserStickerService.getMyCollection(),
            UserStickerService.getCollectionSummary(),
        ]);

        setCollection(collectionData);
        setProgress(summaryData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const albumData = await AlbumService.getAlbum();
                setAlbum(albumData);

                await refreshCollection();
            } catch (err: unknown) {
                const e = err as {
                    response?: { data?: { message?: string } };
                };
                setError(
                    e.response?.data?.message ||
                        "Falha ao carregar o álbum.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCollector]);

    const handleClearCollection = async () => {
        if (
            !window.confirm(
                "Tem certeza que deseja limpar toda a sua coleção? Essa ação não pode ser desfeita.",
            )
        ) {
            return;
        }

        try {
            await UserStickerService.clearCollection();
            await refreshCollection();
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            setError(
                e.response?.data?.message ||
                    "Falha ao limpar a coleção.",
            );
        }
    };

    const handleRemove = async (userStickerId: string) => {
        await UserStickerService.removeSticker(userStickerId);
        await refreshCollection();
        setSelectedSticker(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-secondary-bg dark:bg-secondary-bg-dark">
                <LoaderCircleIcon className="w-10 h-10 animate-spin text-highlight-bg dark:text-highlight-bg-dark mb-3" />
                <p className="text-secondary-color dark:text-secondary-color-dark text-sm font-medium">
                    Carregando álbum...
                </p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-secondary-bg dark:bg-secondary-bg-dark p-6">
                <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium">
                    <AlertCircleIcon className="w-4 h-4 shrink-0" />
                    {error || "Álbum não encontrado."}
                </div>
            </div>
        );
    }

    const stickersByPage = new Map<number, StickerResponseDTO[]>();
    for (const sticker of album.stickers) {
        const pageStickers = stickersByPage.get(sticker.page) ?? [];
        pageStickers.push(sticker);
        stickersByPage.set(sticker.page, pageStickers);
    }
    const sortedPages = Array.from(stickersByPage.keys()).sort(
        (a, b) => a - b,
    );

    return (
        <main className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 p-6 md:p-10">
            <section className="mx-auto w-full max-w-6xl space-y-6 animate-fade-in">
                {isAuthor && editingAlbum ? (
                    <UpdateAlbum
                        album={album}
                        onUpdated={(updated) => {
                            setAlbum(updated);
                            setEditingAlbum(false);
                        }}
                        onCancel={() => setEditingAlbum(false)}
                    />
                ) : (
                    <section className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark shadow-sm">
                        <AlbumCoverImage
                            alt={album.title}
                            className="w-full sm:w-32 h-40 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex flex-1 flex-col gap-1 justify-center">
                            <h2 className="text-2xl font-extrabold text-main-color dark:text-main-color-dark">
                                {album.title}
                            </h2>
                            <p className="text-secondary-color dark:text-secondary-color-dark text-sm">
                                {album.totalPages} páginas ·{" "}
                                {album.totalStickers} figurinhas no catálogo
                                oficial
                            </p>
                        </div>
                        {isAuthor && (
                            <button
                                onClick={() => setEditingAlbum(true)}
                                className="flex items-center justify-center gap-2 self-start text-sm font-bold cursor-pointer py-2.5 px-4 rounded-xl
                                    shadow-md transition-all transform hover:scale-[1.02] text-white bg-highlight-bg dark:bg-highlight-bg-dark"
                            >
                                <PencilIcon className="w-4 h-4" />
                                Editar Álbum
                            </button>
                        )}
                    </section>
                )}

                {isCollector && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {progress && <AlbumProgress progress={progress} />}
                        <AcquireStickerForm onAcquired={refreshCollection} />
                    </section>
                )}

                {isCollector && collection.length > 0 && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleClearCollection}
                            className="flex items-center gap-2 py-2 px-3 bg-rose-500 hover:scale-[1.02] rounded-lg transition
                                text-white text-sm font-semibold cursor-pointer shadow-md"
                        >
                            <Trash2Icon className="w-4 h-4" />
                            Limpar minha coleção
                        </button>
                    </div>
                )}

                {sortedPages.map((pageNumber) => (
                    <section key={pageNumber} className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold text-main-color dark:text-main-color-dark border-b border-main-border dark:border-main-border-dark pb-2">
                            Página {pageNumber}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {stickersByPage
                                .get(pageNumber)!
                                .map((sticker) => (
                                    <StickerCard
                                        key={sticker.id}
                                        sticker={sticker}
                                        quantity={
                                            isCollector
                                                ? collectionByTag.get(
                                                      sticker.tag,
                                                  )?.quantity
                                                : undefined
                                        }
                                        onClick={() =>
                                            setSelectedSticker(sticker)
                                        }
                                    />
                                ))}
                        </div>
                    </section>
                ))}
            </section>

            {selectedSticker && (
                <StickerDetailModal
                    sticker={selectedSticker}
                    quantity={
                        isCollector
                            ? collectionByTag.get(selectedSticker.tag)
                                  ?.quantity
                            : undefined
                    }
                    userStickerId={
                        isCollector
                            ? collectionByTag.get(selectedSticker.tag)?.id
                            : undefined
                    }
                    isCollector={isCollector}
                    onClose={() => setSelectedSticker(null)}
                    onRemove={handleRemove}
                />
            )}
        </main>
    );
}
