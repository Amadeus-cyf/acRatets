import axios, { AxiosResponse } from "axios";

class BangumiDetailApi {
    static getBangumiDetailV2(id: string): Promise<AxiosResponse<any>> {
        return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
    }

    static getBangumiDetailV1(id: string): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${id}`);
    }
}

export default BangumiDetailApi;
