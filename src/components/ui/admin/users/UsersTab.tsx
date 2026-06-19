import { useState } from "react";
import { UserPlusIcon, XIcon } from "lucide-react";
import type { UserResponseDTO } from "../../../../types/user.types";
import RegisterUser from "./RegisterUser";
import UsersTable from "./UsersTable";
import UpdateUser from "./UpdateUser";

export default function UsersTab() {
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [register, setRegister] = useState(false);
    const [update, setUpdate] = useState(false);
    const [userId, setUserId] = useState("");

    const showRegister = () => {
        setRegister(!register);
        setUpdate(false);
    };

    const showUpdate = () => {
        setUpdate(!update);
        setRegister(false);
    };

    return (
        <section className="space-y-6 animate-fade-in">
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-main-color dark:text-main-color-dark">
                        Gerenciamento de Usuários
                    </h2>
                    <p className="text-secondary-color dark:text-secondary-color-dark mt-1">
                        Crie, edite e administre os perfis de usuários do
                        sistema.
                    </p>
                </div>

                <button
                    className={`flex items-center justify-center gap-2 text-white text-sm font-bold cursor-pointer py-2.5 px-4 rounded-xl shadow-md transition-all 
                        transform hover:scale-[1.02] shrink-0 self-start sm:self-auto ${
                            register || update
                                ? "bg-red-500"
                                : "bg-highlight-bg dark:bg-highlight-bg-dark"
                        }`}
                    onClick={update ? () => showUpdate() : () => showRegister()}
                >
                    {update ? (
                        <>
                            <XIcon className="w-4 h-4" />
                            Fechar Atualização
                        </>
                    ) : register ? (
                        <>
                            <XIcon className="w-4 h-4" />
                            Fechar Criação
                        </>
                    ) : (
                        <>
                            <UserPlusIcon className="w-4 h-4" />
                            Novo Usuário
                        </>
                    )}
                </button>
            </section>

            {update ? (
                <UpdateUser
                    userId={userId}
                    update={update}
                    setUpdate={setUpdate}
                />
            ) : register ? (
                <RegisterUser setRegister={setRegister} />
            ) : (
                <UsersTable
                    users={users}
                    setUsers={setUsers}
                    showUpdate={showUpdate}
                    setUserId={setUserId}
                />
            )}
        </section>
    );
}
