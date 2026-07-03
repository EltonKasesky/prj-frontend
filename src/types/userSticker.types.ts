export interface UserStickerResponseDTO {
    id: string;
    tag: string;
    name: string;
    quantity: number;
}

export interface AcquireStickerRequestDTO {
    tag: string;
}

export interface AlbumProgressResponseDTO {
    collected: number;
    total: number;
    percentage: number;
}
