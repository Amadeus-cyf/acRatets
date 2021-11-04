import PageList from '../model/pagelist'
import { strict as assert } from 'assert';

test('test pagelist init', () => {
    let pagelist : PageList = new PageList(20)
    let n : number = 1
    for (let i of pagelist) {
        assert.equal(i, n)
        if (n < 3 || (n >= 8 && n < 12) || n >= 18) {
            n++
        } else if (n == 3) {
            n = 8
        } else if (n == 12) {
            n = 18
        }
    }
})

test('test pagelist<20> onPageClicked', () => {
    let pagelist : PageList = new PageList(20)
    pagelist.onPageClicked(15)
    let n : number = 1
    for (let i of pagelist) {
        assert.equal(i, n)
        if (n < 3 || (n >= 13 && n <= 17) || n >= 18) {
            n++
        } else if(n == 3) {
            n = 13
        } else if (n == 13) {
            n = 18
        }
    }
    assert.equal(n, 21)

    n = 1
    pagelist.onPageClicked(3)
    for (let i of pagelist) {
        assert.equal(i, n)
        if (n < 5 || (n >= 8 && n < 10) || n >= 18) {
            n++
        } else if (n == 5) {
            n = 8
        } else if (n == 10) {
            n = 18
        }
    }
    assert.equal(n, 21)

    n = 1
    pagelist.onPageClicked(19)
    for (let i of pagelist) {
        assert.equal(i, n)
        if (n < 3 || (n >= 8 && n < 11) || n >= 17) {
            n++
        } else if (n == 3) {
            n = 8
        } else if (n == 11) {
            n = 17
        }
    }
    assert.equal(n, 21)
})

test('test pagelist<11> onPageClicked', () => {
    let n : number = 1
    let pagelist : PageList = new PageList(11)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    n = 1
    pagelist.onPageClicked(5)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 12)
})

test('test pagelist<5> onPageClicked', () => {
    let n : number = 1
    let pagelist : PageList = new PageList(5)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 6)
    n = 1
    pagelist.onPageClicked(2)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 6)
})

test('test pagelist<6> onPageClick out of border', () => {
    let n : number = 1
    let pagelist : PageList = new PageList(5)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 6)
    n = 1
    pagelist.onPageClicked(0)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 6)
    n = 1
    pagelist.onPageClicked(6)
    for (let i of pagelist) {
        assert.equal(i, n++)
    }
    assert.equal(n, 6)
})

test('test pagelist length', () => {
    let pagelist : PageList = new PageList(20)
    assert.equal(pagelist.length(), 11)

    pagelist  = new PageList(5)
    assert.equal(pagelist.length(), 5)
})
