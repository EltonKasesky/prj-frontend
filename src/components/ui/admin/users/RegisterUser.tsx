import { useState } from "react";
import InputLabel from "../../InputLabel";
import { UserService } from "../../../../services/user.services";
import { LoaderCircleIcon, Undo2Icon, UserPlusIcon } from "lucide-react";

interface RegisterProps {
    register: boolean;
    setRegister: (register: boolean) => void;
}

export default function Register({ register, setRegister }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);
            await UserService.createUser(name, email, password);

            cleanFields();
            setRegister(!register);
        } catch (error: unknown) {
            cleanFields();

            const err = error as {
                response?: { data?: { message?: string } };
            };
            alert(err.response?.data?.message || "Falha ao criar usuário.");
        } finally {
            setLoading(false);
        }
    };

    const cleanFields = () => {
        setName("");
        setEmail("");
        setPassword("");
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

                    <div className="border-b border-main-border dark:border-main-border-dark pb-4"></div>

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
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
