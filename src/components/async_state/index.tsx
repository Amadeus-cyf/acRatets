import React, { memo } from "react";
import "./index.css";

export type AsyncStatus = "loading" | "empty" | "error";
export type LoadStatus = AsyncStatus | "success";

interface AsyncStateProps {
    message?: string;
    onRetry?: () => void;
    status: AsyncStatus;
}

const defaultMessages: Record<AsyncStatus, string> = {
    loading: "Loading…",
    empty: "Nothing to show.",
    error: "Unable to load this content. Please try again.",
};

const AsyncState = ({
    message,
    onRetry,
    status,
}: AsyncStateProps): React.ReactElement => {
    const content = message ?? defaultMessages[status];

    if (status === "error") {
        return (
            <div className="asyncState asyncStateError" role="alert">
                <p>{content}</p>
                {onRetry && (
                    <button type="button" onClick={onRetry}>
                        Try again
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="asyncState" role="status" aria-live="polite">
            {status === "loading" && (
                <span className="asyncStateSpinner" aria-hidden="true" />
            )}
            <p>{content}</p>
        </div>
    );
};

export default memo(AsyncState);
