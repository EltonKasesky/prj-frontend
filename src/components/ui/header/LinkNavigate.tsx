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
                className="text-main-color dark:text-main-color-dark font-medium text-sm hover:text-main-hover dark:hover:text-main-hover-dark transition-colors"
            >
                {title}
            </Link>
        </>
    );
}
