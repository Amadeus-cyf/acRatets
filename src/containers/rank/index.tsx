import React from "react";
import { BangumiRankType } from '../../interface/BangumiRankType';
import NaviSection from '../naviSection';
import BangumiListApi from '../../api/bangumi_list';
import { renderBangumiRank } from '../render';
import './index.css'
import { deepEqual } from "../../utils/deepEqual";

interface StateType {
    bangumis: Array<BangumiRankType>
}

class Rank extends React.Component<{}, StateType> {
    constructor(props : {}) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiRankType>(),
        }
    }

    public componentDidMount() : void {
        BangumiListApi.getBangumiRank(20).then(res => {
            this.setState({
                bangumis: res.data.data.bangumiList,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    public shouldComponentUpdate(nextProps : {}, nextState : StateType) : boolean {
        return !deepEqual(this.state, nextState);
    }

    public render() : JSX.Element {
        const loadingView : JSX.Element = <div>loading</div>
        
        return (
            <div className='rankPageStyle'>
                <NaviSection currentTab = '排行榜'/>
                <div className='bangumiRankStyle'>
                    { this.state.bangumis.length > 0 ?  renderBangumiRank(this.state.bangumis) : loadingView }
                </div>
            </div>
        )
    }
}

export default Rank;
