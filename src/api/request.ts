import axios from "axios";

interface CacheEntry<T> {
    expiresAt: number;
    value: T;
}

interface CachedRequestOptions {
    cacheKey: string;
    retryDelayMs?: number;
    retries?: number;
    signal?: AbortSignal;
    ttlMs?: number;
}

const responseCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 60_000;
const DEFAULT_RETRY_DELAY_MS = 150;

const abortError = (): DOMException =>
    new DOMException("The request was aborted", "AbortError");

const throwIfAborted = (signal?: AbortSignal): void => {
    if (signal?.aborted) throw abortError();
};

const wait = (delayMs: number, signal?: AbortSignal): Promise<void> =>
    new Promise((resolve, reject) => {
        throwIfAborted(signal);

        const timeout = window.setTimeout(() => {
            signal?.removeEventListener("abort", onAbort);
            resolve();
        }, delayMs);
        const onAbort = (): void => {
            window.clearTimeout(timeout);
            signal?.removeEventListener("abort", onAbort);
            reject(abortError());
        };

        signal?.addEventListener("abort", onAbort, { once: true });
    });

const isRetryable = (error: unknown, signal?: AbortSignal): boolean => {
    if (signal?.aborted || axios.isCancel(error)) return false;
    if (!axios.isAxiosError(error)) return true;

    const status = error.response?.status;
    return (
        status === undefined ||
        status === 408 ||
        status === 429 ||
        status >= 500
    );
};

const pruneExpiredEntries = (now: number): void => {
    for (const [key, entry] of responseCache) {
        if (entry.expiresAt <= now) responseCache.delete(key);
    }
};

export const clearRequestCache = (): void => responseCache.clear();

export const cachedRequest = async <T>(
    request: () => Promise<T>,
    {
        cacheKey,
        retryDelayMs = DEFAULT_RETRY_DELAY_MS,
        retries = 1,
        signal,
        ttlMs = DEFAULT_TTL_MS,
    }: CachedRequestOptions
): Promise<T> => {
    throwIfAborted(signal);

    const now = Date.now();
    pruneExpiredEntries(now);
    const cached = responseCache.get(cacheKey) as CacheEntry<T> | undefined;
    if (cached) return cached.value;

    for (let attempt = 0; ; attempt += 1) {
        try {
            const value = await request();
            throwIfAborted(signal);
            responseCache.set(cacheKey, {
                expiresAt: Date.now() + ttlMs,
                value,
            });
            return value;
        } catch (error) {
            if (attempt >= retries || !isRetryable(error, signal)) throw error;
            await wait(retryDelayMs, signal);
        }
    }
};
