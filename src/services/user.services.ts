import { api } from "../api/client";
import type {
    ChangePasswordRequestDTO,
    SpringPageResponse,
    UpdateUserRequestDTO,
    UserResponseDTO,
} from "../types/user.types";

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
    ): Promise<UserResponseDTO> => {
        const { data } = await api.post<UserResponseDTO>("/users", {
            name,
            email,
            password,
        });
        return data;
    },

    disableUserById: async (userId: string): Promise<void> => {
        await api.delete(`/users/${userId}`);
    },

    enableUserById: async (userId: string): Promise<void> => {
        await api.patch(`users/${userId}`);
    },

    updateProfile: async (data: UpdateUserRequestDTO): Promise<void> => {
        await api.patch<void>("/users/me", data);
    },

    changePassword: async (data: ChangePasswordRequestDTO): Promise<void> => {
        await api.patch("/users/password", data);
    },

    deactivateAccount: async (): Promise<void> => {
        await api.delete("/users/me");
    },
};
