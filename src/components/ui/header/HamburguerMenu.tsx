import LinkNavigate from "./LinkNavigate";
import LoginButton from "./LoginButton";

interface HamburguerMenuProps {
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function HamburguerMenu({ setIsMenuOpen }: HamburguerMenuProps) {
    return (
        <>
            <div className="absolute top-16 left-0 w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-6 shadow-xl lg:hidden z-50 transition-all">
                <nav>
                    <ul className="flex flex-col gap-4">
                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/"} title={"Album"} />
                        </li>
                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/"} title={"Usuários"} />
                        </li>
                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/"} title={"Sobre"} />
                        </li>
                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/"} title={"Administrador"} />
                        </li>
                    </ul>
                </nav>
                <hr className="border-zinc-200 dark:border-zinc-700" />
                <div className="flex justify-center items-center gap-2 w-full">
                    <LoginButton />
                </div>
            </div>
        </>
    );
}
