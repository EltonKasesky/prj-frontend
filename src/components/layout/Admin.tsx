import { useState } from "react";
import { MenuIcon, XIcon, ShieldCheckIcon } from "lucide-react";
import AdminSidebar from "../ui/admin/AdminSidebar";
import DashboardTab from "../ui/admin/DashboardTab";
import UsersTab from "../ui/admin/UsersTab";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const renderActiveContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardTab />;
            case "usuarios":
                return <UsersTab />;
            default:
                return <DashboardTab />;
        }
    };

    const getTabTitle = () => {
        switch (activeTab) {
            case "dashboard":
                return "Dashboard";
            case "usuarios":
                return "Usuários";
            default:
                return "Dashboard";
        }
    };

    return (
        <main className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4rem)] bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300">
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-main-bg dark:bg-main-bg-dark border-b border-main-border dark:border-main-border-dark shrink-0">
                <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-highlight-color dark:text-highlight-color-dark" />
                    <span className="font-bold text-sm text-main-color dark:text-main-color-dark">
                        Admin / {getTabTitle()}
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 text-main-color dark:text-main-color-dark bg-secondary-bg dark:bg-secondary-bg-dark border border-main-border dark:border-main-border-dark rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                    <MenuIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="hidden md:block w-64 shrink-0 h-auto">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>

            {isMobileOpen && (
                <>
                    <div
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black/60 z-45 md:hidden transition-opacity duration-300 backdrop-blur-xs"
                    />

                    <div className="fixed inset-y-0 left-0 w-64 z-50 md:hidden bg-main-bg dark:bg-main-bg-dark flex flex-col shadow-2xl transition-transform duration-300 animate-slide-in">
                        <div className="absolute top-4 right-4 z-55">
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 text-main-color dark:text-main-color-dark bg-secondary-bg dark:bg-secondary-bg-dark border border-main-border dark:border-main-border-dark rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <AdminSidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onClose={() => setIsMobileOpen(false)}
                        />
                    </div>
                </>
            )}

            <div className="flex-1 p-6 md:p-10 bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 overflow-y-auto">
                <div className="mx-auto">{renderActiveContent()}</div>
            </div>
        </main>
    );
}
