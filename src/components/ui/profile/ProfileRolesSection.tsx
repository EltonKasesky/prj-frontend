import { UserXIcon } from "lucide-react";
import { ROLES_LIST } from "../../../utils/user.utils";

interface ProfileRolesSectionProps {
    roles: string[];
}

export default function ProfileRolesSection({
    roles,
}: ProfileRolesSectionProps) {
    const userRolesConfig = ROLES_LIST.filter((role) =>
        roles.includes(role.key),
    );

    return (
        <section
            className="md:col-span-2 p-6 rounded-2xl border border-main-border dark:border-main-border-dark 
                bg-main-bg dark:bg-main-bg-dark shadow-sm flex flex-col"
        >
            <h2
                className="text-lg font-extrabold text-main-color dark:text-main-color-dark border-b border-main-border 
                    dark:border-main-border-dark pb-2 mb-4"
            >
                Cargos & Níveis de Acesso
            </h2>

            {userRolesConfig.length > 0 ? (
                <div className="flex-1 flex flex-col gap-4">
                    <p className="text-sm text-secondary-color dark:text-secondary-color-dark mb-2">
                        Seu perfil possui as seguintes atribuições e permissões
                        no sistema:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {userRolesConfig.map((role) => {
                            const IconComponent = role.icon;
                            return (
                                <div
                                    key={role.key}
                                    className={`flex flex-col p-4 rounded-xl border ${role.activeColor} transition-all`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-lg bg-main-bg dark:bg-main-bg-dark shadow-xs shrink-0">
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-md text-main-color dark:text-main-color-dark">
                                            {role.name}
                                        </span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-secondary-color dark:text-secondary-color-dark">
                                        {role.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div
                    className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-secondary-bg dark:bg-secondary-bg-dark/20 
                        border border-dashed border-main-border dark:border-main-border-dark rounded-xl"
                >
                    <UserXIcon className="w-8 h-8 text-secondary-color dark:text-secondary-color-dark mb-2" />
                    <h3 className="text-sm font-bold text-main-color dark:text-main-color-dark">
                        Nenhum Cargo Definido
                    </h3>
                    <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-1 max-w-xs">
                        Atualmente este usuário não possui cargos de permissão
                        específicos configurados.
                    </p>
                </div>
            )}
        </section>
    );
}
