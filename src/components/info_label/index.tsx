import React, { memo } from 'react';
import { Label } from 'semantic-ui-react';

type PropsType = {
    info: string,
}

const labelStyle = {
    backgroundColor: "rgba(255, 255, 255, 0)",
    fontSize: '10pt',
    color: 'white',
    marginLeft: '-10px'
}

const infoLabel = (props : PropsType) => {
    const { info } = props;

    return (
        <Label style={ labelStyle } content = { info }/>
    )
}

export default memo(infoLabel);
