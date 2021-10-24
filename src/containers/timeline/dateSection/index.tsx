import React, { memo } from 'react';
import { Header } from 'semantic-ui-react';
import { getCurrentDate } from '../../../utils/dateutil';
import { BangumiSeasonType } from '../../../interface/BangumiSeasonType';
import DateButton from '../../../components/dateButton';
import './index.css';

type StateType = {
    selectedYear: number,
    selectedMonth: number,
}

type PropsType = {
    switchDateListener: (year : number, month : number) => void,
}

class DateSection extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        const currDate : BangumiSeasonType = getCurrentDate()
        this.state = {
            selectedYear: currDate.year,
            selectedMonth: currDate.month,
        }
    }

    public render() : JSX.Element {
        return(
            <div className='buttonSection'>
                <Header>年份</Header>
                { this.renderYears() }
                <Header>季度</Header>
                { this.renderMonths() }
            </div>
        )
    }

    private renderYears() : Array<JSX.Element> {
        let years : Array<number> = []
        let curr : BangumiSeasonType = getCurrentDate()
        for (let i = curr.year; i >= 2005; i--) {
            years.push(i);
        }
        const onYearClick = (year : number) => {
            this.props.switchDateListener(year, this.state.selectedMonth);
            this.setState({
                selectedYear: year,
            })
        }
        const yearsView : Array<JSX.Element> = years.map(year => {
            const listener = () => { onYearClick(year) }
            return <DateButton key = { "timeline-year" + year } date = { String(year) } onClick = { listener } 
                style={{ background: 'rgba(255, 255, 255, 0)' }} 
                selected={ year === this.state.selectedYear }/>
        })
        return yearsView;
    }

    private renderMonths() : Array<JSX.Element> {
        let months : Array<number> = [1, 4, 7, 10, -1]
        const onMonthClick = (month : number) => {
            this.props.switchDateListener(this.state.selectedYear, month)
            this.setState({
                selectedMonth: month,
            })
        }
        const monthsView : Array<JSX.Element> = months.map(month => {
            const listener = () => { onMonthClick(month) }
            return <DateButton key = { "timeline-month" + month } date = { month > 0 ? month + '月' : '全部' } onClick = { listener } 
                style={{ background: 'rgba(255, 255, 255, 0)' }} 
                selected={ month === this.state.selectedMonth }/>
        })
        return monthsView;
    }
}

export default memo(DateSection, (prev : PropsType, curr : PropsType) : boolean => { return true });
