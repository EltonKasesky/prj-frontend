import { api } from "../api/client";
import type { SpringPageResponse, UserResponseDTO } from "../types/user.types";

export const UserService = {
    getAllUsers: async (
        page?: number,
        size?: number,
    ): Promise<SpringPageResponse<UserResponseDTO>> => {
        const { data } = await api.get<SpringPageResponse<UserResponseDTO>>(
            "/users",
            {
                params: { page, size },
            },
        );
        return data;
    },

    getProfile: async (): Promise<UserResponseDTO> => {
        const { data } = await api.get<UserResponseDTO>("/users/me");
        return data;
    },
};
