import PageList from '../model/pagelist'
import { strict as assert } from 'assert';

test('pagelist test', () => {
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
