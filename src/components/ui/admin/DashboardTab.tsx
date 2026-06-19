import {
    UsersIcon,
    CheckCircle2Icon,
    AlbumIcon,
    IdCardLanyardIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AdminService } from "../../../services/admin.services";

export default function DashboardTab() {
    const [activeUsers, setActiveUsers] = useState(0);
    const [createdFigures, setCreatedFigures] = useState(0);
    const [figuresInAlbum, setFiguresInAlbum] = useState(0);

    useEffect(() => {
        const getStatsForFillDashboard = async () => {
            try {
                const response = await AdminService.getStatsForDashboardTab();
                setActiveUsers(response.activeUsers);
                setCreatedFigures(response.figuresCreated);
                setFiguresInAlbum(response.figuresInAlbum);
            } catch (error: unknown) {
                const err = error as {
                    response?: { data?: { message?: string } };
                };
                alert(
                    err.response?.data?.message ||
                        "Falha ao buscar dados para o dashboard.",
                );
            }
        };

        getStatsForFillDashboard();
    }, []);

    const stats = [
        {
            title: "Usuários Ativos",
            value: activeUsers,
            description: "Usuários ativos na aplicação",
            icon: UsersIcon,
            color: "text-emerald-500 bg-emerald-500/10",
        },
        {
            title: "Figurinhas Criadas",
            value: createdFigures,
            description: "Total de firuginhas criadas",
            icon: IdCardLanyardIcon,
            color: "text-blue-500 bg-blue-500/10",
        },
        {
            title: "Figurinhas Aplicadas",
            value: figuresInAlbum,
            description: "Total de firuginhas no Álbum",
            icon: AlbumIcon,
            color: "text-yellow-500 bg-yellow-500/10",
        },
    ];

    //TODO: Criar Logs
    const activities = [
        {
            id: 1,
            user: "Carlos Silva",
            action: "criou uma nova figurinha",
            target: "Neymar Jr - Gold Edition",
            time: "Há 5 minutos",
            type: "create",
        },
        {
            id: 2,
            user: "Ana Souza",
            action: "atualizou permissões de",
            target: "Maria Santos (Autor)",
            time: "Há 25 minutos",
            type: "update",
        },
        {
            id: 3,
            user: "Sistema",
            action: "realizou backup automático do banco de dados",
            target: "backup_prod_20260616.sql",
            time: "Há 1 hora",
            type: "system",
        },
        {
            id: 4,
            user: "Marcos Paulo",
            action: "exportou relatório de vendas",
            target: "Relatório_Junho.pdf",
            time: "Há 2 horas",
            type: "export",
        },
    ];

    return (
        <section className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-extrabold text-main-color dark:text-main-color-dark">
                    Dashboard Administrativo
                </h2>
                <p className="text-secondary-color dark:text-secondary-color-dark mt-1">
                    Visão geral do sistema, estatísticas e atividades recentes.
                </p>
            </div>

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

            {/* TODO: Criar estatisticas semanais do album */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div
                    className="lg:col-span-2 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-main-border dark:border-main-border-dark 
                        shadow-md flex flex-col justify-between"
                >
                    <div>
                        <h3 className="font-bold text-lg text-main-color dark:text-main-color-dark">
                            Engajamento da Comunidade
                        </h3>
                        <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-0.5">
                            Interações com o álbum nos últimos 7 dias.
                        </p>
                    </div>

                    <div className="flex items-end justify-between gap-3 pt-6 pb-2">
                        {[40, 55, 48, 70, 85, 62, 90].map((val, i) => (
                            <div
                                key={i}
                                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                            >
                                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-lg h-60 flex items-end overflow-hidden">
                                    <div
                                        className="w-full bg-linear-to-t from-teal-500 to-emerald-400 dark:from-yellow-600 dark:to-amber-400 group-hover:opacity-85 rounded-t-lg transition-all duration-500 ease-out"
                                        style={{ height: `${val}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-secondary-color dark:text-secondary-color-dark">
                                    {
                                        [
                                            "Domingo",
                                            "Segunda",
                                            "Terça",
                                            "Quarta",
                                            "Quinta",
                                            "Sexta",
                                            "Sábado",
                                        ][i]
                                    }
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center pt-4 border-t border-main-border dark:border-main-border-dark text-xs text-secondary-color dark:text-secondary-color-dark">
                        <span className="flex items-center gap-1 text-emerald-500">
                            <CheckCircle2Icon className="w-3.5 h-3.5" />{" "}
                            Atualizado em tempo real
                        </span>
                    </div>
                </div>

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
            </section>
        </section>
    );
}
