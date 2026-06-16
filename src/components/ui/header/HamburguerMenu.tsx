import { useAuth } from "../../../context/AuthContext";
import LinkNavigate from "./LinkNavigate";
import LoginButton from "./LoginButton";
import ProfileDownMenu from "./ProfileDownMenu";

interface HamburguerMenuProps {
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function HamburguerMenu({ setIsMenuOpen }: HamburguerMenuProps) {
    const { isAuthenticated, isAdmin, isAuthor, isCollector } = useAuth();

    const showLinkAlbum = () => {
        if (isAdmin || isAuthor || isCollector) return true;

        return false;
    };

    const showLinkFigures = () => {
        if (isAdmin || isAuthor) return true;

        return false;
    };

    return (
        <>
            <section className="absolute top-16 left-0 w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-6 shadow-xl lg:hidden z-50 transition-all">
                <nav>
                    <ul className="flex flex-col gap-4">
                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/"} title={"Página Inicial"} />
                        </li>

                        {showLinkAlbum() && (
                            <li onClick={() => setIsMenuOpen(false)}>
                                <LinkNavigate url={"/album"} title={"Album"} />
                            </li>
                        )}

                        {showLinkFigures() && (
                            <li onClick={() => setIsMenuOpen(false)}>
                                <LinkNavigate
                                    url={"/figures"}
                                    title={"Figurinhas"}
                                />
                            </li>
                        )}

                        <li onClick={() => setIsMenuOpen(false)}>
                            <LinkNavigate url={"/about"} title={"Sobre"} />
                        </li>
                    </ul>
                </nav>
                <hr className="border-zinc-200 dark:border-zinc-700" />
                <div className="flex justify-center items-center gap-2 w-full">
                    {isAuthenticated ? <ProfileDownMenu /> : <LoginButton />}
                </div>
            </section>
        </>
    );
}
