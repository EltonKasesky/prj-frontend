import {
    ShieldCheckIcon,
    PenToolIcon,
    DatabaseIcon,
} from "lucide-react";

export interface RoleConfig {
    key: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
}

export const ROLES_LIST: RoleConfig[] = [
    {
        key: "ROLE_ADMIN",
        name: "Administrador",
        description: "Acesso total ao sistema e gerenciamento de usuários.",
        icon: ShieldCheckIcon,
        activeColor:
            "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
        key: "ROLE_AUTHOR",
        name: "Autor",
        description:
            "Permissão para criar, editar e gerenciar as figurinhas do sistema.",
        icon: PenToolIcon,
        activeColor:
            "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        key: "ROLE_COLLECTOR",
        name: "Colecionador",
        description:
            "Permissão para editar e manipular as figurinhas do álbum.",
        icon: DatabaseIcon,
        activeColor:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
];

export const getInitials = (name: string): string => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
};

export const formatDate = (dateString: Date | string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const getRoleLabel = (
    role: string,
): { label: string; color: string } => {
    const roleMap: Record<string, { label: string; color: string }> = {
        ROLE_ADMIN: {
            label: "Administrador",
            color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        },
        ROLE_AUTHOR: {
            label: "Autor",
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        ROLE_COLLECTOR: {
            label: "Colecionador",
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    };
    return (
        roleMap[role] || {
            label: role,
            color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
        }
    );
};
