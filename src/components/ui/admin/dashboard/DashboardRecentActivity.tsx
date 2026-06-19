interface Activity {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
    type: string;
}

interface DashboardRecentActivityProps {
    activities: Activity[];
}

export default function DashboardRecentActivity({
    activities,
}: DashboardRecentActivityProps) {
    return (
        <div className="bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-main-border dark:border-main-border-dark shadow-md">
            <h3 className="font-bold text-lg text-main-color dark:text-main-color-dark">
                Atividade Recente
            </h3>
            <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-0.5">
                Logs de ações executadas no painel.
            </p>

            <div className="mt-6 space-y-4">
                {activities.map((act) => (
                    <div
                        key={act.id}
                        className="flex items-start gap-3 text-sm border-b border-main-border dark:border-main-border-dark pb-3 last:border-0 last:pb-0"
                    >
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-highlight-bg dark:bg-highlight-bg-dark shrink-0" />
                        <div className="flex-1">
                            <p className="text-main-color dark:text-main-color-dark leading-relaxed">
                                <span className="font-bold">
                                    {act.user}
                                </span>{" "}
                                {act.action}{" "}
                                <span className="font-semibold text-secondary-color dark:text-secondary-color-dark italic">
                                    {act.target}
                                </span>
                            </p>
                            <span className="text-xs text-secondary-color dark:text-secondary-color-dark mt-1 block">
                                {act.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
