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
            className="flex flex-col items-center p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl shadow-sm border border-main-border dark:border-main-border-dark 
                transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
            <div className="p-3 bg-secondary-bg dark:bg-secondary-bg-dark text-highlight-color dark:text-highlight-color-dark rounded-xl mb-4">
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
