import { useState } from "react";
import { Link } from "react-router";
import { MenuIcon, Minimize2Icon } from "lucide-react";
import logo from "../../assets/logo.png";
import Title from "../ui/header/Title";
import LoginButton from "../ui/header/LoginButton";
import Separator from "../ui/Separator";
import ThemeToogle from "../ui/header/ThemeToogle";
import HeaderNavigate from "../ui/header/HeaderNavigate";
import HamburguerMenu from "../ui/header/HamburguerMenu";
import { useAuth } from "../../context/AuthContext";
import ProfileDownMenu from "../ui/header/ProfileDownMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <>
            <header className="flex justify-center w-full h-16 transition-colors bg-main-bg dark:bg-main-bg-dark border-b border-main-border dark:border-main-border-dark px-4 relative">
                <section className="flex justify-between xl:w-7xl w-full items-center">
                    {/* LADO ESQUERDO: Logo e Título */}
                    <section className="flex flex-1 h-full items-center">
                        <Link
                            to={"/"}
                            className="flex items-center gap-2 h-full"
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-[70%] object-contain"
                            />
                            <Title />
                        </Link>
                    </section>

                    {/* LADO DIREITO (DESKTOP) */}
                    <section className="hidden lg:flex justify-end items-center flex-2 h-full">
                        <div className="flex h-full items-center">
                            <HeaderNavigate />
                            <Separator />
                            <ThemeToogle />
                            <Separator />
                            {isAuthenticated ? (
                                <ProfileDownMenu />
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </section>

                    {/* LADO DIREITO (MOBILE/TABLET) */}
                    <section className="flex lg:hidden items-center gap-4">
                        <ThemeToogle />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-main-color dark:text-main-color-dark cursor-pointer p-2 transition-all"
                        >
                            {isMenuOpen ? <Minimize2Icon /> : <MenuIcon />}
                        </button>
                    </section>
                </section>

                {isMenuOpen && <HamburguerMenu setIsMenuOpen={setIsMenuOpen} />}
            </header>
        </>
    );
}
