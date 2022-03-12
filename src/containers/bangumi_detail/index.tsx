import React from 'react';
import { RouteComponentProps } from 'react-router'
import { BangumiDetailType } from '../../interface/BangumiDetailType';
import BangumiDetailApi from '../../api/bangumi_detail';
import Navibar from '../../components/navibar';
import './index.css';

interface QueryParams {
    id: string,
}

type PropsType = RouteComponentProps<QueryParams>;

interface AiringDate {
    day: number,
    month: number,
    year: number,
}

interface BangumiDetailRespType {
    mal_id: number,
    title: string,
    title_japanese: string,
    image_url: string,
    episodes: number,
    status: string,
    airing: boolean,
    aired: {
        prop: {
            from: AiringDate,
            to: AiringDate,
        }
    },
    synopsis: string,
    genres: Array<{name: string}>,
    producers: Array<{name: string}>,
}

interface StateType {
    bangumi: BangumiDetailType | undefined,
}

class BangumiDetail extends React.Component<RouteComponentProps<QueryParams>, StateType> {
    constructor(props : PropsType) {
        super(props)
        this.state = {
            bangumi: undefined,
        }
    }

    public componentDidMount(): void {
        BangumiDetailApi.getBangumiDetailV2(this.props.match.params.id)
        .then(res => {
            this.setState({
                bangumi: this.toBangumiDetail(res.data)
            })
        }).catch(err => {
            console.log(err)
            return BangumiDetailApi.getBangumiDetailV1(this.props.match.params.id)
        }).then(res => {
            if(res) {
                this.setState({
                    bangumi: res.data.data.bangumi,
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    public render() : JSX.Element {
        return(
          <div className='navibarDetailPageStyle '>
              <Navibar />
          </div>
        )
    }

    private toBangumiDetail(res : BangumiDetailRespType) : BangumiDetailType {
        const bangumiDetail : BangumiDetailType = {
            anime_id: res.mal_id,
            title: res.title,
            title_japanese: res.title_japanese,
            image_url: res.image_url,
            episodes: res.episodes,
            status: res.status,
            airing: res.airing,
            aired_from: this.airingDateToString(res.aired.prop.from),
            aired_to: this.airingDateToString(res.aired.prop.to),
            synopsis: res.synopsis,
            genres: res.genres.map(g => g.name),
            producers: res.producers.map(p => p.name),
        }

        return bangumiDetail;
    }

    private airingDateToString(airing : AiringDate) : string {
        return `${airing.year}/${airing.month}/${airing.day}`
    }
}

export default BangumiDetail;
