import { useState } from "react";
import { AlertCircleIcon, CheckCircleIcon, LoaderCircleIcon, PlusIcon } from "lucide-react";
import { UserStickerService } from "../../../services/userSticker.services";

interface AcquireStickerFormProps {
    onAcquired: () => Promise<void>;
}

export default function AcquireStickerForm({
    onAcquired,
}: AcquireStickerFormProps) {
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            await UserStickerService.acquireSticker(tag);
            await onAcquired();

            setTag("");
            setSuccess("Figurinha adquirida com sucesso!");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: unknown) {
            const e = err as { response?: { data?: { message?: string } } };
            setError(
                e.response?.data?.message || "Falha ao adquirir figurinha.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-4 rounded-xl border border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark"
        >
            <span className="text-sm font-bold text-main-color dark:text-main-color-dark">
                Adquirir figurinha
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                    placeholder="Digite a tag da figurinha"
                    required
                    className="flex-1 p-2 pl-3 outline outline-zinc-400 dark:outline-zinc-500 rounded-sm text-sm text-main-color dark:text-main-color-dark
                        focus:outline-2 focus:outline-main-focus dark:focus:outline-main-focus-dark
                        bg-secondary-bg dark:bg-secondary-bg-dark/30"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                        text-white text-sm font-semibold cursor-pointer shadow-md shrink-0"
                >
                    {loading ? (
                        <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                    ) : (
                        <PlusIcon className="w-4 h-4" />
                    )}
                    Adquirir
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium animate-fade-in">
                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                    {error}
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium animate-fade-in">
                    <CheckCircleIcon className="w-3.5 h-3.5 shrink-0" />
                    {success}
                </div>
            )}
        </form>
    );
}
