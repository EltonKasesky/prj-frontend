import { CornerDownLeftIcon, LogInIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import ThemeToogle from "../ui/header/ThemeToogle";
import InputLabel from "../ui/InputLabel";
import logo from "../../assets/login.png";
import { AuthService } from "../../services/auth.services";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await AuthService.authUser(email, password);
            await login(response.token);
            navigate("/");
        } catch (error: any) {
            alert(error.response?.data?.message || "Falha ao realizar login");
        }
    };

    return (
        <>
            <main
                className="flex flex-col-reverse lg:flex-row justify-center items-center w-full h-screen bg-main-bg dark:bg-main-bg-dark
                    lg:bg-secondary-bg lg:dark:bg-secondary-bg-dark"
            >
                <section className="flex flex-1 w-full justify-center items-center max-w-md lg:h-120 rounded-l-md bg-main-bg dark:bg-main-bg-dark">
                    <img
                        src={logo}
                        alt="Logo"
                        className="max-w-full max-h-full object-cover"
                    />
                </section>

                <section
                    className="flex lg:flex-1 flex-col gap-4 lg:gap-0 lg:justify-evenly relative w-full sm:max-w-xl lg:max-w-md lg:h-120 p-4 rounded-r-lg 
                        bg-main-bg dark:bg-main-bg-dark"
                >
                    <section>
                        <Link to={"/"} className="absolute top-4 left-4">
                            <CornerDownLeftIcon
                                className="text-main-color dark:text-main-color-dark hover:text-main-hover 
                                dark:hover:text-main-hover-dark transition-colors"
                            />
                        </Link>
                        <span className="absolute top-4 right-4">
                            <ThemeToogle />
                        </span>
                        <h1 className="text-3xl text-center font-semibold text-main-color dark:text-main-color-dark">
                            Bem Vindo!
                        </h1>
                    </section>

                    <section>
                        <p className="text-md text-secondary-color dark:text-secondary-color-dark">
                            Para realizar o registro, deve-se entrar em contato
                            com um administrador e solicitar a criação de uma
                            conta. Caso possua uma conta preencha os campos
                            abaixo e prossiga.
                        </p>
                    </section>

                    <form onSubmit={handleSubmit} method="post">
                        <section className="flex flex-col gap-5 mt-3">
                            <InputLabel
                                label={"Email"}
                                type={"email"}
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                            <InputLabel
                                label={"Senha"}
                                type={"password"}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />

                            <button
                                type="submit"
                                className="flex items-center justify-center py-2 bg-highlight-bg dark:bg-highlight-bg-dark text-white text-md font-bold cursor-pointer
                                    rounded-md shadow-md shadow-teal-500/20 dark:shadow-yellow-600 transition-all transform hover:scale-[1.02]"
                            >
                                <LogInIcon className="w-5 h-5 mr-2" />
                                Entrar
                            </button>
                        </section>
                    </form>
                </section>
            </main>
        </>
    );
}
