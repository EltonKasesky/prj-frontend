import { useState } from "react";
import InputLabel from "../InputLabel";
import { UserService } from "../../../services/user.services";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await UserService.createUser({ name, email, password });
            cleanFields();
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            alert(err.response?.data?.message || "Falha ao criar usuário.");
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
                    bg-secondary-bg dark:bg-main-bg-dark animate-fade-in"
            >
                <h2 className="text-xl font-semibold text-main-color dark:text-main-color-dark">
                    Registrar novo usuário
                </h2>
                <p className="text-secondary-color dark:text-secondary-color-dark">
                    Para registrar um novo usuário, preencha os campos abaixo e
                    posteriormente informe os dados de acesso ao usuário
                </p>
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
                        placeholder={"Nome..."}
                        required
                    />
                    <InputLabel
                        label={"Email"}
                        type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={"example@email.com"}
                        required
                    />
                    <InputLabel
                        label={"Senha"}
                        type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="********"
                        required
                    />

                    <button
                        className="p-2 bg-highlight-bg dark:bg-highlight-bg-dark hover:scale-[1.01] rounded-md transition
                    text-white text-lg font-semibold cursor-pointer"
                        type="submit"
                    >
                        Criar usuário
                    </button>
                </form>
            </section>
        </>
    );
}
