import axios, { AxiosResponse } from 'axios'

class TimelineApi {
    static GetTimelineInPage(year : number, season : string, page : number) : Promise<AxiosResponse<any>> {
        return axios.get(`/api/bangumi/${year}/${season}/${page}`)
    }
}

export default TimelineApi;
