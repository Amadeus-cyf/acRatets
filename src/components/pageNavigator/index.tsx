import React, { Component } from 'react';
import PageList from '../../model/pageList';
import PageButton from '../pageButton';

import './index.css'

interface StateType {
    pageList: PageList,
}

interface PropsType {
    page: number,
    onPageClicked: (page : number) => void,
}

class pageNavigator extends Component<PropsType, StateType> {
    constructor(props : PropsType) {
        super(props);
        this.state = {
            pageList: new PageList(this.props.page),
        }
        this.onPageClicked = this.onPageClicked.bind(this);
    }

    public onPageClicked = (pageNum : number) : void => {
        this.props.onPageClicked(pageNum);
        this.state.pageList?.onPageClicked(pageNum);
    }

    public render() : JSX.Element {
        const navigatorView : Array<JSX.Element> = this.state.pageList.pages.map((num, idx) => {
            if (idx > 0 && num - this.state.pageList.pages[idx-1] !== 1) {
                return (
                    <div key={ num }>
                        <span className = 'ellipsisStyle'>...</span>
                        <PageButton pageNum = { num } onPageClicked = { this.onPageClicked }/>
                    </div>
                )
            }
            return <PageButton key={ num } pageNum = { num } onPageClicked = { this.onPageClicked }/>
        });
    
        return(
            <>
                {navigatorView}
            </>
        )
    }
} 

export default pageNavigator;