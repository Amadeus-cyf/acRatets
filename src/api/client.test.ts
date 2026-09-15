import { apiClient, jikanClient } from "./client";

describe("API clients", () => {
    test("uses the same-origin API path by default", () => {
        expect(apiClient.defaults.baseURL).toBe("/api");
    });

    test("uses Jikan v4 by default", () => {
        expect(jikanClient.defaults.baseURL).toBe("https://api.jikan.moe/v4");
    });
});
