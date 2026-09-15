import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type {
    ApiEnvelope,
    BangumiCountPayload,
    BangumiListPayload,
} from "./types";

class TimelineApi {
    static getTimelineInPage(
        year: number,
        season: string,
        page: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        return apiClient.get(`/bangumi/${year}/${season}/${page}`, { signal });
    }

    static getTimelineCount(
        year: number,
        season: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiCountPayload>>> {
        return apiClient.get(`/bangumi/${year}/${season}/count`, { signal });
    }
}

export default TimelineApi;
