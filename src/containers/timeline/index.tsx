import React from 'react';
import { getCurrentDate } from '../../utils/dateutil';
import { BangumiSeasonType } from '../../interface/BangumiSeasonType';
import { BangumiType } from '../../interface/BangumiType';
import BangumiLabel from '../../components/bangumiLabel';
import NaviSection from '../naviSection';
import TimelineApi from '../../api/TimelineApi';
import DateSection from './dateSection';
import './index.css'

interface TimeState {
    year: number,
    month: number,
    season: string,
    page: number,
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
            bangumis: new Array<BangumiType>()
        }
        this.onSwitchDate = this.onSwitchDate.bind(this)
    }

    public componentDidMount() : void {
        var date : BangumiSeasonType = getCurrentDate()
        this.setState({
            year: date.year,
            month: date.month,
            season: date.season,
        })
        this.onSwitchDate(date.year, date.season);
    }

    private onSwitchDate(year : number, season : string) : void {
        if(year === this.state.year && season === this.state.season) {
            return;
        }
        this.setState({
            year: year,
            season: season,
            bangumis: [],
        })
        TimelineApi.GetTimelineInPage(year, season, 1).then(res => {
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
                            { bangumiPageView.length > 0 ? bangumiPageView : loadingView}
                    </div>
                    <div className='timelineDate'>
                        <DateSection switchDateListener = { this.onSwitchDate }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline;
