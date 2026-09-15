import type { AxiosResponse } from "axios";
import type { BangumiRankType } from "@/interface/BangumiRankType";
import { apiClient } from "./client";
import type {
    ApiEnvelope,
    BangumiCountPayload,
    BangumiListPayload,
} from "./types";

class BangumiListApi {
    static getBangumiWithPagingOrderByDate(
        page: number,
        order: 1 | -1,
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiListPayload>>> {
        return apiClient.get(`/bangumiList/date/${page}/order/${order}`, {
            signal,
        });
    }

    static getBangumiCount(
        signal?: AbortSignal
    ): Promise<AxiosResponse<ApiEnvelope<BangumiCountPayload>>> {
        return apiClient.get("/bangumiList/count", { signal });
    }

    static getBangumiRank(
        rankNumber: number,
        signal?: AbortSignal
    ): Promise<
        AxiosResponse<ApiEnvelope<BangumiListPayload<BangumiRankType>>>
    > {
        return apiClient.get(`/bangumiList/rank/${rankNumber}`, { signal });
    }
}

export default BangumiListApi;
