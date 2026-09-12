import React, { useMemo } from "react";
import { Button } from "../ui";
import PageList from "../../model/pagelist";
import PageButton from "../page_button";

import "./index.css";

interface PropsType {
    pageNum: number;
    subkey: string;
    selectedPage: number;
    onPageClicked: (page: number) => void;
}

const PageNavigator = ({
    pageNum,
    subkey,
    selectedPage,
    onPageClicked: notifyPageClicked,
}: PropsType): React.ReactElement => {
    const pages = useMemo(() => {
        const pageList = new PageList(pageNum);
        pageList.onPageClicked(selectedPage);
        return pageList.pages;
    }, [pageNum, selectedPage]);

    const onPageClicked = (page: number): void => {
        notifyPageClicked(page);
    };

    const onPrevClicked = (): void => {
        if (selectedPage === 1) {
            return;
        }
        onPageClicked(selectedPage - 1);
    };

    const onNextClicked = (): void => {
        if (selectedPage === pageNum) {
            return;
        }
        onPageClicked(selectedPage + 1);
    };

    const navigatorView = pages.map((num, idx) => {
        const button = (
            <PageButton
                key={`${subkey}button-${num}`}
                pageNum={num}
                onPageClicked={onPageClicked}
                isFocus={num === selectedPage}
            />
        );
        if (idx > 0 && num - pages[idx - 1] !== 1) {
            return (
                <div key={subkey + num}>
                    <span className="ellipsisStyle">...</span>
                    {button}
                </div>
            );
        }
        return button;
    });

    return (
        <div className="pageNavigatorStyle">
            <Button
                key={`${subkey}button-previous`}
                onClick={onPrevClicked}
                content="Previous"
                color="blue"
                size="medium"
                compact
                disabled={selectedPage === 1}
            />
            {navigatorView}
            <Button
                key={`${subkey}button-next`}
                onClick={onNextClicked}
                content="Next"
                color="blue"
                size="medium"
                compact
                disabled={selectedPage === pageNum}
            />
        </div>
    );
};

export default PageNavigator;
