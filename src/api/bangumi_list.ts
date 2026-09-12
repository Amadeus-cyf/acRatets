import axios, { AxiosResponse } from "axios";

class BangumiListApi {
    static getBangumiWithPagingOrderByDate(
        page: number,
        order: 1 | -1,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumiList/date/${page}/order/${order}`, {
            signal,
        });
    }

    static getBangumiCount(signal?: AbortSignal): Promise<AxiosResponse<any>> {
        return axios.get("/api/bangumiList/count", { signal });
    }

    static getBangumiRank(
        rankNumber: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumiList/rank/${rankNumber}`, { signal });
    }
}

export default BangumiListApi;
