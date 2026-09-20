import React, { useEffect, useState } from "react";
import { Header, Divider } from "@/components/ui";
import { BangumiType } from "@/interface/BangumiType";
import { BangumiSeasonType } from "@/interface/BangumiSeasonType";
import BangumiApi from "@/api/bangumi";
import { headerStyle, dividerStyle } from "./style";
import { renderBangumiList } from "@/containers/render";
import AsyncState, { LoadStatus } from "@/components/async_state";
import { useRetry } from "@/hooks/useRetry";
import "./index.css";

const Bangumis = ({
    season,
    month,
    year,
}: BangumiSeasonType): React.ReactElement => {
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [retryKey, retry] = useRetry();

    useEffect(() => {
        const controller = new AbortController();
        setStatus("loading");
        BangumiApi.getBangumisBySeasonWithLimit(
            year,
            season,
            8,
            controller.signal
        )
            .then((res) => {
                const nextBangumis = res.data.data.bangumiList;
                setBangumis(nextBangumis);
                setStatus(nextBangumis.length > 0 ? "success" : "empty");
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("error");
            });
        return () => controller.abort();
    }, [retryKey, season, year]);

    return (
        <div className="bangumiSection">
            <Header
                size="medium"
                style={headerStyle}
                content={`${year}年${month}月番`}
            />
            <Divider style={dividerStyle} />
            <div className="bangumiData">
                {status === "success" ? (
                    renderBangumiList(bangumis, "25%")
                ) : (
                    <AsyncState
                        onRetry={retry}
                        status={status}
                        message={
                            status === "error"
                                ? "This season could not be loaded."
                                : status === "empty"
                                  ? "No anime found for this season."
                                  : "Loading this season…"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default React.memo(Bangumis);
