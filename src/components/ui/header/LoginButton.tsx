import { LogInIcon } from "lucide-react";
import { Link } from "react-router";

export default function LoginButton() {
    return (
        <>
            <Link
                to={"/"}
                className="flex items-center gap-2 font-medium text-sm text-main-color dark:text-main-dark-color hover:text-main-rover dark:hover:text-main-rover-dark transition-colors"
            >
                Login
                <LogInIcon />
            </Link>
        </>
    );
}
