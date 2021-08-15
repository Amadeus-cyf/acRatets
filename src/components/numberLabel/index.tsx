import { memo } from 'react';
import { Label } from 'semantic-ui-react';
import './index.css';

type PropsType = {
    rank : number,
    width: number,
    height: number,
}

const numberLabel = (props : PropsType) : JSX.Element => {
    const { rank, width, height } = props;

    const labelStyle = {
        width: width + 'px',
        height: height + 'px',
        transform: 'translateY(-5px)',
        marginRight: '15px',
        background: 'rgba(50, 154, 255, 1)',
    }

    return (
        <Label style={ labelStyle }>
            <div className = 'numberStyle'>
                {rank + ''}
            </div>
        </Label>
    )
}

export default memo(numberLabel);
