import { memo } from 'react';
import { Label } from 'semantic-ui-react';
import Color from '../../const/color';

type PropsType = {
    rank : number,
    width: number,
    height: number,
    style?: object
}

const numberLabel = (props : PropsType) : JSX.Element => {
    let { rank, width, height, style } = props;
    
    if(!style) {
        style = {
            background: Color.BLUE,
            fontSize: "9pt",
        }
    }
    
    let labelStyle = {
        ...style,
        width: width + 'px',
        height: height + 'px',
        marginRight: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: Color.WHITE,
    }

    return (
        <Label style={ labelStyle }>
            {rank + ''}
        </Label>
    )
}

export default memo(numberLabel);
