import { publicApi } from "../api/client";
import type { HomePageResponseDTO } from "../types/statistics.types";

export const StatisticsService = {
    getStatsForHomePage: async (): Promise<HomePageResponseDTO> => {
        const { data } =
            await publicApi.get<HomePageResponseDTO>("/statistics/home");
        return data;
    },
};
