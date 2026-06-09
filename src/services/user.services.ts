import { api } from "../api/client";
import type { UserResponseDTO } from "../types/user.types";

export const UserService = {
    getProfile: async (): Promise<UserResponseDTO> => {
        const { data } = await api.get<UserResponseDTO>("/users/me");
        return data;
    },
};
