import React, { memo } from 'react';
import { Button } from 'semantic-ui-react';
import Color from '../../const/color';

type PropsType = {
    date: string,               // the info button represents
    onClick: () => void,
    style?: object,
    selected?: boolean,
}

const DateButton = (props : PropsType) => {    
    return <Button content={ props.date } 
            style={ {...props.style, color: props.selected ? Color.PINK : Color.BLACK} } 
            onClick={ props.onClick } outline='none'/>
}

export default memo(DateButton, (prevProps : PropsType, props : PropsType) : boolean => { 
    return prevProps.selected === props.selected 
});
