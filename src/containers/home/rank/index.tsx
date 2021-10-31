import React from 'react';
import { Label, Header, Divider } from 'semantic-ui-react';
import { BangumiBriefScoreType } from '../../../interface/BangumiBriefScoreType';
import BangumiListApi from '../../../api/bangumi_list';
import { deepEqual } from '../../../utils/deepEqual';
import { renderBangumiBreifRank } from '../../render';

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
            console.log(err);
        })
    }

    public shouldComponentUpdate(nextProps : {}, nextState : RankSectionState) : boolean {
        return !deepEqual(this.state, nextState);
    }

    public render() : JSX.Element {
        return (
            <Label style = { labelStyle }>
                <Header size='large' style={headerStyle}>排行榜</Header>
                <Divider/>
                { renderBangumiBreifRank(this.state.bangumis) }
            </Label>
        )
    }
}

export default RankSection;
