import { publicApi } from "../api/client";
import type { LoginResponseDTO } from "../types/auth.types";

export const AuthService = {
    authUser: async (
        email: string,
        password: string,
    ): Promise<LoginResponseDTO> => {
        const { data } = await publicApi.post<LoginResponseDTO>("/auth/login", {
            email,
            password,
        });

        return data;
    },
};
