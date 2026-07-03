import { useEffect, useState } from "react";
import InputLabel from "../../InputLabel";
import { UserService } from "../../../../services/user.services";
import { ProfileService } from "../../../../services/profile.services";
import {
    AlertCircleIcon,
    CheckCircleIcon,
    CheckIcon,
    DatabaseIcon,
    LoaderCircleIcon,
    PenToolIcon,
    ShieldCheckIcon,
    Undo2Icon,
    UserPlusIcon,
} from "lucide-react";

interface RegisterProps {
    setRegister: (register: boolean) => void;
}

interface RoleConfig {
    key: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
}

const rolesList: RoleConfig[] = [
    {
        key: "ROLE_ADMIN",
        name: "Administrador",
        description: "Acesso total ao sistema e gerenciamento de usuários.",
        icon: ShieldCheckIcon,
        activeColor:
            "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
        key: "ROLE_AUTHOR",
        name: "Autor",
        description:
            "Permissão para criar, editar e gerenciar as figurinhas do sistema.",
        icon: PenToolIcon,
        activeColor:
            "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        key: "ROLE_COLLECTOR",
        name: "Colecionador",
        description:
            "Permissão para editar e manipular as figurinhas do álbum.",
        icon: DatabaseIcon,
        activeColor:
            "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
];

export default function Register({ setRegister }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (registerSuccess) {
            const timer = setTimeout(() => setRegisterSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [registerSuccess]);

    const handleRoleToggle = (roleKey: string) => {
        if (selectedRoles.includes(roleKey)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== roleKey));
        } else {
            setSelectedRoles([...selectedRoles, roleKey]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);
            setRegisterError(null);
            setRegisterSuccess(null);

            const createdUser = await UserService.createUser(
                name,
                email,
                password,
            );

            if (selectedRoles.length > 0) {
                await ProfileService.addProfilesToUser(createdUser.id, {
                    profileNames: selectedRoles,
                });
            }

            cleanFields();
            setRegisterSuccess("Usuário criado com sucesso!");
        } catch (error: unknown) {
            cleanFields();

            const err = error as {
                response?: { data?: { message?: string } };
            };
            setRegisterError(
                err.response?.data?.message || "Falha ao criar usuário.",
            );
        } finally {
            setLoading(false);
        }
    };

    const cleanFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setSelectedRoles([]);
    };

    return (
        <>
            <section
                className="flex flex-col gap-4 w-full p-4 rounded-lg border border-main-border dark:border-main-border-dark
                    bg-main-bg dark:bg-main-bg-dark animate-fade-in"
            >
                <h2 className="text-xl font-semibold text-main-color dark:text-main-color-dark">
                    Cadastrar novo usuário
                </h2>
                <p className="text-secondary-color dark:text-secondary-color-dark border-b border-main-border dark:border-main-border-dark pb-4">
                    Preencha os dados abaixo para criar uma nova conta de acesso
                    ao sistema. Após a criação, compartilhe as credenciais de
                    acesso com o usuário.
                </p>
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="flex flex-col gap-3"
                >
                    <InputLabel
                        label={"Nome Completo"}
                        type={"text"}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={"Ex.: João Silva"}
                        required
                    />
                    <InputLabel
                        label={"E-mail"}
                        type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={"usuario@email.com"}
                        required
                    />
                    <InputLabel
                        label={"Senha"}
                        type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={"Defina uma senha temporária"}
                        min={8}
                        required
                    />

                    <div className="flex flex-col gap-3 pt-2">
                        <label className="text-sm font-bold text-main-color dark:text-main-color-dark">
                            Perfis de Acesso (opcional)
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {rolesList.map((role) => {
                                const isSelected = selectedRoles.includes(
                                    role.key,
                                );
                                const IconComponent = role.icon;

                                return (
                                    <button
                                        key={role.key}
                                        type="button"
                                        onClick={() =>
                                            handleRoleToggle(role.key)
                                        }
                                        className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer select-none group relative ${
                                            isSelected
                                                ? role.activeColor +
                                                  " shadow-sm ring-1 ring-offset-0 ring-current"
                                                : "border-main-border dark:border-main-border-dark bg-secondary-bg dark:bg-secondary-bg-dark/40 hover:border-secondary-color dark:hover:border-secondary-color-dark"
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? "bg-main-bg dark:bg-secondary-bg-dark border-transparent text-main-color dark:text-main-color-dark"
                                                    : "border-main-border dark:border-main-border-dark bg-transparent group-hover:border-secondary-color dark:group-hover:border-secondary-color-dark"
                                            }`}
                                        >
                                            {isSelected && (
                                                <CheckIcon className="w-3.5 h-3.5 stroke-3" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div
                                                className={`p-2 rounded-lg ${
                                                    isSelected
                                                        ? "bg-main-bg dark:bg-main-bg-dark"
                                                        : "bg-main-bg dark:bg-main-bg-dark text-secondary-color dark:text-secondary-color-dark"
                                                }`}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-md text-main-color dark:text-main-color-dark">
                                                {role.name}
                                            </span>
                                        </div>

                                        <p className="text-sm leading-relaxed text-secondary-color dark:text-secondary-color-dark">
                                            {role.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-b border-main-border dark:border-main-border-dark pb-4"></div>

                    {registerError && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                            <AlertCircleIcon className="w-4 h-4 shrink-0" />
                            {registerError}
                        </div>
                    )}

                    {registerSuccess && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fade-in">
                            <CheckCircleIcon className="w-4 h-4 shrink-0" />
                            {registerSuccess}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            className="flex justify-center items-center gap-2 py-2 px-3 bg-secondary-bg dark:bg-secondary-bg-dark hover:scale-[1.02] rounded-lg transition
                                text-main-color dark:text-main-color-dark text-md font-semibold cursor-pointer shadow-md"
                            onClick={() => setRegister(false)}
                        >
                            <Undo2Icon className="w-4 h-4" />
                            Cancelar
                        </button>
                        <button
                            className="flex justify-center items-center gap-2 py-2 px-3 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.02] rounded-lg transition
                                text-white text-md font-semibold cursor-pointer shadow-md"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                                    Criando usuário...
                                </>
                            ) : (
                                <>
                                    <UserPlusIcon className="w-4 h-4" />
                                    Criar usuário
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}
