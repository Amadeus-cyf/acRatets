import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { ApiEnvelope, BangumiListPayload } from "./types";
import { cachedRequest } from "./request";

class BangumiApi {
    static getBangumisBySeasonWithLimit(
        year: number,
        season: string,
        limit: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        const path = `/bangumi/${year}/${season}/limit/${limit}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }

    static getBangumisBySeason(
        year: number,
        season: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        const path = `/bangumi/${year}/${season}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }
}

export default BangumiApi;
