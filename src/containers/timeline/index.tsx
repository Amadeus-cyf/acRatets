import React, { useCallback, useEffect, useState } from "react";
import { getCurrentDate, getSeasonFromMonth } from "@/utils/dateutil";
import { BangumiType } from "@/interface/BangumiType";
import NavigationSection from "@/containers/navigation_section";
import TimelineApi from "@/api/timeline";
import DateSection from "./date_section";
import PageNavigator from "@/components/page_navigator";
import { renderBangumiList } from "@/containers/render";
import AsyncState, { LoadStatus } from "@/components/async_state";
import "./index.css";

const Timeline = (): React.ReactElement => {
    const currentDate = getCurrentDate();
    const [year, setYear] = useState(currentDate.year);
    const [season, setSeason] = useState(currentDate.season);
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [paginationFailed, setPaginationFailed] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setBangumis([]);
        setStatus("loading");
        TimelineApi.getTimelineInPage(year, season, page, controller.signal)
            .then((res) => {
                const nextBangumis = res.data.data.bangumiList;
                setBangumis(nextBangumis);
                setStatus(nextBangumis.length > 0 ? "success" : "empty");
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("error");
            });
        return () => controller.abort();
    }, [page, season, year]);

    useEffect(() => {
        const controller = new AbortController();
        setPageNum(0);
        setPaginationFailed(false);
        TimelineApi.getTimelineCount(year, season, controller.signal)
            .then((res) => {
                const count = res.data.data.bangumiNumber;
                setPageNum(Math.ceil(count / 20));
            })
            .catch(() => {
                if (!controller.signal.aborted) setPaginationFailed(true);
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
                        {status === "success" ? (
                            renderBangumiList(bangumis, "25%")
                        ) : (
                            <AsyncState
                                status={status}
                                message={
                                    status === "error"
                                        ? "The timeline could not be loaded."
                                        : status === "empty"
                                          ? "No anime found for this period."
                                          : "Loading timeline…"
                                }
                            />
                        )}
                    </div>
                    {paginationFailed && (
                        <AsyncState
                            status="error"
                            message="Timeline pagination is unavailable."
                        />
                    )}
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
