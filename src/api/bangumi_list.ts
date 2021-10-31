import axios, { AxiosResponse } from 'axios';

class BangumiListApi {
    static getBangumiWithPagingOrderByDate(page : number, order : 1 | -1) : Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumiList/date/${page}/order/${order}`);
    }

    static getBangumiCount() : Promise<AxiosResponse<any>> {
        return axios.get('/api/bangumiList/count');
    }

    static getBangumiRank(rankNumber : number) : Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumiList/rank/${rankNumber}`);
    }
}

export default BangumiListApi;
