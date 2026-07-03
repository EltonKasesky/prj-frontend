import { api } from "../api/client";
import type {
    AlbumProgressResponseDTO,
    UserStickerResponseDTO,
} from "../types/userSticker.types";

export const UserStickerService = {
    getMyCollection: async (): Promise<UserStickerResponseDTO[]> => {
        const { data } = await api.get<UserStickerResponseDTO[]>(
            "/user-stickers",
        );
        return data;
    },

    acquireSticker: async (
        tag: string,
    ): Promise<UserStickerResponseDTO> => {
        const { data } = await api.post<UserStickerResponseDTO>(
            "/user-stickers",
            { tag },
        );
        return data;
    },

    removeSticker: async (id: string): Promise<void> => {
        await api.delete(`/user-stickers/${id}`);
    },

    clearCollection: async (): Promise<void> => {
        await api.delete("/user-stickers");
    },

    getCollectionSummary: async (): Promise<AlbumProgressResponseDTO> => {
        const { data } = await api.get<AlbumProgressResponseDTO>(
            "/user-stickers/collection-summary",
        );
        return data;
    },
};
