import { api } from "../api/client";
import type {
    AlbumDetailsDTO,
    AlbumUpdateRequestDTO,
} from "../types/album.types";

export const AlbumService = {
    getAlbum: async (): Promise<AlbumDetailsDTO> => {
        const { data } = await api.get<AlbumDetailsDTO>("/album");
        return data;
    },

    getCoverImageBlob: async (): Promise<Blob> => {
        const { data } = await api.get("/album/cover-image", {
            responseType: "blob",
        });
        return data;
    },

    updateAlbum: async (
        data: AlbumUpdateRequestDTO,
    ): Promise<AlbumDetailsDTO> => {
        const { data: response } = await api.put<AlbumDetailsDTO>(
            "/album",
            data,
        );
        return response;
    },
};
