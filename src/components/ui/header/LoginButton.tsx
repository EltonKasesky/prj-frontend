import { UserIcon } from "lucide-react";
import { Link } from "react-router";

export default function LoginButton() {
    return (
        <>
            <Link
                to={"/login"}
                className="flex items-center gap-2 p-2 pr-3 rounded-full text-sm font-semibold text-main-color dark:text-main-color-dark 
                    bg-secondary-bg dark:bg-secondary-bg-dark hover:text-highlight-hover dark:hover:text-highlight-hover-dark transition-colors cursor-pointer"
            >
                <UserIcon />
                Entrar
            </Link>
        </>
    );
}
