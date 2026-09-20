import React, { memo } from "react";
import { Label } from "@/components/ui";
import Color from "@/const/color";

type PropsType = {
    rank: number;
    width: number;
    height: number;
    style?: React.CSSProperties;
};

const NumberLabel = (props: PropsType): React.ReactElement => {
    const { rank, width, height, style } = props;
    const resolvedStyle = style ?? {
        background: Color.BLUE,
        fontSize: "9pt",
    };

    const labelStyle = {
        ...resolvedStyle,
        width: `${width}px`,
        height: `${height}px`,
        marginRight: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: Color.WHITE,
    };

    return <Label style={labelStyle}>{rank}</Label>;
};

export default memo(NumberLabel);
