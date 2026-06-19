import { MailIcon, CalendarIcon, BadgeCheckIcon } from "lucide-react";
import type { UserResponseDTO } from "../../../types/user.types";
import { getInitials, formatDate } from "../../../utils/user.utils";

interface ProfileCardProps {
    profile: UserResponseDTO;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <section
            className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8 rounded-2xl border border-main-border 
                dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark shadow-sm relative overflow-hidden"
        >
            <div
                className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-yellow-600 
                    dark:via-amber-400 dark:to-amber-200"
            />

            <div className="relative group">
                <div
                    className="w-24 h-24 rounded-full bg-linear-to-tr from-teal-500 to-emerald-500 dark:from-amber-200 dark:to-amber-500 
                        text-white font-extrabold text-3xl shadow-md flex items-center justify-center transition-transform hover:scale-105 duration-300"
                >
                    {getInitials(profile.name)}
                </div>
                <div
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-main-bg dark:bg-main-bg-dark border border-main-border 
                    dark:border-main-border-dark shadow-sm text-highlight-color dark:text-highlight-color-dark"
                >
                    <BadgeCheckIcon className="w-5 h-5 text-main-color dark:text-main-color-dark" />
                </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2 mt-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-2xl font-black text-main-color dark:text-main-color-dark tracking-tight">
                        {profile.name}
                    </h1>
                </div>
                <p className="text-secondary-color dark:text-secondary-color-dark text-md flex items-center justify-center md:justify-start gap-2">
                    <MailIcon className="w-4 h-4 text-secondary-color dark:text-secondary-color-dark" />
                    {profile.email}
                </p>
                <p className="text-xs text-secondary-color dark:text-secondary-color-dark flex items-center justify-center md:justify-start gap-2">
                    <CalendarIcon className="w-4 h-4 text-secondary-color dark:text-secondary-color-dark" />
                    Membro desde {formatDate(profile.createdAt)}
                </p>
            </div>
        </section>
    );
}
