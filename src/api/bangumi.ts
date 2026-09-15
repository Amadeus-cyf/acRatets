import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { ApiEnvelope, BangumiListPayload } from "./types";

class BangumiApi {
    static getBangumisBySeasonWithLimit(
        year: number,
        season: string,
        limit: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        return apiClient.get(`/bangumi/${year}/${season}/limit/${limit}`, {
            signal,
        });
    }

    static getBangumisBySeason(
        year: number,
        season: string
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        return apiClient.get(`/bangumi/${year}/${season}`);
    }
}

export default BangumiApi;
