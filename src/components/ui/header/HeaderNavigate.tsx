import { useAuth } from "../../../context/AuthContext";
import LinkNavigate from "./LinkNavigate";

export default function HeaderNavigate() {
    const { isAdmin, isAuthor, isCollector } = useAuth();

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
            <nav className="h-full">
                <ul className="flex h-full items-center gap-6">
                    <li>
                        <LinkNavigate url={"/"} title={"Página Inicial"} />
                    </li>

                    {showLinkAlbum() && (
                        <li>
                            <LinkNavigate url={"/album"} title={"Álbum"} />
                        </li>
                    )}

                    {showLinkFigures() && (
                        <li>
                            <LinkNavigate
                                url={"/figures"}
                                title={"Figurinhas"}
                            />
                        </li>
                    )}

                    <li>
                        <LinkNavigate url={"/about"} title={"Sobre"} />
                    </li>
                </ul>
            </nav>
        </>
    );
}
