import React, { useEffect, useState } from "react";
import { BangumiRankType } from "@/interface/BangumiRankType";
import NavigationSection from "@/containers/navigation_section";
import BangumiListApi from "@/api/bangumi_list";
import { renderBangumiRank } from "@/containers/render";
import AsyncState, { LoadStatus } from "@/components/async_state";
import "./index.css";

const Rank = (): React.ReactElement => {
    const [bangumis, setBangumis] = useState<BangumiRankType[]>([]);
    const [status, setStatus] = useState<LoadStatus>("loading");

    useEffect(() => {
        const controller = new AbortController();
        BangumiListApi.getBangumiRank(20, controller.signal)
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
        <div className="rankPageStyle">
            <NavigationSection currentTab="排行榜" />
            <div className="bangumiRankStyle">
                {status === "success" ? (
                    renderBangumiRank(bangumis)
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
            </div>
        </div>
    );
};

export default Rank;
