import React, { memo } from "react";
import { Button } from "semantic-ui-react";
import Color from "../../const/color";
import { deepEqual } from "../../utils/deepEqual";

type PropsType = {
    date: string; // the info button represents
    onClick: () => void;
    style?: object;
    selected?: boolean;
};

const dateButton = (props: PropsType) => {
    return (
        <Button
            content={props.date}
            style={{
                ...props.style,
                color: props.selected ? Color.PINK : Color.BLACK,
            }}
            onClick={props.onClick}
            outline="none"
        />
    );
};

export default memo(
    dateButton,
    (prevProps: PropsType, props: PropsType): boolean => {
        return (
            prevProps.date === props.date &&
            prevProps.selected === props.selected &&
            deepEqual(prevProps.style, props.style)
        );
    }
);
