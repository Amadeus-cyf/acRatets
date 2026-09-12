import React, { memo, useState } from "react";
import { Header } from "semantic-ui-react";
import { getCurrentDate } from "../../../utils/dateutil";
import DateButton from "../../../components/date_button";
import "./index.css";

type PropsType = { switchDateListener: (year: number, month: number) => void };
const currentYear = getCurrentDate().year;
const YEARS = Array.from(
    { length: currentYear - 2004 },
    (_, index) => currentYear - index
);
const MONTHS = [1, 4, 7, 10, -1];

const DateSection = ({ switchDateListener }: PropsType): JSX.Element => {
    const currentDate = getCurrentDate();
    const [selectedYear, setSelectedYear] = useState(currentDate.year);
    const [selectedMonth, setSelectedMonth] = useState(currentDate.month);

    return (
        <div className="buttonSection">
            <Header content="年份" />
            {YEARS.map((year) => (
                <DateButton
                    key={`timeline-year${year}`}
                    date={String(year)}
                    onClick={() => {
                        switchDateListener(year, selectedMonth);
                        setSelectedYear(year);
                    }}
                    style={{ background: "rgba(255, 255, 255, 0)" }}
                    selected={year === selectedYear}
                />
            ))}
            <Header content="季度" />
            {MONTHS.map((month) => (
                <DateButton
                    key={`timeline-month${month}`}
                    date={month > 0 ? `${month}月` : "全部"}
                    onClick={() => {
                        switchDateListener(selectedYear, month);
                        setSelectedMonth(month);
                    }}
                    style={{ background: "rgba(255, 255, 255, 0)" }}
                    selected={month === selectedMonth}
                />
            ))}
        </div>
    );
};

export default memo(DateSection);
