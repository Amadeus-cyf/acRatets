import React from 'react';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { BangumiSeasonType } from '../../interface/BangumiSeasonType';
import { BangumiType } from '../../interface/BangumiType';
import BangumiLabel from '../../components/bangumiLabel';
import TimelineApi from '../../api/TimelineApi';

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
    }

    public componentDidMount() : void {
        var date : BangumiSeasonType = getCurrentDate()
        this.setState({
            year: date.year,
            month: date.month,
            season: date.season,
        })
        TimelineApi.GetTimelineInPage(date.year, date.season, 1).then(res => {
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

        if(bangumiPageView.length === 0) {
            return loadingView;
        }

        return (
            <div>
                { bangumiPageView }
            </div>
        )
    }
}

export default Timeline;
