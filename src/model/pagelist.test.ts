import PageList from "./pagelist";

test("initializes a compact list for twenty pages", () => {
    expect([...new PageList(20)]).toEqual([
        1, 2, 3, 8, 9, 10, 11, 12, 18, 19, 20,
    ]);
});

test("moves the compact window around the selected page", () => {
    const pageList = new PageList(20);

    pageList.onPageClicked(15);
    expect([...pageList]).toEqual([1, 2, 3, 13, 14, 15, 16, 17, 18, 19, 20]);

    pageList.onPageClicked(3);
    expect([...pageList]).toEqual([1, 2, 3, 4, 5, 8, 9, 10, 18, 19, 20]);

    pageList.onPageClicked(19);
    expect([...pageList]).toEqual([1, 2, 3, 8, 9, 10, 11, 17, 18, 19, 20]);
});

test.each([5, 11])("shows every page when the page count is %i", (count) => {
    const pageList = new PageList(count);
    expect([...pageList]).toEqual(
        Array.from({ length: count }, (_, index) => index + 1)
    );

    pageList.onPageClicked(Math.ceil(count / 2));
    expect(pageList.length()).toBe(count);
});

test("ignores selections outside the available page range", () => {
    const pageList = new PageList(5);
    const initialPages = [...pageList];

    pageList.onPageClicked(0);
    expect([...pageList]).toEqual(initialPages);

    pageList.onPageClicked(6);
    expect([...pageList]).toEqual(initialPages);
});
