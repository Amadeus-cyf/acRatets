import axios, { AxiosResponse } from "axios";

class BangumiApi {
    static getBangumisBySeasonWithLimit(
        year: number,
        season: String,
        limit: number
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/limit/${limit}`);
    }

    static getBangumisBySeason(
        year: number,
        season: String
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}`);
    }
}

export default BangumiApi;
