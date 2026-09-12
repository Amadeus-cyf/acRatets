import React, { memo } from "react";
import { Button } from "../ui";

type PropsType = {
    pageNum: number;
    isFocus: boolean;
    onPageClicked: (pageNum: number) => void;
};

const PageButton = (props: PropsType): React.ReactElement => {
    const { pageNum, onPageClicked } = props;

    const clickListener = (): void => {
        onPageClicked(pageNum);
    };

    return props.isFocus ? (
        <Button
            style={{ marginLeft: "5pt", marginRight: "5pt", marginTop: "3pt" }}
            color="blue"
            compact
            onClick={clickListener}
            size="medium"
            content={pageNum}
        />
    ) : (
        <Button
            style={{ marginLeft: "5pt", marginRight: "5pt", marginTop: "3pt" }}
            inverted
            color="blue"
            compact
            onClick={clickListener}
            size="medium"
            content={pageNum}
        />
    );
};

export default memo(
    PageButton,
    (prevProps: PropsType, props: PropsType): boolean => {
        return (
            prevProps.pageNum === props.pageNum &&
            prevProps.isFocus === props.isFocus
        );
    }
);
