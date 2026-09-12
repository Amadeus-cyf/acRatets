import axios, { AxiosResponse } from "axios";

class TimelineApi {
    static getTimelineInPage(
        year: number,
        season: string,
        page: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/${page}`, { signal });
    }

    static getTimelineCount(
        year: number,
        season: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/count`, { signal });
    }
}

export default TimelineApi;
