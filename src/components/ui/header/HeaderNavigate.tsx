import LinkNavigate from "./LinkNavigate";

export default function HeaderNavigate() {
    return (
        <>
            <nav className="h-full">
                <ul className="flex h-full items-center gap-6">
                    <li>
                        <LinkNavigate url={"/"} title={"Página Inicial"} />
                    </li>
                    <li>
                        <LinkNavigate url={"/"} title={"Álbum"} />
                    </li>
                    <li>
                        <LinkNavigate url={"/"} title={"Figurinhas"} />
                    </li>
                    <li>
                        <LinkNavigate url={"/"} title={"Sobre"} />
                    </li>
                    <li>
                        <LinkNavigate url={"/"} title={"Administrador"} />
                    </li>
                </ul>
            </nav>
        </>
    );
}
