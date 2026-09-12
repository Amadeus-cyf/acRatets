import React, { useEffect, useState } from "react";
import { Header, Divider } from "semantic-ui-react";
import { BangumiType } from "../../../interface/BangumiType";
import { BangumiSeasonType } from "../../../interface/BangumiSeasonType";
import BangumiApi from "../../../api/bangumi";
import { headerStyle, divierStyle } from "./style";
import { renderBangumiList } from "../../render";
import "./index.css";

const Bangumis = ({ season, month, year }: BangumiSeasonType): JSX.Element => {
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        BangumiApi.getBangumisBySeasonWithLimit(
            year,
            season,
            8,
            controller.signal
        )
            .then((res) => {
                setBangumis(res.data.data.bangumiList);
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, [season, year]);

    return (
        <div className="bangumiSection">
            <Header
                size="medium"
                style={headerStyle}
                content={`${year}年${month}月番`}
            />
            <Divider style={divierStyle} />
            <div className="bangumiData">
                {renderBangumiList(bangumis, "25%")}
            </div>
        </div>
    );
};

export default React.memo(Bangumis);
