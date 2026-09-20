import { memo } from "react";
import { Label, Header } from "@/components/ui";
import Color from "@/const/color";
import "./index.css";

interface PropsType {
    score: number;
    user: number;
    style?: object;
}

const ScoreLabel = (props: PropsType) => {
    const { score, user, style } = props;

    const labelStyle = {
        ...style,
        width: "100%",
        background: "rgba(255, 255, 255, 0)",
    };
    return (
        <Label style={labelStyle}>
            <Header size="large" style={{ color: Color.YELLOW }}>
                {score.toFixed(1)}
            </Header>
            <div className="userNumStyle">{`${user}评分`}</div>
        </Label>
    );
};

export default memo(ScoreLabel);
