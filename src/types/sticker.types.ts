export interface StickerResponseDTO {
    id: string;
    name: string;
    page: number;
    number: number;
    tag: string;
    description: string | null;
    imageUrl: string;
    createdAt: string;
    albumId: string;
}

export interface StickerRegisterRequestDTO {
    name: string;
    page: number;
    number: number;
    description?: string;
    image: string;
}

export interface StickerUpdateRequestDTO {
    name: string;
    page: number;
    number: number;
    description?: string;
    image?: string;
}

export interface StickerFilters {
    name?: string;
    stickerPage?: number;
    tag?: string;
}
