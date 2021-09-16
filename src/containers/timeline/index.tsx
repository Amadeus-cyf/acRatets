import React from 'react';
import { getCurrentDate, getSeasonFromMonth } from '../../utils/dateutil';
import { BangumiSeasonType } from '../../interface/BangumiSeasonType';
import { BangumiType } from '../../interface/BangumiType';
import BangumiLabel from '../../components/bangumiLabel';
import NaviSection from '../naviSection';
import TimelineApi from '../../api/TimelineApi';
import DateSection from './dateSection';
import PageNavigator from '../../components/pageNavigator';
import './index.css'

interface TimeState {
    year: number,
    month: number,
    season: string,
    page: number,
    pageNum: number,
    bangumis: Array<BangumiType>,
}

class Timeline extends React.Component<{}, TimeState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            year: 0,
            month: 0,
            season: "",
            page: 1,
            pageNum: 0,
            bangumis: new Array<BangumiType>()
        }
        this.onSwitchDate = this.onSwitchDate.bind(this)
    }

    public componentDidMount() : void {
        const date : BangumiSeasonType = getCurrentDate()
        this.setState({
            year: date.year,
            month: date.month,
            season: date.season,
        })
        this.onSwitchDate(date.year, date.month);
    }

    private onSwitchDate(year : number, month : number) : void {
        const season : string = getSeasonFromMonth(month)
        if (year === this.state.year && season === this.state.season) {
            return;
        }
        this.setState({
            year: year,
            season: season,
            bangumis: [],
            page: 1,
        })
        this.fetchBangumi(year, season, 1)
        this.getPageNum(year, season)
    }

    public onPageClicked = (page : number) : void => {
        if (page === this.state.page) {
            return
        }
        this.setState({
            page: page,
        })
        this.fetchBangumi(this.state.year, this.state.season, page)
    }

    private getPageNum(year : number, season : string) : void {
        TimelineApi.GetTimelineNum(year, season).then(res => {
            this.setState({
                pageNum: Math.floor(res.data.data.bangumiNumber / 20) + (res.data.data.bangumiNumber % 20 === 0 ? 0 : 1)
            });
        })
    }

    private fetchBangumi(year : number, season: string, page : number) : void {
        TimelineApi.GetTimelineInPage(year, season, page).then(res => {
            this.setState({
                bangumis: res.data.data.bangumiList,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    public render() : JSX.Element {
        const bangumiPageView : Array<JSX.Element> = this.state.bangumis.map(bangumi => {
            return <BangumiLabel key={ bangumi.anime_id } anime_id = { bangumi.anime_id } title = { bangumi.title } 
            image_url = { bangumi.image_url } width = '25%'/>
        })
        const loadingView : JSX.Element = <div>loading</div>
        return (
            <div className='timelinePageStyle'>
                <NaviSection currentTab = '时间表'/>
                <div className='timeline'>
                    <div className='timelineBangumi'>
                            { bangumiPageView.length > 0 ? bangumiPageView : loadingView }
                    </div>
                    <div className='timelineDate'>
                        <DateSection switchDateListener = { this.onSwitchDate }/>
                    </div>
                </div>
                { this.state.pageNum > 0 ? <PageNavigator subkey="TimelineNavi" page = { this.state.pageNum } onPageClicked = { this.onPageClicked }/> : null }
            </div>
        )
    }
}

export default Timeline;
