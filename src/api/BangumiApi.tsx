import axios, { AxiosResponse } from 'axios';

class BangumiApi {
    static getBangumiBySeasonWithLimit(year: number, season : String, limit: number) : Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/limit/${limit}`);
    }

    static getBangumiBySeason(year : number, season : String) : Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}`);
    }
}

export default BangumiApi
