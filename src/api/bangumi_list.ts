import type { AxiosResponse } from "axios";
import type { BangumiRankType } from "@/interface/BangumiRankType";
import { apiClient } from "./client";
import type {
    ApiEnvelope,
    BangumiCountPayload,
    BangumiListPayload,
} from "./types";
import { cachedRequest } from "./request";

class BangumiListApi {
    static getBangumiWithPagingOrderByDate(
        page: number,
        order: 1 | -1,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        const path = `/bangumiList/date/${page}/order/${order}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }

    static getBangumiCount(
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiCountPayload>>> {
        const path = "/bangumiList/count";
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }

    static getBangumiRank(
        rankNumber: number,
        signal?: AbortSignal
    ): Promise<
        AxiosResponse<ApiEnvelope<BangumiListPayload<BangumiRankType>>>
    > {
        const path = `/bangumiList/rank/${rankNumber}`;
        return cachedRequest(() => apiClient.get(path, { signal }), {
            cacheKey: `api:${path}`,
            signal,
        });
    }
}

export default BangumiListApi;
