import React, { useCallback, useEffect, useState } from "react";
import { BangumiType } from "../../interface/BangumiType";
import NaviSection from "../navi_section";
import PageNavigator from "../../components/page_navigator";
import BangumiListApi from "../../api/bangumi_list";
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from "../../const/window_size_threshold";
import { renderBangumiList } from "../render";
import "./index.css";

const mediaQuery = `(max-width: ${USER_CARD_VISIBLE_MIN_WINDOW_SIZE - 1}px)`;

const BangumisView = (): JSX.Element => {
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const [isNarrow, setIsNarrow] = useState(
        () => window.matchMedia(mediaQuery).matches
    );

    useEffect(() => {
        const controller = new AbortController();
        setBangumis([]);
        BangumiListApi.getBangumiWithPagingOrderByDate(
            currentPage,
            -1,
            controller.signal
        )
            .then((res) => {
                if (res.data) setBangumis(res.data.data.bangumiList);
                else console.log("No bangumi found");
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });
        return () => controller.abort();
    }, [currentPage]);

    useEffect(() => {
        const controller = new AbortController();
        BangumiListApi.getBangumiCount(controller.signal)
            .then((res) =>
                setPageNum(Math.ceil(res.data.data.bangumiNumber / 24))
            )
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });

        const query = window.matchMedia(mediaQuery);
        const onChange = (event: MediaQueryListEvent) =>
            setIsNarrow(event.matches);
        query.addEventListener("change", onChange);
        return () => {
            controller.abort();
            query.removeEventListener("change", onChange);
        };
    }, []);

    const onPageClicked = useCallback(
        (nextPage: number): void => {
            if (nextPage === currentPage) return;
            setCurrentPage(nextPage);
        },
        [currentPage]
    );

    return (
        <div className="bangumiPageStyle">
            <NaviSection currentTab="番剧" />
            <div
                className="bangumilistStyle"
                style={{ width: isNarrow ? "100%" : "75%" }}
            >
                {bangumis.length > 0 ? (
                    renderBangumiList(bangumis, "25%")
                ) : (
                    <div>loading</div>
                )}
            </div>
            {pageNum > 0 && (
                <PageNavigator
                    subkey="BangumisViewNavi"
                    pageNum={pageNum}
                    onPageClicked={onPageClicked}
                    selectedPage={currentPage}
                />
            )}
        </div>
    );
};

export default BangumisView;
