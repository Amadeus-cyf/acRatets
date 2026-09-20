import React, { memo } from "react";
import { Label } from "@/components/ui";
import NumberLabel from "@/components/number_label";
import "./index.css";

const labelStyle = {
    width: "100%",
    background: "rgba(255, 255, 255, 0)",
    display: "flex",
    justifyContent: "flex-start",
};

type PropsType = {
    title: string;
    score: number;
    userNumber: number;
    rank: number;
};

const RankLabel = (props: PropsType) => {
    const { title, score, userNumber, rank } = props;
    const titleBrief: string =
        title.length <= 20 ? title : title.substring(0, 20) + "...";

    return (
        <Label style={labelStyle} key={"Rank " + rank}>
            <NumberLabel rank={rank} width={22} height={27} />
            <p className="titleStyle"> {titleBrief} </p>
            <p className="scoreStyle"> {score.toFixed(1) + " 分"} </p>
            <p className="userNumberStyle"> {userNumber + "人评分"} </p>
        </Label>
    );
};

export default memo(RankLabel);
