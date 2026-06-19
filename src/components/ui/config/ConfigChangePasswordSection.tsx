import { useEffect, useState } from "react";
import {
    LoaderCircleIcon,
    AlertCircleIcon,
    KeyRoundIcon,
    CheckCircleIcon,
    EyeIcon,
    EyeOffIcon,
    LockIcon,
} from "lucide-react";
import { UserService } from "../../../services/user.services";
import InputLabel from "../InputLabel";

export default function ConfigChangePasswordSection() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (passwordSuccess) {
            const timer = setTimeout(() => setPasswordSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [passwordSuccess]);

    const handleChangePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Todos os campos são obrigatórios.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("A nova senha deve ter no mínimo 8 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            setSavingPassword(true);
            await UserService.changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setPasswordSuccess("Senha alterada com sucesso!");
        } catch (err: unknown) {
            const errorResponse = err as {
                response?: { data?: { message?: string } };
            };
            setPasswordError(
                errorResponse.response?.data?.message ||
                    "Falha ao alterar a senha. Verifique os dados informados.",
            );
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <section className="p-6 rounded-2xl border border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark shadow-sm">
            <div className="flex items-center gap-2 mb-1">
                <LockIcon className="w-5 h-5 text-highlight-bg dark:text-highlight-bg-dark" />
                <h2 className="text-lg font-extrabold text-main-color dark:text-main-color-dark">
                    Alteração de Senha
                </h2>
            </div>
            <p className="text-sm text-secondary-color dark:text-secondary-color-dark border-b border-main-border dark:border-main-border-dark pb-4 mb-4">
                Defina uma nova senha para sua conta. A senha deve ter no mínimo
                8 caracteres.
            </p>

            <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-4"
            >
                <div className="relative">
                    <InputLabel
                        label="Senha Atual"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                        required
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 bottom-2 text-secondary-color dark:text-secondary-color-dark hover:text-main-color 
                            dark:hover:text-main-color-dark transition-colors cursor-pointer"
                        tabIndex={-1}
                    >
                        {showCurrentPassword ? (
                            <EyeOffIcon className="w-4 h-4" />
                        ) : (
                            <EyeIcon className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <InputLabel
                            label="Nova Senha"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            minLength={8}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 bottom-2 text-secondary-color dark:text-secondary-color-dark hover:text-main-color 
                                dark:hover:text-main-color-dark transition-colors cursor-pointer"
                            tabIndex={-1}
                        >
                            {showNewPassword ? (
                                <EyeOffIcon className="w-4 h-4" />
                            ) : (
                                <EyeIcon className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <InputLabel
                            label="Confirmar Nova Senha"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repita a nova senha"
                            minLength={8}
                            required
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 bottom-2 text-secondary-color dark:text-secondary-color-dark hover:text-main-color 
                                dark:hover:text-main-color-dark transition-colors cursor-pointer"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? (
                                <EyeOffIcon className="w-4 h-4" />
                            ) : (
                                <EyeIcon className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {passwordError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                        <AlertCircleIcon className="w-4 h-4 shrink-0" />
                        {passwordError}
                    </div>
                )}

                {passwordSuccess && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fade-in">
                        <CheckCircleIcon className="w-4 h-4 shrink-0" />
                        {passwordSuccess}
                    </div>
                )}

                <div className="flex justify-end border-t border-main-border dark:border-main-border-dark pt-4">
                    <button
                        type="submit"
                        disabled={savingPassword}
                        className="flex justify-center items-center w-full sm:w-auto gap-2 py-2 px-4 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                            text-white text-sm font-semibold cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {savingPassword ? (
                            <>
                                <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                                Alterando...
                            </>
                        ) : (
                            <>
                                <KeyRoundIcon className="w-4 h-4" />
                                Alterar Senha
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
