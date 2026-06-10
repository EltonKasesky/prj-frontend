import type { LucideIcon } from "lucide-react";
import { Link, type LinkProps } from "react-router";

interface ProfileDownMenuLinkProps extends LinkProps {
    icon: LucideIcon;
    text: string;
    setIsOpen(open: boolean): void;
}

export default function ProfileDownMenuLink({
    icon: Icon,
    text,
    setIsOpen,
    ...props
}: ProfileDownMenuLinkProps) {
    return (
        <>
            <Link
                {...props}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-secondary-color dark:text-secondary-color-dark 
                hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark hover:text-main-hover dark:hover:text-main-hover-dark rounded-xl transition-colors"
            >
                <Icon className="w-4 h-4" />
                {text}
            </Link>
        </>
    );
}
