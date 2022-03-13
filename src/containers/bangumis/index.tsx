import React from 'react';
import { BangumiType } from '../../interface/BangumiType';
import NaviSection from '../navi_section';
import PageNavigator from '../../components/page_navigator';
import BangumiListApi from '../../api/bangumi_list';
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from '../../const/window_size_threshold';
import { renderBangumiList } from '../render';
import './index.css';
import { deepEqual } from '../../utils/deepEqual';

interface StateType {
    bangumis: Array<BangumiType>,
    currentPage: number,
    pageNum: number,
    bangumiSectionWidth: string,
}

class BangumisView extends React.Component<{}, StateType> {
    constructor(props : {}) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiType>(),
            currentPage: 1,
            pageNum: 0,
            bangumiSectionWidth: '85%',
        }
        this.onPageClicked = this.onPageClicked.bind(this);
    }
    
    public componentDidMount() : void {
        const order = -1;
        this.fetchBangumiData(this.state.currentPage, order);
        BangumiListApi.getBangumiCount().then(res => {
            let bangumiNumber : number = res.data.data.bangumiNumber;
            const pageNumber = bangumiNumber % 24 === 0 ? bangumiNumber/24 : Math.floor(bangumiNumber/24 + 1);
            this.setState({
                pageNum: pageNumber,
            })
        }).catch(err => {
            console.log(err)
        });
        window.onresize = () => {
            let width : string = window.innerWidth < USER_CARD_VISIBLE_MIN_WINDOW_SIZE ? '100%' : '75%';
            this.setState({
                bangumiSectionWidth: width,
            })
        };
    }

    public shouldComponentUpdate(nextProps : {}, nextState : StateType) : boolean {
        return !deepEqual(this.state, nextState);
    }

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
        const loadingView : JSX.Element = <div>loading</div>

        return (
            <div className = 'bangumiPageStyle'>
                <NaviSection currentTab = '番剧'/>
                <div className = 'bangumilistStyle' style = {{ width: this.state.bangumiSectionWidth }}>
                    { this.state.bangumis.length > 0 ? renderBangumiList(this.state.bangumis, '25%') : loadingView }
                </div>
                { this.state.pageNum > 0 ? <PageNavigator subkey="BangumisViewNavi" pageNum={ this.state.pageNum } onPageClicked = { this.onPageClicked } 
                    selectedPage = { this.state.currentPage }/> : null }
            </div>
        )
    }

    private fetchBangumiData(page : number, order: 1 | -1) : void {
        this.setState({
            bangumis: [],
        })
        BangumiListApi.getBangumiWithPagingOrderByDate(page, order).then(res => {
            if (res.data) {
                this.setState({
                    bangumis: res.data.data.bangumiList,
                })
            } else {
               console.log("No bangumi found"); 
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default BangumisView;
