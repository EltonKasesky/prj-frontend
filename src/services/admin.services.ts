import { api } from "../api/client";
import type { DashboardTabResponseDTO } from "../types/admin.types";

export const AdminService = {
    getStatsForDashboardTab: async (): Promise<DashboardTabResponseDTO> => {
        const { data } =
            await api.get<DashboardTabResponseDTO>("/admin/dashboard");
        return data;
    },
};
