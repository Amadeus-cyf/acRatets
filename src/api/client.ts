import axios from "axios";

const normalizeBaseUrl = (
    value: string | undefined,
    fallback: string
): string => value?.trim().replace(/\/+$/, "") || fallback;

export const apiClient = axios.create({
    baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL, "/api"),
    timeout: 10_000,
});

export const jikanClient = axios.create({
    baseURL: normalizeBaseUrl(
        import.meta.env.VITE_JIKAN_API_BASE_URL,
        "https://api.jikan.moe/v4"
    ),
    timeout: 10_000,
});
