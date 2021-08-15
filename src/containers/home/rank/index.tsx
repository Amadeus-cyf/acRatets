import React from 'react';
import { Label, Header, Divider } from 'semantic-ui-react';
import RankLabel from '../../../components/rankLabel';
import { BangumiBriefScoreType } from '../../../interface/BangumiBriefScoreType';
import BangumiListApi from '../../../api/BangumiListApi';

const labelStyle = {
    width: '100%',
    minWidth: '350px',
    minHeight: '500px',
    background: 'rgba(255, 255, 255, 0.6)',
}

const headerStyle = {
    position: 'relative', 
    top: '6px',
}

interface RankSectionState {
    bangumis: Array<BangumiBriefScoreType>,
}

const RANK_NUMBER : number = 10;

class RankSection extends React.Component<{}, RankSectionState> {
    public constructor(props : {}) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiBriefScoreType>(),
        }
    }

    public componentDidMount() : void {
        BangumiListApi.getBangumiRank(RANK_NUMBER)
        .then(res => {
            this.setState({
                bangumis: res.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
    }

    public render() : JSX.Element {
        const bangumiListView : Array<JSX.Element>= Array.from(this.state.bangumis).map((bangumi : BangumiBriefScoreType, index : number) => {
            return (<RankLabel key = { `${bangumi.anime_id}-${index+1}` } bangumiInfo = { bangumi } rankNumber = { index + 1 }/>);
        });
        return (
            <Label style = { labelStyle }>
                <Header size='large' style={headerStyle}>排行榜</Header>
                <Divider/>
                { bangumiListView  }
            </Label>
        )
    }
}

export default RankSection;
