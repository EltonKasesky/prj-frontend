import { useEffect, useState } from "react";
import { AlertCircleIcon, LoaderCircleIcon, PencilIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AlbumService } from "../../services/album.services";
import type { AlbumDetailsDTO } from "../../types/album.types";
import AlbumCoverImage from "../ui/album/AlbumCoverImage";
import UpdateAlbum from "../ui/album/UpdateAlbum";

export default function Album() {
    const { isAuthor } = useAuth();

    const [album, setAlbum] = useState<AlbumDetailsDTO | null>(null);
    const [editingAlbum, setEditingAlbum] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const albumData = await AlbumService.getAlbum();
                setAlbum(albumData);
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
    }, []);

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
            </section>
        </main>
    );
}
