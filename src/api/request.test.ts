import { afterEach, describe, expect, test, vi } from "vitest";
import { cachedRequest, clearRequestCache } from "./request";

afterEach(() => {
    clearRequestCache();
    vi.restoreAllMocks();
});

describe("cachedRequest", () => {
    test("reuses a successful response until its TTL expires", async () => {
        const request = vi.fn().mockResolvedValue({ value: 1 });

        const first = await cachedRequest(request, { cacheKey: "anime:1" });
        const second = await cachedRequest(request, { cacheKey: "anime:1" });

        expect(first).toBe(second);
        expect(request).toHaveBeenCalledTimes(1);
    });

    test("retries a transient failure once", async () => {
        const request = vi
            .fn()
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValue({ value: 1 });

        await expect(
            cachedRequest(request, {
                cacheKey: "anime:2",
                retryDelayMs: 0,
            })
        ).resolves.toEqual({ value: 1 });
        expect(request).toHaveBeenCalledTimes(2);
    });

    test("does not retry a client error", async () => {
        const error = Object.assign(new Error("not found"), {
            isAxiosError: true,
            response: { status: 404 },
        });
        const request = vi.fn().mockRejectedValue(error);

        await expect(
            cachedRequest(request, {
                cacheKey: "anime:missing",
                retryDelayMs: 0,
            })
        ).rejects.toBe(error);
        expect(request).toHaveBeenCalledTimes(1);
    });

    test("does not start a request after cancellation", async () => {
        const controller = new AbortController();
        const request = vi.fn();
        controller.abort();

        await expect(
            cachedRequest(request, {
                cacheKey: "anime:cancelled",
                signal: controller.signal,
            })
        ).rejects.toMatchObject({ name: "AbortError" });
        expect(request).not.toHaveBeenCalled();
    });
});
