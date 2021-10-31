import React, { memo } from 'react';
import NumberLabel from '../numberLabel';
import { Label, Image, Header, Divider } from 'semantic-ui-react';
import { BangumiRankType } from '../../interface/BangumiRankType';
import ScoreLabel from '../scoreLabel';
import Color from '../../const/color'
import './index.css';

const imageStyle = {
    width: '190px',
    height: 'auto',
}

const titleStyle = {
    margin: '5px',
    color: Color.PINK,
}

const labelStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0)',
}

const rankDetailLabel = (props : BangumiRankType) : JSX.Element => {
    const { title, image_url, synopsis, rank, score, userNumber } = props;

    const synoBrief = synopsis.length > 200 ? (synopsis.substring(0, 200) + '...') : synopsis;

    return (
        <Label style={ labelStyle }>
            <div className="bangumiDetailLabelStyle">
                <NumberLabel rank = { rank } width = { 37 } height = { 42 } style = {{ background: Color.PINK, fontSize:'12pt' }}/>
                <Image className = 'hoverPartStyle' style = { imageStyle } src = {image_url} rounded/>
                <div className='bangumiInfoStyle'>
                    <Header size='large' className = 'hoverPartStyle' style = { titleStyle }> { title } </Header>
                    <div className="synopsisStyle">
                        { synoBrief }
                    </div>
                </div>
            </div>
            <div className="bangumiScoreStyle">
                <ScoreLabel score = { score } user = { userNumber }/>
            </div>
            <Divider />
        </Label>
    )
}

export default memo(rankDetailLabel);
