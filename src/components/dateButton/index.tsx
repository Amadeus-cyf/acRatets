import React from 'react';
import { Button } from 'semantic-ui-react';

type PropsType = {
    date: number,               // the info button represents
    onClick: () => void,
    style?: object,
}

const DateButton = (props : PropsType) => {    
    return <Button content={ props.date } style={ props.style } onClick={ props.onClick } outline='none'/>
}

export default DateButton;
