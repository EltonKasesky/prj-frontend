import { LinkIcon } from "lucide-react";

interface DeveloperProps {
    url: string;
    name: string;
}

export default function Developer({ url, name }: DeveloperProps) {
    return (
        <>
            <a
                href={url}
                target="_blank"
                className="flex items-center gap-1 text-main-color dark:text-main-color-dark hover:text-main-rover dark:hover:text-main-rover-dark"
            >
                {name}
                <LinkIcon size={"16px"} />
            </a>
        </>
    );
}
