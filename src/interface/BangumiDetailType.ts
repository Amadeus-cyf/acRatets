export interface BangumiDetailType {
    anime_id: number,
    image_url: string,
    title: string,
    title_japanese: string,
    status: string
    episodes: number,
    synopsis: string,
    genres: Array<string>,
    producers: Array<string>,
    airing: boolean,
    aired_from: string,
    aired_to: string,
}
