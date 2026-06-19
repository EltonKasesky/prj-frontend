import { api } from "../api/client";
import type {
    ProfileResponseDTO,
    ProfileToUserRequestDTO,
} from "../types/profile.types";

export const ProfileService = {
    getUserProfiles: async (userId: string): Promise<ProfileResponseDTO[]> => {
        const { data } = await api.get<ProfileResponseDTO[]>(
            `/profiles/users/${userId}`,
        );
        return data;
    },

    getProfilesFromAuthenticatedUser: async (): Promise<
        ProfileResponseDTO[]
    > => {
        const { data } =
            await api.get<ProfileResponseDTO[]>("/profiles/users/me");
        return data;
    },

    addProfilesToUser: async (
        userId: string,
        profiles: ProfileToUserRequestDTO,
    ): Promise<void> => {
        await api.post(`/profiles/users/add/${userId}`, profiles);
    },

    removeProfilesFromUser: async (
        userId: string,
        profiles: ProfileToUserRequestDTO,
    ): Promise<void> => {
        await api.post(`/profiles/users/remove/${userId}`, profiles);
    },
};
