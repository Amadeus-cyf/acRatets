import { memo } from 'react';
import  { Label, Header } from 'semantic-ui-react';
import Color from '../../const/color';
import { deepEqual } from '../../utils/deepEqual';
import './index.css'

interface PropsType {
    score: number,
    user: number,
    style?: object,
}

const scoreLabel = (props : PropsType) => {
    const { score, user, style } = props
    
    const labelStyle = {
        ...style,
        width: '100%',
        background: 'rgba(255, 255, 255, 0)',
    }
    return <Label style={ labelStyle }>
        <Header size='large' style={{ "color": Color.YELLOW }}>{ score.toFixed(1) }</Header>
        <div className='userNumStyle'>{ `${user}评分`}</div>
    </Label>
}

export default memo(scoreLabel, (prevProps : PropsType, props : PropsType) : boolean => {
    return prevProps.score === props.score && prevProps.user === props.user 
        && deepEqual(prevProps.style, props.style); 
});
