import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PageList from '../../model/pageList';
import PageButton from '../pageButton';

import './index.css'

interface StateType {
    pageList: PageList,
    selectedPage: number,
}

interface PropsType {
    pageNum: number,
    subkey: string,
    onPageClicked: (page : number) => void,
}

class pageNavigator extends Component<PropsType, StateType> {
    constructor(props : PropsType) {
        super(props);
        const pageNum : number = this.props.pageNum;
        this.state = {
            pageList: new PageList(pageNum),
            selectedPage: 1,
        }
        this.onPageClicked = this.onPageClicked.bind(this);
        this.onPrevClicked = this.onPrevClicked.bind(this);
        this.onNextClicked = this.onNextClicked.bind(this);
    }

    public componentDidUpdate(prevProps : PropsType) : void {
        if(prevProps.pageNum !== this.props.pageNum) {
            const page : number = this.props.pageNum;
            this.setState({
                pageList: new PageList(page),
                selectedPage: 1,
            })
        }
    }
    
    static getDerivedStateFromProps(nextProps : PropsType, prevProps : PropsType) {
        if (nextProps.pageNum !== prevProps.pageNum) {
            return {
                page: nextProps.pageNum,
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

    public onPrevClicked = () : void => {
        if (this.state.selectedPage === 1) {
            return
        }
        this.onPageClicked(this.state.selectedPage-1)
    }

    public onNextClicked = () : void => {
        if (this.state.selectedPage === this.props.pageNum) {
            return
        }
        console.log(this.state.selectedPage)
        this.onPageClicked(this.state.selectedPage+1)
    }

    public render() : JSX.Element {
        const navigatorView : Array<JSX.Element> = this.state.pageList.pages.map((num, idx) => {
            if (idx > 0 && num - this.state.pageList.pages[idx-1] !== 1) {
                return (
                    <div key = { this.props.subkey+num }>
                        <span className = 'ellipsisStyle'>...</span>
                        <PageButton pageNum = { num } onPageClicked = { this.onPageClicked } isFocus ={ num === this.state.selectedPage }/>
                    </div>
                )
            }
            return <PageButton key = { this.props.subkey + 'button-' + num } pageNum = { num } onPageClicked = { this.onPageClicked } 
                isFocus ={ num === this.state.selectedPage }/>
        });
        return(
            <div className='pageNavigatorStyle'>
                <Button key = { this.props.subkey + 'button-previous'} onClick = {this.onPrevClicked} content = 'Previous' color = 'blue'
                    size = 'medium' compact disabled = {this.state.selectedPage === 1}/>
                { navigatorView }
                <Button key = { this.props.subkey + 'button-next'} onClick = {this.onNextClicked} content = 'Next' color = 'blue'
                    size = 'medium' compact disabled = {this.state.selectedPage === this.props.pageNum}/>
            </div>
        )
    }
} 

export default pageNavigator;
