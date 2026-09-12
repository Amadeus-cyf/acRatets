import axios, { AxiosResponse } from "axios";

class BangumiApi {
    static getBangumisBySeasonWithLimit(
        year: number,
        season: string,
        limit: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/limit/${limit}`, {
            signal,
        });
    }

    static getBangumisBySeason(
        year: number,
        season: string
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}`);
    }
}

export default BangumiApi;
