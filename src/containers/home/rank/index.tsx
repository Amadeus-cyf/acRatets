import React, { useEffect, useState } from "react";
import { Label, Header, Divider } from "@/components/ui";
import { BangumiBriefScoreType } from "@/interface/BangumiBriefScoreType";
import BangumiListApi from "@/api/bangumi_list";
import { renderBangumiBriefRank } from "@/containers/render";

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

    useEffect(() => {
        const controller = new AbortController();
        BangumiListApi.getBangumiRank(RANK_NUMBER, controller.signal)
            .then((res) => {
                setBangumis(res.data.data.bangumiList);
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, []);

    return (
        <Label style={labelStyle}>
            <Header size="large" style={headerStyle} content="排行榜" />
            <Divider />
            {renderBangumiBriefRank(bangumis)}
        </Label>
    );
};

export default React.memo(RankSection);
