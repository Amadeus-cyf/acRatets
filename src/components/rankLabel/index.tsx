import React, { memo } from 'react';
import { Label } from 'semantic-ui-react';
import NumberLabel from '../numberLabel';
import { deepCompare } from '../../utils/deepCompare';
import './index.css';
import { BangumiRankType } from '../../interface/BangumiRankType';

const labelStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0)',
    display: 'flex',
    justifyContent: 'flex-start',
}

const rankLabel = (props : BangumiRankType) => {
    const { bangumiInfo, rankNumber } = props;
    const titleBrief : string = bangumiInfo.title.length <= 20 
    ? bangumiInfo.title : bangumiInfo.title.substring(0, 20) + '...';

    return (
        <Label style = { labelStyle } key = { rankNumber }>
            <NumberLabel rank = { rankNumber } width = { 20 } height = { 27 }/>
            <p className = 'titleStyle'> { titleBrief } </p>
            <p className = 'scoreStyle'> { bangumiInfo.score + ' 分' } </p>
            <p className = 'userNumberStyle'> { bangumiInfo.userNumber + '人评分' } </p>
        </Label>
    )
}

export default memo(rankLabel, (prevProps : BangumiRankType, props : BangumiRankType) : boolean => {
    return deepCompare(prevProps.bangumiInfo, props.bangumiInfo) 
    && (prevProps.rankNumber === props.rankNumber);
});
