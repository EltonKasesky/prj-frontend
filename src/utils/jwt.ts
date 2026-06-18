interface JwtPayload {
    sub?: string;
    roles?: string[];
    exp?: number;
    [key: string]: unknown;
}

export function decodeJwt(token: string): JwtPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join(""),
        );

        return JSON.parse(jsonPayload) as JwtPayload;
    } catch {
        return null;
    }
}

export function hasRole(token: string, role: string): boolean {
    const payload = decodeJwt(token);
    return payload?.roles?.includes(role) ?? false;
}
