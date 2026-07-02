import { api } from "../api/client";
import type { SpringPageResponse } from "../types/user.types";
import type {
    StickerFilters,
    StickerRegisterRequestDTO,
    StickerResponseDTO,
    StickerUpdateRequestDTO,
} from "../types/sticker.types";

export const StickerService = {
    getAllStickers: async (
        page?: number,
        size?: number,
        filters?: StickerFilters,
    ): Promise<SpringPageResponse<StickerResponseDTO>> => {
        const { data } = await api.get<SpringPageResponse<StickerResponseDTO>>(
            "/stickers",
            {
                params: {
                    page,
                    size,
                    name: filters?.name || undefined,
                    stickerPage: filters?.stickerPage || undefined,
                    tag: filters?.tag || undefined,
                },
            },
        );
        return data;
    },

    getStickerById: async (id: string): Promise<StickerResponseDTO> => {
        const { data } = await api.get<StickerResponseDTO>(`/stickers/${id}`);
        return data;
    },

    getStickerImageBlob: async (id: string): Promise<Blob> => {
        const { data } = await api.get(`/stickers/${id}/image`, {
            responseType: "blob",
        });
        return data;
    },

    createSticker: async (
        data: StickerRegisterRequestDTO,
    ): Promise<StickerResponseDTO> => {
        const { data: response } = await api.post<StickerResponseDTO>(
            "/stickers",
            data,
        );
        return response;
    },

    updateSticker: async (
        id: string,
        data: StickerUpdateRequestDTO,
    ): Promise<StickerResponseDTO> => {
        const { data: response } = await api.put<StickerResponseDTO>(
            `/stickers/${id}`,
            data,
        );
        return response;
    },

    deleteSticker: async (id: string): Promise<void> => {
        await api.delete(`/stickers/${id}`);
    },

    clearCatalog: async (): Promise<void> => {
        await api.delete("/stickers");
    },
};
