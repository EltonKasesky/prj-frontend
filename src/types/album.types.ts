import type { StickerResponseDTO } from "./sticker.types";

export interface AlbumDetailsDTO {
    id: string;
    title: string;
    coverImageUrl: string;
    totalPages: number;
    totalStickers: number;
    stickers: StickerResponseDTO[];
}

export interface AlbumUpdateRequestDTO {
    title: string;
    totalPages: number;
    totalStickers: number;
    coverImage?: string;
}
