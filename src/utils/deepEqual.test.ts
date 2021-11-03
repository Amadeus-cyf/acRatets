import { deepEqual } from './deepEqual';
import { strict as assert } from 'assert';

// to run all unit tests, enter command npm run test <path to deepEqual.test.ts>
test("string compare", () => {
    const a : string = "test_string1"
    const b : string = "test_string1"
    const c : string = "test_string2"
    assert.equal(true, deepEqual(a, b))
    assert.equal(false, deepEqual(a, c))
})

test("array compare", () => {
    const a : Array<number> = [1,2,3,4,5]
    const b : Array<number> = [1,2,3,4,5]
    const c : Array<number> = [1,2,3,4,5,6]
    assert.equal(true, deepEqual(a, b))
    assert.equal(false, deepEqual(a, c))
})

test("object compare", () => {
    const obj1 = {
        "key1" : {
            "key2": 3,
            "key3": [1,2,3],
            "key4": {
                "key5": "hello",
            }
        }
    }
    const obj2 = {
        "key1" : {
            "key2": 3,
            "key3": [1,2,3],
            "key4": {
                "key5": "hello",
            }
        }
    }
    const obj3 = {
        "key1" : {
            "key2": 3,
            "key3": [1,2,3],
            "key4": {
                "key5": "hello_diff",
            }
        }
    }
    assert.equal(true, deepEqual(obj1, obj2))
    assert.equal(false, deepEqual(obj1, obj3))
})

test("null/undefined compare", () => {
    let a = null
    let b = undefined
    assert.equal(false, deepEqual(a, b))
})
