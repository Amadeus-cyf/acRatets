import React from 'react';
import { getCurrentDate } from '../../../utils/dateutil';
import { BangumiSeasonType } from '../../../interface/BangumiSeasonType';
import DateButton from '../../../components/dateButton';
import './index.css';

type StateType = {
    selectedYear: number,
    selectedMonth: number,
    selectedSeason: string,
}

type PropsType = {
    switchDateListener: (year : number, season : string) => void,
}

class DateSection extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
    }

    public render() : JSX.Element {
        return(
            <div className='buttonSection'>
                { this.renderYearOptions() }
            </div>
        )
    }

    private renderYearOptions() : Array<JSX.Element> {
        let years : Array<number> = []
        let curr : BangumiSeasonType = getCurrentDate()
        for (let i = curr.year; i >= 2005; i--) {
            years.push(i);
        }
        const onYearClick = (year : number) => {
            this.props.switchDateListener(year, "winter");
        }
        const yearsView : Array<JSX.Element> = years.map(year => {
            const listener = () => { onYearClick(year) }
            return <DateButton date = { year } onClick = { listener } style={{ background: 'rgba(255, 255, 255, 0)' }}/>
        })
        return yearsView;
    }
}

export default DateSection;
