export interface SpringPageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    status: boolean;
    createdAt: Date;
    roles: string[];
}
