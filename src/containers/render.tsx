import { BangumiType } from '../interface/BangumiType';
import { BangumiRankType } from '../interface/BangumiRankType';
import BangumiLabel from '../components/bangumiLabel';
import RankLabel from '../components/rankLabel';
import RankDetailLabel from '../components/rankDetailLabel';
import { BangumiBriefScoreType } from '../interface/BangumiBriefScoreType';

export const renderBangumiList = (bangumis : Array<BangumiType>, width : string = '25%') : Array<JSX.Element> => {
    return bangumis.map(bangumi => (<BangumiLabel key={ "BangumisView " + bangumi.anime_id } 
        anime_id = { bangumi.anime_id } title = { bangumi.title } 
    image_url = { bangumi.image_url } width = { width }/>))
}

export const renderBangumiBreifRank = (bangumis : Array<BangumiBriefScoreType>) : Array<JSX.Element> => {
    return bangumis.map((bangumi : BangumiBriefScoreType, index : number) => {
        return (<RankLabel key = { `${bangumi.anime_id}-${index+1}` } title = { bangumi.title } score = { bangumi.score } rank = { index + 1 } 
            userNumber = { bangumi.userNumber }/>);
    });
}

export const renderBangumiRank = (bangumis : Array<BangumiRankType>) : Array<JSX.Element> => {
    return bangumis.map((bangumi, i) => (
        <RankDetailLabel anime_id={ bangumi.anime_id } title={ bangumi.title } rank = { i+1 } 
            score={ bangumi.score } userNumber={ bangumi.userNumber } image_url={ bangumi.image_url } synopsis={ bangumi.synopsis}/>
    ))
}
