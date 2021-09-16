import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { BangumiType } from '../../../interface/BangumiType';
import { BangumiSeasonType } from '../../../interface/BangumiSeasonType';
import BangumiLabel from '../../../components/bangumiLabel';
import BangumiApi from '../../../api/BangumiApi';
import { headerStyle, divierStyle } from './style';
import './index.css';

interface BangumisState {
    bangumis: Array<BangumiType>,
}

class Bangumis extends React.Component<BangumiSeasonType, BangumisState> {
    public constructor(props : BangumiSeasonType) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiType>(),
        }
    }

    public componentDidMount() : void {
        const limit = 6;
        const { season, year } = this.props;
        BangumiApi.getBangumiBySeasonWithLimit(year, season, limit)
        .then(res => {
            this.setState({
                bangumis: res.data.data.bangumiList,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    public render() : JSX.Element {
        const { month, year } = this.props
        const bangumisView = Array.from(this.state.bangumis).map((bangumi : BangumiType) => (
            <BangumiLabel key = { "Bangumis " + bangumi.anime_id } anime_id = { bangumi.anime_id } title = { bangumi.title } 
                image_url = { bangumi.image_url } width = '33%'/>
        ))
    
        return (
            <div className = 'bangumiSection'>
                <Header size = 'medium' style = { headerStyle }> 
                    {year + '年' + month + '月番'}
                </Header>
                <Divider style={ divierStyle }/>
                <div className='bangumiData'>
                    { bangumisView }
                </div>
            </div>
        )
    }
}

export default Bangumis;
