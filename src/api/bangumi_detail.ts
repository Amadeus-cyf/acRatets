import type { AxiosResponse } from "axios";
import { apiClient, jikanClient } from "./client";
import type {
    ApiEnvelope,
    BangumiDetailPayload,
    JikanAnimeResponse,
} from "./types";
import { cachedRequest } from "./request";

class BangumiDetailApi {
    static getBangumiDetailV2(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<JikanAnimeResponse>> {
        const path = `/anime/${id}`;
        return cachedRequest(() => jikanClient.get(path, { signal }), {
            cacheKey: `jikan:${path}`,
            signal,
        });
    }

    static getBangumiDetailV1(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiDetailPayload>>> {
        const path = `/bangumi/${id}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }
}

export default BangumiDetailApi;
