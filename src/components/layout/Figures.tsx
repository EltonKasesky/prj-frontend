import { useState } from "react";
import { ImagePlusIcon, Trash2Icon, XIcon } from "lucide-react";
import type { StickerResponseDTO } from "../../types/sticker.types";
import { useAuth } from "../../context/AuthContext";
import RegisterSticker from "../ui/figures/RegisterSticker";
import StickersTable from "../ui/figures/StickersTable";
import UpdateSticker from "../ui/figures/UpdateSticker";
import ClearCatalogModal from "../ui/figures/ClearCatalogModal";

export default function Figures() {
    const { isAuthor } = useAuth();

    const [stickers, setStickers] = useState<StickerResponseDTO[]>([]);
    const [register, setRegister] = useState(false);
    const [update, setUpdate] = useState(false);
    const [stickerId, setStickerId] = useState("");
    const [showClearCatalog, setShowClearCatalog] = useState(false);
    const [tableRefreshKey, setTableRefreshKey] = useState(0);

    const showRegister = () => {
        setRegister(!register);
        setUpdate(false);
    };

    const showUpdate = () => {
        setUpdate(!update);
        setRegister(false);
    };

    return (
        <main className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 p-6 md:p-10">
            <section className="mx-auto w-full max-w-6xl space-y-6 animate-fade-in">
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-main-color dark:text-main-color-dark">
                            Catálogo de Figurinhas
                        </h2>
                        <p className="text-secondary-color dark:text-secondary-color-dark mt-1">
                            {isAuthor
                                ? "Cadastre, edite e gerencie as figurinhas do álbum."
                                : "Consulte as figurinhas cadastradas no álbum."}
                        </p>
                    </div>

                    {isAuthor && (
                        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-auto">
                            {!register && !update && (
                                <button
                                    className="flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold cursor-pointer
                                        py-2.5 px-4 rounded-xl shadow-md transition-all transform hover:scale-[1.02] bg-rose-500/10 hover:bg-rose-500/20"
                                    onClick={() => setShowClearCatalog(true)}
                                >
                                    <Trash2Icon className="w-4 h-4" />
                                    Limpar Catálogo
                                </button>
                            )}

                            <button
                                className={`flex items-center justify-center gap-2 text-white text-sm font-bold cursor-pointer py-2.5 px-4 rounded-xl shadow-md transition-all
                                    transform hover:scale-[1.02] ${
                                        register || update
                                            ? "bg-red-500"
                                            : "bg-highlight-bg dark:bg-highlight-bg-dark"
                                    }`}
                                onClick={
                                    update ? () => showUpdate() : () => showRegister()
                                }
                            >
                                {update ? (
                                    <>
                                        <XIcon className="w-4 h-4" />
                                        Fechar Edição
                                    </>
                                ) : register ? (
                                    <>
                                        <XIcon className="w-4 h-4" />
                                        Fechar Criação
                                    </>
                                ) : (
                                    <>
                                        <ImagePlusIcon className="w-4 h-4" />
                                        Nova Figurinha
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </section>

                {isAuthor && update ? (
                    <UpdateSticker
                        stickerId={stickerId}
                        update={update}
                        setUpdate={setUpdate}
                    />
                ) : isAuthor && register ? (
                    <RegisterSticker setRegister={setRegister} />
                ) : (
                    <StickersTable
                        key={tableRefreshKey}
                        stickers={stickers}
                        setStickers={setStickers}
                        showUpdate={showUpdate}
                        setStickerId={setStickerId}
                    />
                )}
            </section>

            {showClearCatalog && (
                <ClearCatalogModal
                    onClose={() => setShowClearCatalog(false)}
                    onCleared={() => {
                        setShowClearCatalog(false);
                        setTableRefreshKey((prev) => prev + 1);
                    }}
                />
            )}
        </main>
    );
}
