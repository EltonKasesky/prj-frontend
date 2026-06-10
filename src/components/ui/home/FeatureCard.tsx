import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({
    icon: Icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <div
            className="flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 
                transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 text-highlight-color dark:text-highlight-color-dark rounded-xl mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-main-color dark:text-main-color-dark mb-2">
                {title}
            </h3>
            <p className="text-sm text-secondary-color dark:text-secondary-color-dark text-center leading-relaxed">
                {description}
            </p>
        </div>
    );
}
