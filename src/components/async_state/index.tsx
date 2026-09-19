import React, { memo } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

export type AsyncStatus = "loading" | "empty" | "error";
export type LoadStatus = AsyncStatus | "success";

interface AsyncStateProps {
    message?: string;
    status: AsyncStatus;
}

const defaultMessages: Record<AsyncStatus, string> = {
    loading: "Loading…",
    empty: "Nothing to show.",
    error: "Unable to load this content. Please try again.",
};

const AsyncState = ({
    message,
    status,
}: AsyncStateProps): React.ReactElement => {
    const content = message ?? defaultMessages[status];

    if (status === "error") {
        return (
            <Alert severity="error" role="alert">
                {content}
            </Alert>
        );
    }

    return (
        <Box
            role="status"
            aria-live="polite"
            sx={{
                alignItems: "center",
                display: "flex",
                gap: 1.5,
                justifyContent: "center",
                minHeight: 96,
                width: "100%",
            }}
        >
            {status === "loading" && (
                <CircularProgress aria-hidden="true" size={24} />
            )}
            <Typography>{content}</Typography>
        </Box>
    );
};

export default memo(AsyncState);
