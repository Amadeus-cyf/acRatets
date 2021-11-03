import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../utils/mapStateToProps';
import Bangumis from '../home/bangumis';
import UserCard from '../../components/userCard';
import NaviSection from '../naviSection';
import { BangumiSeasonType } from "../../interface/BangumiSeasonType";
import { getCurrentDate } from '../../utils/dateutil';
import { getPreviousDate } from '../../utils/dateutil';
import RankSection from './rank';
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from '../../const/window_size_threshold';
import './index.css';
import { UserType } from '../../interface/UserType';

type StateType = {
    visibility: string,
    bangumiSectionWidth: string,
}

type PropsType = {
    user: UserType,
}

class Home extends React.PureComponent<PropsType, StateType> {
    private currentSeason : BangumiSeasonType = getCurrentDate();
    private previousSeason : BangumiSeasonType = getPreviousDate();

    public constructor(props : PropsType) {
        super(props);
        this.state = {
            visibility: window.innerWidth < USER_CARD_VISIBLE_MIN_WINDOW_SIZE ? 'none' : 'block',
            bangumiSectionWidth: window.innerWidth < USER_CARD_VISIBLE_MIN_WINDOW_SIZE ? String(window.innerWidth) : '65%',
        }
    }

    public componentDidMount() : void {
        // when the window size is smaller than the threshold, make user card invisible
        window.onresize = () => {
            let visibility : string = 'block';
            let bangumiSectionWidth : string = '65%';
            if (window.innerWidth < USER_CARD_VISIBLE_MIN_WINDOW_SIZE) {
                visibility = 'none'
                bangumiSectionWidth = '100%'
            }
            this.setState({
                visibility: visibility,
                bangumiSectionWidth: bangumiSectionWidth,
            })
        }
    }

    public render() : JSX.Element {
        const { user } = this.props;
       
        return (
            <div>
                <NaviSection currentTab = '主页' />
                <div className = 'contentStyle'>
                    <div  style = {{ width : this.state.bangumiSectionWidth }} className = 'bangumiStyle'>
                        <Bangumis year = { this.currentSeason.year } month = { this.currentSeason.month }
                            season = { this.currentSeason.season } />
                        <Bangumis year = { this.previousSeason.year } month = { this.previousSeason.month }
                            season = { this.previousSeason.season } />
                    </div>
                    <div className = 'leftSectionStyle' style = {{display: this.state.visibility}} >
                        <UserCard user = { user }/>
                        <RankSection />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);
