import React, { Component } from 'react';
import PageList from '../../model/pageList';
import PageButton from '../pageButton';

import './index.css'

interface StateType {
    pageList: PageList,
    selectedPage: number,
}

interface PropsType {
    page: number,
    subkey: string,
    onPageClicked: (page : number) => void,
}

class pageNavigator extends Component<PropsType, StateType> {
    constructor(props : PropsType) {
        super(props);
        const page : number = this.props.page;
        this.state = {
            pageList: new PageList(page),
            selectedPage: 1,
        }
        this.onPageClicked = this.onPageClicked.bind(this);
    }

    public componentDidUpdate(prevProps : PropsType) : void {
        if(prevProps.page !== this.props.page) {
            const page : number = this.props.page;
            this.setState({
                pageList: new PageList(page)
            })
        }
    }
    
    static getDerivedStateFromProps(nextProps : PropsType, prevProps : PropsType) {
        if (nextProps.page !== prevProps.page) {
            return {
                page: nextProps.page,
            }
        }
        return null;
    }

    public onPageClicked = (pageNum : number) : void => {
        this.props.onPageClicked(pageNum);
        this.state.pageList?.onPageClicked(pageNum);
        this.setState({
            selectedPage: pageNum,
        })
    }

    public render() : JSX.Element {
        const navigatorView : Array<JSX.Element> = this.state.pageList.pages.map((num, idx) => {
            if (idx > 0 && num - this.state.pageList.pages[idx-1] !== 1) {
                return (
                    <div key = { this.props.subkey+num }>
                        <span className = 'ellipsisStyle'>...</span>
                        <PageButton pageNum = { num } onPageClicked = { this.onPageClicked }/>
                    </div>
                )
            }
            return <PageButton key = { this.props.subkey + num } pageNum = { num } onPageClicked = { this.onPageClicked }/>
        });
    
        return(
            <div className='pageNavigatorStyle'>
                { navigatorView }
            </div>
        )
    }
} 

export default pageNavigator;
