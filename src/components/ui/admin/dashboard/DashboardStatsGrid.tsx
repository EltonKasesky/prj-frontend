interface StatItem {
    title: string;
    value: number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface DashboardStatsGridProps {
    stats: StatItem[];
}

export default function DashboardStatsGrid({
    stats,
}: DashboardStatsGridProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={idx}
                        className="bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-main-border dark:border-main-border-dark shadow-md 
                            hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-main-color dark:text-main-color-dark">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-semibold text-main-color dark:text-main-color-dark mt-1">
                                {stat.title}
                            </p>
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-0.5">
                                {stat.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
