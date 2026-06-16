import { LayoutDashboardIcon, UsersIcon } from "lucide-react";

interface SidebarItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onClose?: () => void;
}

export default function AdminSidebar({
    activeTab,
    setActiveTab,
    onClose,
}: AdminSidebarProps) {
    const menuItems: SidebarItem[] = [
        { id: "dashboard", title: "Dashboard", icon: LayoutDashboardIcon },
        { id: "usuarios", title: "Usuários", icon: UsersIcon },
    ];

    const handleItemClick = (id: string) => {
        setActiveTab(id);
        if (onClose) onClose();
    };

    return (
        <aside className="w-full h-full flex flex-col bg-main-bg dark:bg-main-bg-dark border-r border-main-border dark:border-main-border-dark py-6 select-none">
            <div className="px-6 mb-8 flex flex-col gap-1.5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-secondary-color dark:text-secondary-color-dark">
                    Gerenciamento
                </span>
                <h2 className="text-xl font-bold text-main-color dark:text-main-color-dark">
                    Painel Geral
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`w-full flex items-center gap-3 py-3 px-4 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                                isActive
                                    ? "bg-highlight-bg/10 text-highlight-color dark:bg-highlight-bg-dark/15 dark:text-highlight-color-dark border-l-4 border-highlight-bg dark:border-highlight-bg-dark pl-3"
                                    : "text-secondary-color dark:text-secondary-color-dark hover:bg-secondary-bg/60 dark:hover:bg-secondary-bg-dark/20 hover:text-main-color dark:hover:text-main-color-dark"
                            }`}
                        >
                            <Icon
                                className={`w-5 h-5 shrink-0 ${isActive ? "text-highlight-color dark:text-highlight-color-dark" : ""}`}
                            />
                            <span>{item.title}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="px-6 mt-auto border-t border-main-border dark:border-main-border-dark pt-6 text-xs text-secondary-color dark:text-secondary-color-dark font-medium">
                <span>Painel Administrativo</span>
            </div>
        </aside>
    );
}
