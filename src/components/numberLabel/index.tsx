import { memo } from 'react';
import { Label } from 'semantic-ui-react';
import Color from '../../const/color';

type PropsType = {
    rank : number,
    width: number,
    height: number,
    color?: string,
    fontSize?: string,
}

const numberLabel = (props : PropsType) : JSX.Element => {
    const { rank, width, height, color, fontSize } = props;
    
    const labelStyle = {
        width: width + 'px',
        height: height + 'px',
        marginRight: '15px',
        background: color? color : Color.BLUE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: Color.WHITE,
        fontSize: fontSize? fontSize : '9pt',
    }

    return (
        <Label style={ labelStyle }>
            {rank + ''}
        </Label>
    )
}

export default memo(numberLabel);
