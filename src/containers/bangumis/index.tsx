import React from 'react';
import { BangumiType } from '../../interface/BangumiType';
import BangumiLabel from '../../components/bangumiLabel';
import NaviSection from '../naviSection';
import PageNavigator from '../../components/pageNavigator';
import BangumiListApi from '../../api/BangumiListApi';
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from '../../const/window_size_threshold';
import './index.css';  

interface BangumisState {
    bangumis: Array<BangumiType>,
    currentPage: number,
    pageNum: number,
    bangumiSectionWidth: string,
}

class BangumisView extends React.Component<{}, BangumisState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiType>(),
            currentPage: 1,
            pageNum: 0,
            bangumiSectionWidth: '75%',
        }
        this.onPageClicked = this.onPageClicked.bind(this);
    }
    
    public componentDidMount() : void {
        const order = -1;
        this.fetchBangumiData(this.state.currentPage, order);
        BangumiListApi.getBangumiCount()
        .then(res => {
            let bangumiNumber : number = res.data.data.bangumiNumber;
            const pageNumber = bangumiNumber % 24 === 0 ? bangumiNumber/24 : Math.floor(bangumiNumber/24 + 1);
            this.setState({
                pageNum: pageNumber,
            })
        });
        window.onresize = () => {
            let width : string = window.innerWidth < USER_CARD_VISIBLE_MIN_WINDOW_SIZE ? '100%' : '75%';
            this.setState({
                bangumiSectionWidth: width,
            })
        };
    };

    public onPageClicked = (pageNum : number) : void => {
        // avoid repeated click
        if (pageNum === this.state.currentPage) {
            return;
        }
        const order = -1;
        this.fetchBangumiData(pageNum, order);
        this.setState({
            currentPage: pageNum,
        })
    }

    public render() : JSX.Element {
        const bangumiPageView : Array<JSX.Element> = this.state.bangumis.map(bangumi => {
            return <BangumiLabel key={ bangumi.anime_id } anime_id = { bangumi.anime_id } title = { bangumi.title } 
            image_url = { bangumi.image_url } width = '25%'/>
        })

        const loadingView : JSX.Element = <div>loading</div>

        return (
            <div className = 'bangumiPageStyle'>
                <NaviSection currentTab = '番剧'/>
                <div className = 'bangumilistStyle' style = {{width: this.state.bangumiSectionWidth}}>
                    { this.state.bangumis.length > 0 ? bangumiPageView : loadingView }
                </div>
                <div className = 'pageNavigatorStyle'>
                    { this.state.pageNum > 0 ? <PageNavigator page={ this.state.pageNum } onPageClicked = { this.onPageClicked }/> : null }
                </div>
            </div>
        )
    }

    private fetchBangumiData(page : number, order: 1 | -1) : void {
        this.setState({
            bangumis: [],
        })
        BangumiListApi.getBangumiWithPagingOrderByDate(page, order)
        .then(res => {
            if (res.data) {
                this.setState({
                    bangumis: res.data.data.bangumiList,
                })
            } else {
               alert("No bangumi found"); 
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default BangumisView;
