class PageList {
    pages : Array<number>;
    pageCount : number;

    constructor(pageCount : number) {
        this.pageCount = pageCount;
        this.pages = new Array<number>();
        this.init();
    }

    public onPageClicked(pageNum : number) : void  {
        this.pages = this.pages.filter(page => {
            return (page <= 3 || page >= this.pageCount - 2 || Math.abs(page - pageNum) <= 2);
        });
        for (let i = Math.max(pageNum - 2, 1) ; i <= Math.min(pageNum + 2, this.pageCount); i++) {
            if (this.pages.indexOf(i) < 0) {
                this.pages.push(i);
            }
        }
        if(pageNum <= 3 || pageNum >= this.pageCount - 2) {
            let mid : number = Math.floor(this.pageCount / 2);
            for (let i = Math.max(1, mid - 2); i <= Math.min(mid + 2, this.pageCount); i++) {
                if(this.pages.indexOf(i) < 0) {
                    this.pages.push(i);
                }
            }
        }
        this.pages.sort((first, second) => {
            return first - second;
        }); 
    }    

    public getPageNum() : number {
        return this.pages.length > 0 ? this.pages[this.pages.length-1] : 0;
    }
    
    private init() : void {
        if(this.pageCount <= 10) {
            for (let i = 1; i <= this.pageCount; i++) {
                this.pages.push(i);
            }
            return
        }
        for (let i = 1; i <= Math.min(this.pageCount, 3); i++) {
            this.pages.push(i);
        }
        let mid : number = Math.floor(this.pageCount / 2);
        for (let i = Math.max(1, mid - 2); i <= Math.min(mid + 2, this.pageCount); i++) {
            this.pages.push(i);
        }
        for (let i = this.pageCount - 2; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
    }

    [Symbol.iterator]() {
        let current : number = 1;
        let end : number = this.pageCount;
        return {
            next() {
                if (current > end) {
                    return {
                        done: true,
                    }
                }
                return {
                    value: current++, 
                    done: false,
                }
            }
        }
    }
}

export default PageList;
