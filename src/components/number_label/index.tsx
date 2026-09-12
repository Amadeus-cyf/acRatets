import React, { memo } from "react";
import { Label } from "../ui";
import Color from "../../const/color";
import { deepEqual } from "../../utils/deepEqual";

type PropsType = {
    rank: number;
    width: number;
    height: number;
    style?: object;
};

const NumberLabel = (props: PropsType): React.ReactElement => {
    let { rank, width, height, style } = props;

    style = style
        ? style
        : {
              background: Color.BLUE,
              fontSize: "9pt",
          };

    let labelStyle = {
        ...style,
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

export default memo(NumberLabel, (prevProps: PropsType, props: PropsType) => {
    return deepEqual(prevProps, props);
});
