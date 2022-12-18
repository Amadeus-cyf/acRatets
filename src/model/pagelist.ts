import { MaxPagesThreshold } from "./const";

class PageList {
    pages: Array<number>;
    pageCount: number;

    constructor(pageCount: number) {
        this.pageCount = pageCount;
        this.pages = new Array<number>();
        this.init();
    }

    public onPageClicked(pageNum: number): void {
        if (
            pageNum < 1 ||
            pageNum > this.pageCount ||
            this.pageCount <= MaxPagesThreshold
        ) {
            // for page list with page num <= 11, display all
            return;
        }
        this.pages = this.pages.filter((page) => {
            return (
                page <= 3 ||
                page >= this.pageCount - 2 ||
                Math.abs(page - pageNum) <= 2
            );
        });
        for (
            let i = Math.max(pageNum - 2, 1);
            i <= Math.min(pageNum + 2, this.pageCount);
            i++
        ) {
            if (this.pages.indexOf(i) < 0) {
                this.pages.push(i);
            }
        }
        if (this.pages.length < MaxPagesThreshold) {
            let mid: number = Math.floor(this.pageCount / 2);
            for (
                let i = Math.max(1, mid - 2);
                i <= Math.min(mid + 2, this.pageCount) &&
                this.pages.length < MaxPagesThreshold;
                i++
            ) {
                if (this.pages.indexOf(i) < 0) {
                    this.pages.push(i);
                }
            }
        }
        this.pages.sort((first, second) => {
            return first - second;
        });
    }

    public length(): number {
        return this.pages.length;
    }

    private init(): void {
        if (this.pageCount <= MaxPagesThreshold) {
            // for page list with page num <= 11, display all
            for (let i = 1; i <= this.pageCount; i++) {
                this.pages.push(i);
            }
            return;
        }
        for (let i = 1; i <= Math.min(this.pageCount, 3); i++) {
            this.pages.push(i);
        }
        let mid: number = Math.floor(this.pageCount / 2);
        for (
            let i = Math.max(1, mid - 2);
            i <= Math.min(mid + 2, this.pageCount) &&
            this.pages.length < MaxPagesThreshold;
            i++
        ) {
            this.pages.push(i);
        }
        for (
            let i = this.pageCount - 2;
            i <= this.pageCount && this.pages.length < MaxPagesThreshold;
            i++
        ) {
            this.pages.push(i);
        }
    }

    [Symbol.iterator]() {
        let current: number = 1;
        let end: number = this.pages.length;
        const pages = this.pages;
        return {
            next() {
                if (current > end) {
                    return {
                        done: true,
                    };
                }
                return {
                    value: pages[current++ - 1],
                    done: false,
                };
            },
        };
    }
}

export default PageList;
