import { useEffect, useState } from "react";
import {
    SearchIcon,
    Edit2Icon,
    Trash2Icon,
    MailIcon,
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
    UserRoundCheckIcon,
    AlertCircleIcon,
    XIcon,
} from "lucide-react";
import { UserService } from "../../../../services/user.services";
import type { UserResponseDTO } from "../../../../types/user.types";

interface UsersTableProps {
    users: UserResponseDTO[];
    setUsers: (users: UserResponseDTO[]) => void;
    setUserId: (userId: string) => void;
    showUpdate: () => void;
}

export default function UsersTable({
    users,
    setUsers,
    setUserId,
    showUpdate,
}: UsersTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [tableError, setTableError] = useState<string | null>(null);

    useEffect(() => {
        if (tableError) {
            const timer = setTimeout(() => setTableError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [tableError]);

    const getUsers = async () => {
        try {
            const data = await UserService.getAllUsers(page, size);
            setUsers(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            setTableError(err.response?.data?.message || "Falha ao buscar usuários.");
        }
    };

    useEffect(() => {
        const fetchGetUsers = async () => {
            await getUsers();
        };

        fetchGetUsers();
    }, [page, size]);

    const disableUser = async (userId: string) => {
        try {
            await UserService.disableUserById(userId);
            await getUsers();
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            setTableError(err.response?.data?.message || "Falha ao desativar usuário.");
        }
    };

    const enableUser = async (userId: string) => {
        try {
            await UserService.enableUserById(userId);
            await getUsers();
        } catch (error: unknown) {
            const err = error as {
                response?: { data?: { message?: string } };
            };
            setTableError(err.response?.data?.message || "Falha ao ativar usuário.");
        }
    };

    const filteredUsers = users.filter(
        (user: UserResponseDTO) =>
            (user.name?.toLowerCase() || "").includes(
                searchTerm.toLowerCase(),
            ) ||
            (user.email?.toLowerCase() || "").includes(
                searchTerm.toLowerCase(),
            ) ||
            (user.roles || []).some((role) =>
                role.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
    );

    const statusColor = (userStatus: boolean) => {
        if (userStatus)
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

        return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
    };

    return (
        <>
            <section className="relative shadow-md rounded-xl">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-color dark:text-secondary-color-dark" />
                <input
                    type="text"
                    placeholder="Buscar por nome, email ou cargo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-main-bg dark:bg-main-bg-dark/50 border border-main-border dark:border-main-border-dark rounded-xl 
                            py-2 pl-10 pr-4 text-sm text-main-color dark:text-main-color-dark placeholder-secondary-color focus:outline-2 focus:outline-main-focus 
                            dark:focus:outline-main-focus-dark"
                />
            </section>

            {tableError && (
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium animate-fade-in">
                    <div className="flex items-center gap-2">
                        <AlertCircleIcon className="w-4 h-4 shrink-0" />
                        {tableError}
                    </div>
                    <button
                        onClick={() => setTableError(null)}
                        className="p-1 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                        <XIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            <section
                className="bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark shadow-md overflow-hidden 
                    animate-fade-in"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-main-border dark:border-main-border-dark bg-secondary-bg/50 dark:bg-secondary-bg-dark/50">
                                <th className="p-4 text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark">
                                    Usuário
                                </th>
                                <th className="p-4 text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark">
                                    Email
                                </th>
                                <th className="p-4 text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark">
                                    Status
                                </th>
                                <th className="p-4 text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark">
                                    Cadastro
                                </th>
                                <th className="p-4 text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark text-right">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-main-border dark:divide-main-border-dark">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user: UserResponseDTO) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-secondary-bg/20 dark:hover:bg-secondary-bg-dark/10 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-highlight-bg dark:bg-highlight-bg-dark flex items-center justify-center 
                                                        font-bold text-white"
                                                >
                                                    {(user.name || "").charAt(
                                                        0,
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-sm text-nowrap text-main-color dark:text-main-color-dark">
                                                    {user.name}
                                                </h4>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1 text-sm text-secondary-color dark:text-secondary-color-dark mt-0.5">
                                                <MailIcon className="w-4 h-4" />
                                                {user.email}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusColor(user.status)}`}
                                            >
                                                {user.status
                                                    ? "Ativo"
                                                    : "Inativo"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-secondary-color dark:text-secondary-color-dark">
                                            {
                                                user.createdAt
                                                    .toString()
                                                    .split("T")[0]
                                            }
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {user.status && (
                                                    <button
                                                        title="Editar"
                                                        className="p-2 text-secondary-color dark:text-secondary-color-dark hover:text-main-hover 
                                                        dark:hover:text-main-hover-dark rounded-lg hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark 
                                                        cursor-pointer transition-colors"
                                                        onClick={() => {
                                                            setUserId(user.id);
                                                            showUpdate();
                                                        }}
                                                    >
                                                        <Edit2Icon className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {!user.status ? (
                                                    <button
                                                        title="Ativar"
                                                        className="p-2 text-green-300 hover:text-green-500 rounded-lg hover:bg-green-500/10 cursor-pointer 
                                                            transition-colors"
                                                        onClick={() =>
                                                            enableUser(user.id)
                                                        }
                                                    >
                                                        <UserRoundCheckIcon className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        title="Desativar"
                                                        className="p-2 text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-500/10 cursor-pointer 
                                                            transition-colors"
                                                        onClick={() =>
                                                            disableUser(user.id)
                                                        }
                                                    >
                                                        <Trash2Icon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-secondary-color dark:text-secondary-color-dark"
                                    >
                                        Nenhum usuário encontrado correspondente
                                        à busca.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <section
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-main-border dark:border-main-border-dark 
                        bg-secondary-bg/20 dark:bg-secondary-bg-dark/10"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-secondary-color dark:text-secondary-color-dark">
                            Itens por página:
                        </span>
                        <select
                            value={size}
                            onChange={(e) => {
                                setSize(Number(e.target.value));
                                setPage(0);
                            }}
                            className="bg-secondary-bg dark:bg-secondary-bg-dark border border-main-border dark:border-main-border-dark rounded-lg px-2 py-1 
                                text-xs text-main-color dark:text-main-color-dark focus:outline-2 focus:outline-main-focus dark:focus:outline-main-focus-dark 
                                cursor-pointer font-medium"
                            title="Itens por Página"
                        >
                            {[5, 10, 20, 50].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <span className="text-xs text-secondary-color dark:text-secondary-color-dark font-medium">
                            Mostrando {totalElements > 0 ? page * size + 1 : 0}-
                            {Math.min((page + 1) * size, totalElements)} de{" "}
                            {totalElements} usuários
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(0)}
                            disabled={page === 0}
                            title="Primeira Página"
                            className="p-1.5 rounded-lg border border-main-border dark:border-main-border-dark text-secondary-color dark:text-secondary-color-dark 
                                hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer 
                                disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronsLeftIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() =>
                                setPage((prev) => Math.max(0, prev - 1))
                            }
                            disabled={page === 0}
                            title="Página Anterior"
                            className="p-1.5 rounded-lg border border-main-border dark:border-main-border-dark text-secondary-color dark:text-secondary-color-dark 
                                hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer 
                                disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1 px-2">
                            <span className="text-xs font-bold text-main-color dark:text-main-color-dark">
                                Página {page + 1} de {Math.max(1, totalPages)}
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                setPage((prev) =>
                                    Math.min(totalPages - 1, prev + 1),
                                )
                            }
                            disabled={page >= totalPages - 1}
                            title="Próxima Página"
                            className="p-1.5 rounded-lg border border-main-border dark:border-main-border-dark text-secondary-color dark:text-secondary-color-dark 
                                hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer 
                                disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(totalPages - 1)}
                            disabled={page >= totalPages - 1}
                            title="Última Página"
                            className="p-1.5 rounded-lg border border-main-border dark:border-main-border-dark text-secondary-color dark:text-secondary-color-dark 
                                hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer 
                                disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronsRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}
