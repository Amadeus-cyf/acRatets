import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type {
    ApiEnvelope,
    BangumiCountPayload,
    BangumiListPayload,
} from "./types";
import { cachedRequest } from "./request";

class TimelineApi {
    static getTimelineInPage(
        year: number,
        season: string,
        page: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        const path = `/bangumi/${year}/${season}/${page}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }

    static getTimelineCount(
        year: number,
        season: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiCountPayload>>> {
        const path = `/bangumi/${year}/${season}/count`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }
}

export default TimelineApi;
