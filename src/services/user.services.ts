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

    getUserById: async (userId: string): Promise<UserResponseDTO> => {
        const { data } = await api.get<UserResponseDTO>(`/users/${userId}`);
        return data;
    },

    getProfile: async (): Promise<UserResponseDTO> => {
        const { data } = await api.get<UserResponseDTO>("/users/me");
        return data;
    },

    createUser: async (
        name: string,
        email: string,
        password: string,
    ): Promise<void> => {
        await api.post("/users", { name, email, password });
    },

    disableUserById: async (userId: string): Promise<void> => {
        await api.delete(`/users/${userId}`);
    },

    enableUserById: async (userId: string): Promise<void> => {
        await api.patch(`users/${userId}`);
    },
};
