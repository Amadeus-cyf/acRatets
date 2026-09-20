import React, { useCallback, useEffect, useState } from "react";
import { BangumiType } from "@/interface/BangumiType";
import NavigationSection from "@/containers/navigation_section";
import PageNavigator from "@/components/page_navigator";
import BangumiListApi from "@/api/bangumi_list";
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from "@/const/window_size_threshold";
import { renderBangumiList } from "@/containers/render";
import AsyncState, { LoadStatus } from "@/components/async_state";
import { useRetry } from "@/hooks/useRetry";
import "./index.css";

const mediaQuery = `(max-width: ${USER_CARD_VISIBLE_MIN_WINDOW_SIZE - 1}px)`;

const BangumisView = (): React.ReactElement => {
    const [bangumis, setBangumis] = useState<BangumiType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const [isNarrow, setIsNarrow] = useState(
        () => window.matchMedia(mediaQuery).matches
    );
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [paginationFailed, setPaginationFailed] = useState(false);
    const [retryKey, retry] = useRetry();

    useEffect(() => {
        const controller = new AbortController();
        setBangumis([]);
        setStatus("loading");
        BangumiListApi.getBangumiWithPagingOrderByDate(
            currentPage,
            -1,
            controller.signal
        )
            .then((res) => {
                const nextBangumis = res.data.data.bangumiList;
                setBangumis(nextBangumis);
                setStatus(nextBangumis.length > 0 ? "success" : "empty");
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("error");
            });
        return () => controller.abort();
    }, [currentPage, retryKey]);

    useEffect(() => {
        const controller = new AbortController();
        setPaginationFailed(false);
        BangumiListApi.getBangumiCount(controller.signal)
            .then((res) =>
                setPageNum(Math.ceil(res.data.data.bangumiNumber / 24))
            )
            .catch(() => {
                if (!controller.signal.aborted) setPaginationFailed(true);
            });

        const query = window.matchMedia(mediaQuery);
        const onChange = (event: MediaQueryListEvent) =>
            setIsNarrow(event.matches);
        query.addEventListener("change", onChange);
        return () => {
            controller.abort();
            query.removeEventListener("change", onChange);
        };
    }, [retryKey]);

    const onPageClicked = useCallback(
        (nextPage: number): void => {
            if (nextPage === currentPage) return;
            setCurrentPage(nextPage);
        },
        [currentPage]
    );

    return (
        <div className="bangumiPageStyle">
            <NavigationSection currentTab="番剧" />
            <div
                className="bangumilistStyle"
                style={{ width: isNarrow ? "100%" : "75%" }}
            >
                {status === "success" ? (
                    renderBangumiList(bangumis, "25%")
                ) : (
                    <AsyncState
                        onRetry={retry}
                        status={status}
                        message={
                            status === "error"
                                ? "The anime list could not be loaded."
                                : status === "empty"
                                  ? "No anime found."
                                  : "Loading anime…"
                        }
                    />
                )}
            </div>
            {paginationFailed && (
                <AsyncState
                    onRetry={retry}
                    status="error"
                    message="Anime pagination is unavailable."
                />
            )}
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
