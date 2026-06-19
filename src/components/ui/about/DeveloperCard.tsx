import { Link2Icon, MailIcon } from "lucide-react";
import { getInitials } from "../../../utils/user.utils";
import linkedinIcon from "../../../assets/icons/linkedin.png";
import githubIcon from "../../../assets/icons/github.png";

interface DeveloperCardProps {
    name: string;
    role: string;
    bio: string;
    avatarUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    email?: string;
}

export default function DeveloperCard({
    name,
    role,
    bio,
    avatarUrl,
    githubUrl,
    linkedinUrl,
    email,
}: DeveloperCardProps) {
    return (
        <div
            className="flex flex-col items-center p-6 sm:p-8 bg-main-bg dark:bg-main-bg-dark rounded-3xl border border-main-border dark:border-main-border-dark 
                shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
            <div
                className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-yellow-600 
                    dark:via-amber-400 dark:to-amber-200"
            />

            <div className="relative mb-5 group">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={`Foto de ${name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-main-border dark:border-main-border-dark 
                            shadow-sm transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-24 h-24 rounded-full bg-linear-to-tr from-teal-500 to-emerald-500 dark:from-yellow-600 dark:to-amber-400 
                            text-white font-extrabold text-3xl shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-105"
                    >
                        {getInitials(name)}
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-main-color dark:text-main-color-dark text-center tracking-tight">
                {name}
            </h3>
            <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-bg dark:bg-secondary-bg-dark text-highlight-color 
                    dark:text-highlight-color-dark mt-2 border border-main-border/50 dark:border-main-border-dark/50"
            >
                {role}
            </span>

            <p className="mt-4 text-sm text-secondary-color dark:text-secondary-color-dark text-center leading-relaxed max-w-xs flex-1">
                {bio}
            </p>

            <div className="mt-6 flex items-center gap-4">
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-color dark:text-secondary-color-dark 
                            hover:text-main-color dark:hover:text-white border border-main-border dark:border-main-border-dark transition-colors"
                        title="GitHub"
                        aria-label={`GitHub de ${name}`}
                    >
                        <img
                            src={githubIcon}
                            alt="GitHub"
                            className="w-5 h-5"
                        />
                    </a>
                )}
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-color dark:text-secondary-color-dark 
                            hover:text-main-color dark:hover:text-white border border-main-border dark:border-main-border-dark transition-colors"
                        title="LinkedIn"
                        aria-label={`LinkedIn de ${name}`}
                    >
                        <img
                            src={linkedinIcon}
                            alt="Linkedin"
                            className="w-5 h-5"
                        />
                    </a>
                )}
                {email && (
                    <a
                        href={`mailto:${email}`}
                        className="p-2.5 rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-color dark:text-secondary-color-dark 
                            hover:text-main-color dark:hover:text-white border border-main-border dark:border-main-border-dark transition-colors"
                        title="E-mail"
                        aria-label={`E-mail de ${name}`}
                    >
                        <MailIcon className="w-5 h-5" />
                    </a>
                )}
            </div>
        </div>
    );
}
