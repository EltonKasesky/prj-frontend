import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import { AlbumService } from "../../../services/album.services";
import { fileToBase64 } from "../../../utils/file.utils";
import type { AlbumDetailsDTO } from "../../../types/album.types";
import {
    AlertCircleIcon,
    CheckCircleIcon,
    ImagePlusIcon,
    LoaderCircleIcon,
    SaveIcon,
    Undo2Icon,
    XIcon,
} from "lucide-react";

interface UpdateAlbumProps {
    album: AlbumDetailsDTO;
    onUpdated: (album: AlbumDetailsDTO) => void;
    onCancel: () => void;
}

export default function UpdateAlbum({
    album,
    onUpdated,
    onCancel,
}: UpdateAlbumProps) {
    const [title, setTitle] = useState(album.title);
    const [totalPages, setTotalPages] = useState(String(album.totalPages));
    const [totalStickers, setTotalStickers] = useState(
        String(album.totalStickers),
    );
    const [image, setImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
        null,
    );
    const [imageInputKey, setImageInputKey] = useState(0);
    const [saving, setSaving] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (updateSuccess) {
            const timer = setTimeout(() => setUpdateSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccess]);

    useEffect(() => {
        if (!image) {
            setImagePreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setImagePreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const removeImage = () => {
        setImage(null);
        setImageInputKey((prev) => prev + 1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setSaving(true);
            setUpdateError(null);
            setUpdateSuccess(null);

            const base64Image = image ? await fileToBase64(image) : undefined;

            const updated = await AlbumService.updateAlbum({
                title,
                totalPages: Number(totalPages),
                totalStickers: Number(totalStickers),
                coverImage: base64Image,
            });

            setImage(null);
            setImageInputKey((prev) => prev + 1);
            setUpdateSuccess("Álbum atualizado com sucesso!");
            onUpdated(updated);
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            setUpdateError(
                err.response?.data?.message || "Falha ao atualizar álbum.",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <section
            className="flex flex-col gap-4 w-full p-4 rounded-2xl border border-main-border dark:border-main-border-dark
                bg-main-bg dark:bg-main-bg-dark shadow-sm animate-fade-in"
        >
            <h2 className="text-xl font-semibold text-main-color dark:text-main-color-dark">
                Editar álbum
            </h2>
            <p className="text-secondary-color dark:text-secondary-color-dark border-b border-main-border dark:border-main-border-dark pb-4">
                Atualize o título, o total de páginas/figurinhas do álbum
                oficial e, se quiser, a imagem de capa.
            </p>
            <form
                onSubmit={handleSubmit}
                method="post"
                className="flex flex-col gap-3"
            >
                <InputLabel
                    label={"Título"}
                    type={"text"}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder={"Ex.: Copa do Mundo FIFA 2026"}
                    required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputLabel
                        label={"Total de páginas"}
                        type={"number"}
                        min={1}
                        value={totalPages}
                        onChange={(event) =>
                            setTotalPages(event.target.value)
                        }
                        required
                    />
                    <InputLabel
                        label={"Total de figurinhas"}
                        type={"number"}
                        min={1}
                        value={totalStickers}
                        onChange={(event) =>
                            setTotalStickers(event.target.value)
                        }
                        required
                    />
                </div>

                <label className="flex flex-col gap-2 text-main-color dark:text-main-color-dark text-md">
                    Nova imagem de capa (opcional)
                    {imagePreviewUrl ? (
                        <div className="relative w-32 h-32">
                            <img
                                src={imagePreviewUrl}
                                alt="Pré-visualização da capa"
                                className="w-32 h-32 rounded-lg object-cover border border-main-border dark:border-main-border-dark"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                title="Remover imagem"
                                className="absolute -top-2 -right-2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md
                                    cursor-pointer transition-transform hover:scale-110"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-2 p-1.5 pl-3 outline outline-zinc-400 dark:outline-zinc-500 rounded-sm text-md
                                bg-secondary-bg dark:bg-secondary-bg-dark/30 focus-within:outline-2 focus-within:outline-main-focus dark:focus-within:outline-main-focus-dark"
                        >
                            <ImagePlusIcon className="w-4 h-4 shrink-0 text-secondary-color dark:text-secondary-color-dark" />
                            <input
                                key={imageInputKey}
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    setImage(event.target.files?.[0] ?? null)
                                }
                                className="w-full text-sm text-main-color dark:text-main-color-dark file:hidden cursor-pointer"
                            />
                        </div>
                    )}
                </label>

                {updateError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                        <AlertCircleIcon className="w-4 h-4 shrink-0" />
                        {updateError}
                    </div>
                )}

                {updateSuccess && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fade-in">
                        <CheckCircleIcon className="w-4 h-4 shrink-0" />
                        {updateSuccess}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-main-border dark:border-main-border-dark pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex justify-center items-center gap-2 py-2 px-3 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-main-color dark:text-main-color-dark text-md font-semibold cursor-pointer shadow-md"
                    >
                        <Undo2Icon className="w-4 h-4" />
                        Cancelar
                    </button>
                    <button
                        disabled={saving}
                        className="flex justify-center items-center gap-2 py-2 px-3 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-white text-md font-semibold cursor-pointer shadow-md"
                        type="submit"
                    >
                        {saving ? (
                            <>
                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
