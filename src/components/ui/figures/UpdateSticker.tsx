import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import StickerImage from "../sticker/StickerImage";
import { StickerService } from "../../../services/sticker.services";
import { AlbumService } from "../../../services/album.services";
import { fileToBase64 } from "../../../utils/file.utils";
import {
    AlertCircleIcon,
    CheckCircleIcon,
    ImagePlusIcon,
    LoaderCircleIcon,
    SaveIcon,
    Undo2Icon,
    XIcon,
} from "lucide-react";

interface UpdateStickerProps {
    stickerId: string;
    update: boolean;
    setUpdate: (update: boolean) => void;
}

export default function UpdateSticker({
    stickerId,
    setUpdate,
}: UpdateStickerProps) {
    const [name, setName] = useState("");
    const [page, setPage] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
        null,
    );
    const [imageInputKey, setImageInputKey] = useState(0);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [loadingSticker, setLoadingSticker] = useState(true);
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

    useEffect(() => {
        AlbumService.getAlbum()
            .then((album) => setTotalPages(album.totalPages))
            .catch(() => setTotalPages(null));
    }, []);

    useEffect(() => {
        const fetchSticker = async () => {
            try {
                setLoadingSticker(true);
                const data = await StickerService.getStickerById(stickerId);
                setName(data.name);
                setPage(String(data.page));
                setNumber(String(data.number));
                setDescription(data.description ?? "");
            } catch (error: unknown) {
                const err = error as {
                    response?: { data?: { message?: string } };
                };
                setUpdateError(
                    err.response?.data?.message ||
                        "Falha ao carregar dados da figurinha.",
                );
            } finally {
                setLoadingSticker(false);
            }
        };

        fetchSticker();
    }, [stickerId]);

    const removeImage = () => {
        setImage(null);
        setImageInputKey((prev) => prev + 1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (totalPages !== null && Number(page) > totalPages) {
            setUpdateError(
                `A página informada (${page}) excede o total de páginas do álbum (${totalPages}).`,
            );
            return;
        }

        try {
            setSaving(true);
            setUpdateError(null);
            setUpdateSuccess(null);

            const base64Image = image ? await fileToBase64(image) : undefined;

            await StickerService.updateSticker(stickerId, {
                name,
                page: Number(page),
                number: Number(number),
                description: description || undefined,
                image: base64Image,
            });

            setImage(null);
            setImageInputKey((prev) => prev + 1);
            setUpdateSuccess("Figurinha atualizada com sucesso!");
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            setUpdateError(
                err.response?.data?.message ||
                    "Falha ao atualizar figurinha.",
            );
        } finally {
            setSaving(false);
        }
    };

    if (loadingSticker) {
        return (
            <div
                className="flex flex-col items-center justify-center py-12 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border
                    dark:border-main-border-dark shadow-sm"
            >
                <LoaderCircleIcon className="w-8 h-8 animate-spin text-highlight-bg dark:text-highlight-bg-dark mb-3" />
                <p className="text-secondary-color dark:text-secondary-color-dark text-sm font-medium">
                    Carregando dados da figurinha...
                </p>
            </div>
        );
    }

    return (
        <section
            className="flex flex-col gap-4 w-full p-4 rounded-lg border border-main-border dark:border-main-border-dark
                bg-main-bg dark:bg-main-bg-dark animate-fade-in"
        >
            <div className="flex items-center gap-4 border-b border-main-border dark:border-main-border-dark pb-4">
                <StickerImage
                    stickerId={stickerId}
                    alt={name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div>
                    <h2 className="text-xl font-semibold text-main-color dark:text-main-color-dark">
                        Editar figurinha
                    </h2>
                    <p className="text-secondary-color dark:text-secondary-color-dark text-sm">
                        Atualize os dados da figurinha. Envie uma nova imagem
                        apenas se quiser substituí-la (a tag é recalculada
                        automaticamente).
                    </p>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                method="post"
                className="flex flex-col gap-3"
            >
                <InputLabel
                    label={"Nome"}
                    type={"text"}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={"Ex.: Lionel Messi"}
                    required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputLabel
                        label={
                            totalPages
                                ? `Página (máx. ${totalPages})`
                                : "Página"
                        }
                        type={"number"}
                        min={1}
                        max={totalPages ?? undefined}
                        value={page}
                        onChange={(event) => setPage(event.target.value)}
                        required
                    />
                    <InputLabel
                        label={"Número"}
                        type={"number"}
                        min={1}
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                        required
                    />
                </div>
                <label className="flex flex-col gap-2 text-main-color dark:text-main-color-dark text-md">
                    Descrição
                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        rows={3}
                        className="p-1.5 pl-3 outline outline-zinc-400 dark:outline-zinc-500 rounded-sm text-md text-main-color dark:text-main-color-dark
                            focus:outline-2 focus:outline-main-focus dark:focus:outline-main-focus-dark
                            bg-secondary-bg dark:bg-secondary-bg-dark/30 resize-none"
                    />
                </label>
                <label className="flex flex-col gap-2 text-main-color dark:text-main-color-dark text-md">
                    Nova imagem (opcional)
                    {imagePreviewUrl ? (
                        <div className="relative w-32 h-32">
                            <img
                                src={imagePreviewUrl}
                                alt="Pré-visualização da nova imagem"
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
                        className="flex justify-center items-center gap-2 py-2 px-3 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-main-color dark:text-main-color-dark text-md font-semibold cursor-pointer shadow-md"
                        onClick={() => setUpdate(false)}
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
