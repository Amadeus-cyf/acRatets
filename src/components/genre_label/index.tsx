import React, { memo } from "react";
import { Label } from "../ui";

type PropsType = {
    genre: string;
};

const labelStyle = {
    backgroundColor: "rgba(255, 255, 255, 0)",
    border: "1px solid white",
    fontSize: "9.5pt",
    color: "white",
    marginLeft: "15px",
    padding: "6px",
};

const GenreLabel = (props: PropsType) => {
    const { genre } = props;

    return <Label style={labelStyle} content={genre} />;
};

export default memo(GenreLabel);
