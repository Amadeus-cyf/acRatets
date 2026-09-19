import React, { useEffect, useState } from "react";
import { Label, Header, Divider } from "@/components/ui";
import { BangumiBriefScoreType } from "@/interface/BangumiBriefScoreType";
import BangumiListApi from "@/api/bangumi_list";
import { renderBangumiBriefRank } from "@/containers/render";
import AsyncState, { LoadStatus } from "@/components/async_state";

const labelStyle = {
    width: "100%",
    minWidth: "350px",
    minHeight: "500px",
    background: "rgba(255, 255, 255, 0.6)",
};
const headerStyle = { position: "relative" as const, top: "6px" };
const RANK_NUMBER = 10;

const RankSection = (): React.ReactElement => {
    const [bangumis, setBangumis] = useState<BangumiBriefScoreType[]>([]);
    const [status, setStatus] = useState<LoadStatus>("loading");

    useEffect(() => {
        const controller = new AbortController();
        BangumiListApi.getBangumiRank(RANK_NUMBER, controller.signal)
            .then((res) => {
                const nextBangumis = res.data.data.bangumiList;
                setBangumis(nextBangumis);
                setStatus(nextBangumis.length > 0 ? "success" : "empty");
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("error");
            });
        return () => controller.abort();
    }, []);

    return (
        <Label style={labelStyle}>
            <Header size="large" style={headerStyle} content="排行榜" />
            <Divider />
            {status === "success" ? (
                renderBangumiBriefRank(bangumis)
            ) : (
                <AsyncState
                    status={status}
                    message={
                        status === "error"
                            ? "The ranking could not be loaded."
                            : status === "empty"
                              ? "No ranking data is available."
                              : "Loading ranking…"
                    }
                />
            )}
        </Label>
    );
};

export default React.memo(RankSection);
