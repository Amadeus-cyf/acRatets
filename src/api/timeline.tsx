import axios, { AxiosResponse } from "axios";

class TimelineApi {
    static GetTimelineInPage(
        year: number,
        season: string,
        page: number
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/${page}`);
    }

    static GetTimelineNum(
        year: number,
        season: string
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/count`);
    }
}

export default TimelineApi;
