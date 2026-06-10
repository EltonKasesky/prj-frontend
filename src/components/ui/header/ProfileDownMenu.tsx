import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    LogOutIcon,
    UserIcon,
    SettingsIcon,
    ChevronDownIcon,
} from "lucide-react";
import ProfileDownMenuLink from "./ProfileDownMenuLink";

export default function ProfileDownMenu() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            )
                setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-secondary-bg dark:bg-secondary-bg-dark hover:bg-zinc-200 dark:hover:bg-zinc-800 
                    transition-colors cursor-pointer group focus:outline-hidden focus:ring-2 focus:text-main-focus focus:dark:text-main-focus-dark"
            >
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-teal-500 to-emerald-500 dark:from-amber-200 
                        dark:to-amber-500 text-white font-bold text-sm shadow-xs"
                >
                    {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                    ) : (
                        <UserIcon className="w-4 h-4" />
                    )}
                </div>

                <span className="text-sm font-semibold text-main-color dark:text-main-color-dark max-w-30 truncate">
                    {user?.name ? user.name.split(" ")[0] : "Conta"}
                </span>

                <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen
                            ? "rotate-180 text-highlight-color dark:text-highlight-color-dark"
                            : "text-secondary-color group-hover:text-zinc-600"
                    }`}
                />
            </button>

            {isOpen && (
                <section
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-main-bg dark:bg-main-bg-dark border border-main-border dark:border-main-border-dark 
                        shadow-xl shadow-zinc-200/50 dark:shadow-none p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                    <div className="px-3 py-2.5 mb-1 border-b border-main-border dark:border-main-border-dark">
                        <p className="text-xs font-medium text-secondary-color dark:text-secondary-color-dark">
                            Logado como
                        </p>
                        <p className="text-sm font-bold text-main-color dark:text-main-color-dark truncate">
                            {user?.email}
                        </p>
                    </div>

                    <ProfileDownMenuLink
                        to={"/"}
                        icon={UserIcon}
                        text={"Meu perfil"}
                        setIsOpen={setIsOpen}
                    />

                    <ProfileDownMenuLink
                        to={"/"}
                        icon={SettingsIcon}
                        text={"Configurações"}
                        setIsOpen={setIsOpen}
                    />

                    <div className="my-1 border-t border-main-border dark:border-main-border-dark" />

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer text-left"
                    >
                        <LogOutIcon className="w-4 h-4" />
                        Sair da conta
                    </button>
                </section>
            )}
        </section>
    );
}
