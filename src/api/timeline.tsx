import axios, { AxiosResponse } from "axios";

class TimelineApi {
    static GetTimelineInPage(
        year: number,
        season: string,
        page: number,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/${page}`, { signal });
    }

    static GetTimelineNum(
        year: number,
        season: string,
        signal?: AbortSignal
    ): Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/count`, { signal });
    }
}

export default TimelineApi;
