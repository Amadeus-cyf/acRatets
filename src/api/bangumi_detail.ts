import type { AxiosResponse } from "axios";
import { apiClient, jikanClient } from "./client";
import type {
    ApiEnvelope,
    BangumiDetailPayload,
    JikanAnimeResponse,
} from "./types";

class BangumiDetailApi {
    static getBangumiDetailV2(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<JikanAnimeResponse>> {
        return jikanClient.get(`/anime/${id}`, { signal });
    }

    static getBangumiDetailV1(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiDetailPayload>>> {
        return apiClient.get(`/bangumi/${id}`, { signal });
    }
}

export default BangumiDetailApi;
