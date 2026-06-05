import type { ReactNode } from "react";
import { Link } from "react-router";

interface LinkNavigateProps {
    url: string;
    title: ReactNode;
}

export default function LinkNavigate({ url, title }: LinkNavigateProps) {
    return (
        <>
            <Link
                to={url}
                className="text-main-color dark:text-main-dark-color font-medium text-sm hover:text-main-rover dark:hover:text-main-rover-dark transition-colors"
            >
                {title}
            </Link>
        </>
    );
}
