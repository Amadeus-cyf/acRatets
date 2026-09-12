import axios, { AxiosResponse } from "axios";

class BangumiDetailApi {
    static getBangumiDetailV2(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`https://api.jikan.moe/v3/anime/${id}`, { signal });
    }

    static getBangumiDetailV1(
        id: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${id}`, { signal });
    }
}

export default BangumiDetailApi;
