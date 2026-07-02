import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Loader2Icon } from "lucide-react";

interface AdminGuardProps {
    children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    const canShowAdminPage = () => {
        if (isAuthenticated && isAdmin) return true;

        return false;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-main-bg dark:bg-main-bg-dark transition-colors duration-300">
                <div className="flex flex-col items-center gap-4">
                    <Loader2Icon className="w-12 h-12 animate-spin text-highlight-color dark:text-highlight-color-dark" />
                    <p className="text-sm font-medium tracking-wide text-secondary-color dark:text-secondary-color-dark animate-pulse">
                        Verificando credenciais...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!canShowAdminPage()) {
        return <Navigate to="/404" replace />;
    }

    return <>{children}</>;
}
