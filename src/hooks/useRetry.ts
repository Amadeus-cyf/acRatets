import { useCallback, useState } from "react";

export const useRetry = (): readonly [number, () => void] => {
    const [retryKey, setRetryKey] = useState(0);
    const retry = useCallback(() => setRetryKey((key) => key + 1), []);
    return [retryKey, retry] as const;
};
