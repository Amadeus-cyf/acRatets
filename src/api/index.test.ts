import { afterEach, expect, test, vi } from "vitest";
import AuthApi from "./auth";
import BangumiApi from "./bangumi";
import BangumiDetailApi from "./bangumi_detail";
import BangumiListApi from "./bangumi_list";
import { apiClient, jikanClient } from "./client";
import TimelineApi from "./timeline";

afterEach(() => vi.restoreAllMocks());

test("backend API modules use the shared client and relative endpoints", async () => {
    const get = vi.spyOn(apiClient, "get").mockResolvedValue({} as never);
    const post = vi.spyOn(apiClient, "post").mockResolvedValue({} as never);
    const signal = new AbortController().signal;

    await AuthApi.login("test@example.com", "secret");
    await BangumiApi.getBangumisBySeasonWithLimit(2026, "fall", 8, signal);
    await BangumiApi.getBangumisBySeason(2026, "fall");
    await BangumiDetailApi.getBangumiDetailV1("1", signal);
    await BangumiListApi.getBangumiWithPagingOrderByDate(2, -1, signal);
    await BangumiListApi.getBangumiCount(signal);
    await BangumiListApi.getBangumiRank(10, signal);
    await TimelineApi.getTimelineInPage(2026, "fall", 2, signal);
    await TimelineApi.getTimelineCount(2026, "fall", signal);

    expect(post).toHaveBeenCalledWith("/auth/login", {
        email: "test@example.com",
        password: "secret",
    });
    expect(get).toHaveBeenCalledWith("/bangumi/2026/fall/limit/8", {
        signal,
    });
    expect(get).toHaveBeenCalledWith("/bangumiList/count", { signal });
    expect(get).toHaveBeenCalledWith("/bangumi/2026/fall/2", { signal });
});

test("anime details use the independently configurable Jikan client", async () => {
    const get = vi.spyOn(jikanClient, "get").mockResolvedValue({} as never);
    const signal = new AbortController().signal;

    await BangumiDetailApi.getBangumiDetailV2("1", signal);

    expect(get).toHaveBeenCalledWith("/anime/1", { signal });
});
