import { useState } from "react";
import { Link } from "react-router";
import { MenuIcon, Minimize2Icon } from "lucide-react";
import logo from "../../assets/logo.jpg";
import Title from "../ui/header/Title";
import LoginButton from "../ui/header/LoginButton";
import Separator from "../ui/Separator";
import ThemeToogle from "../ui/header/ThemeToogle";
import HeaderNavigate from "../ui/header/HeaderNavigate";
import HamburguerMenu from "../ui/header/HamburguerMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="flex justify-center w-full h-16 transition-colors bg-main-bg dark:bg-main-bg-dark border-b border-main-border dark:border-main-border-dark px-4 relative">
                <div className="flex justify-between xl:w-7xl w-full items-center">
                    {/* LADO ESQUERDO: Logo e Título */}
                    <div className="flex flex-1 h-full items-center">
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
                    </div>

                    {/* LADO DIREITO (DESKTOP) */}
                    <div className="hidden lg:flex justify-end items-center flex-2 h-full">
                        <div className="flex h-full items-center">
                            <HeaderNavigate />
                            <Separator />
                            <ThemeToogle />
                            <Separator />
                            <LoginButton />
                        </div>
                    </div>

                    {/* LADO DIREITO (MOBILE/TABLET) */}
                    <div className="flex lg:hidden items-center gap-4">
                        <ThemeToogle />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-main-color dark:text-main-color-dark cursor-pointer p-2 transition-all"
                        >
                            {isMenuOpen ? <Minimize2Icon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && <HamburguerMenu setIsMenuOpen={setIsMenuOpen} />}
            </header>
        </>
    );
}
