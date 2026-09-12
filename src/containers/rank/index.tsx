import React, { useEffect, useState } from "react";
import { BangumiRankType } from "../../interface/BangumiRankType";
import NaviSection from "../navi_section";
import BangumiListApi from "../../api/bangumi_list";
import { renderBangumiRank } from "../render";
import "./index.css";

const Rank = (): JSX.Element => {
    const [bangumis, setBangumis] = useState<BangumiRankType[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        BangumiListApi.getBangumiRank(20, controller.signal)
            .then((res) => {
                setBangumis(res.data.data.bangumiList);
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, []);

    return (
        <div className="rankPageStyle">
            <NaviSection currentTab="排行榜" />
            <div className="bangumiRankStyle">
                {bangumis.length > 0 ? (
                    renderBangumiRank(bangumis)
                ) : (
                    <div>loading</div>
                )}
            </div>
        </div>
    );
};

export default Rank;
