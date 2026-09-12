import React, { useCallback, useEffect, useState } from "react";
import { getCurrentDate, getSeasonFromMonth } from "../../utils/dateutil";
import { BangumiType } from "../../interface/BangumiType";
import NavigationSection from "../navigation_section";
import TimelineApi from "../../api/timeline";
import DateSection from "./date_section";
import PageNavigator from "../../components/page_navigator";
import { renderBangumiList } from "../render";
import "./index.css";

const Timeline = (): JSX.Element => {
    const currentDate = getCurrentDate();
    const [year, setYear] = useState(currentDate.year);
    const [season, setSeason] = useState(currentDate.season);
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        setBangumis([]);
        TimelineApi.getTimelineInPage(year, season, page, controller.signal)
            .then((res) => setBangumis(res.data.data.bangumiList))
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, [page, season, year]);

    useEffect(() => {
        const controller = new AbortController();
        setPageNum(0);
        TimelineApi.getTimelineCount(year, season, controller.signal)
            .then((res) => {
                const count = res.data.data.bangumiNumber;
                setPageNum(Math.ceil(count / 20));
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, [season, year]);

    const onSwitchDate = useCallback(
        (nextYear: number, month: number): void => {
            const nextSeason = getSeasonFromMonth(month);
            if (nextYear === year && nextSeason === season) return;
            setYear(nextYear);
            setSeason(nextSeason);
            setPage(1);
        },
        [season, year]
    );

    const onPageClicked = useCallback(
        (nextPage: number): void => {
            if (nextPage === page) return;
            setPage(nextPage);
        },
        [page]
    );

    return (
        <div className="timelinePageStyle">
            <NavigationSection currentTab="时间表" />
            <div className="timeline">
                <div className="timelineBangumi">
                    <div className="timelineBangumiDataStyle">
                        {bangumis.length > 0 ? (
                            renderBangumiList(bangumis, "25%")
                        ) : (
                            <div>loading</div>
                        )}
                    </div>
                    {pageNum > 0 && (
                        <PageNavigator
                            subkey="TimelineNavi"
                            pageNum={pageNum}
                            onPageClicked={onPageClicked}
                            selectedPage={page}
                        />
                    )}
                </div>
                <div className="timelineDate">
                    <DateSection switchDateListener={onSwitchDate} />
                </div>
            </div>
        </div>
    );
};

export default Timeline;
