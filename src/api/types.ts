import type { BangumiDetailType } from "@/interface/BangumiDetailType";
import type { BangumiType } from "@/interface/BangumiType";

export interface ApiEnvelope<T> {
    data: T;
}

export interface BangumiListPayload<T = BangumiType> {
    bangumiList: T[];
}

export interface BangumiCountPayload {
    bangumiNumber: number;
}

export interface BangumiDetailPayload {
    bangumi: BangumiDetailType;
}

export interface LoginResponse {
    message: string;
    _id: string;
    username: string;
    email: string;
    avatar: string;
    background: string;
    follower: unknown[];
    following: unknown[];
}

interface JikanNamedResource {
    name: string;
}

export interface JikanAnime {
    mal_id: number;
    title: string;
    title_japanese: string | null;
    images: {
        jpg: {
            image_url: string;
        };
    };
    episodes: number | null;
    status: string | null;
    airing: boolean;
    aired: {
        from: string | null;
        to: string | null;
    };
    synopsis: string | null;
    genres: JikanNamedResource[];
    producers: JikanNamedResource[];
}

export interface JikanAnimeResponse {
    data: JikanAnime;
}
