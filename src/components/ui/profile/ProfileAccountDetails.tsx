import { IdCardIcon } from "lucide-react";
import type { UserResponseDTO } from "../../../types/user.types";

interface ProfileAccountDetailsProps {
    profile: UserResponseDTO;
}

export default function ProfileAccountDetails({
    profile,
}: ProfileAccountDetailsProps) {
    return (
        <section
            className="md:col-span-1 flex flex-col gap-4 p-6 rounded-2xl border border-main-border dark:border-main-border-dark 
                bg-main-bg dark:bg-main-bg-dark shadow-sm justify-between"
        >
            <div className="space-y-4">
                <h2
                    className="text-lg font-extrabold text-main-color dark:text-main-color-dark border-b border-main-border 
                        dark:border-main-border-dark pb-2"
                >
                    Detalhes da Conta
                </h2>
                <div className="space-y-3">
                    <div>
                        <span className="text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark tracking-wider block mb-0.5">
                            Nome Completo
                        </span>
                        <span className="text-sm font-semibold text-main-color dark:text-main-color-dark block wrap-break-word">
                            {profile.name}
                        </span>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase text-secondary-color dark:text-secondary-color-dark tracking-wider block mb-0.5">
                            E-mail do Usuário
                        </span>
                        <span className="text-sm font-semibold text-main-color dark:text-main-color-dark block wrap-break-word">
                            {profile.email}
                        </span>
                    </div>
                </div>
            </div>

            <div className="pt-4 mt-4 border-t border-main-border dark:border-main-border-dark">
                <div className="flex items-center gap-2 text-xs font-medium text-secondary-color dark:text-secondary-color-dark">
                    <IdCardIcon className="w-4 h-4 text-secondary-color dark:text-secondary-color-dark" />
                    <span>Verificado pelo sistema</span>
                </div>
            </div>
        </section>
    );
}
