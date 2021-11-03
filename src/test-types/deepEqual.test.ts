import { deepEqual } from '../utils/deepEqual';
import { strict as assert } from 'assert';

// to run all unit tests, enter command npm run test <path to deepEqual.test.ts>
test('test string', () => {
    const a : string = 'test_string1'
    const b : string = 'test_string1'
    const c : string = 'test_string2'
    assert.equal(deepEqual(a, b), true)
    assert.equal(deepEqual(a, c), false,)
})

test('test number', () => {
    const a : number = 1
    const b : number = 1.0
    const c : number = 2
    assert.equal(deepEqual(a, b), true)
    assert.equal(deepEqual(a, c), false)
})

test('test array', () => {
    const a : Array<number> = [1,2,3,4,5]
    const b : Array<number> = [1,2,3,4,5]
    const c : Array<number> = [1,2,3,4,5,6]
    assert.equal(deepEqual(a, b), true)
    assert.equal(deepEqual(a, c), false)
})

test('test object', () => {
    const obj1 = {
        'key1' : {
            'key2': 3,
            'key3': [1,2,3],
            'key4': {
                'key5': 'hello',
            }
        }
    }
    const obj2 = {
        'key1' : {
            'key2': 3,
            'key3': [1,2,3],
            'key4': {
                'key5': 'hello',
            }
        }
    }
    const obj3 = {
        'key1' : {
            'key2': 3,
            'key3': [1,2,3],
            'key4': {
                'key5': 'hello_diff',
            }
        }
    }
    assert.equal(deepEqual(obj1, obj2), true)
    assert.equal(deepEqual(obj1, obj3), false)
})

test('test array object', () => {
    type ObjType = {
        key1 : string,
        key2 : string,
    }
    const a : Array<ObjType> = [{key1: 'val1', key2: 'val2'}, {key1: 'val3', key2: 'val4'}]
    const b : Array<ObjType> = [{key1: 'val1', key2: 'val2'}, {key1: 'val3', key2: 'val4'}]
    const c : Array<ObjType> = [{key1: 'val1', key2: 'val2'}, {key1: 'val3', key2: 'val5'}]
    assert.equal(deepEqual(a, b), true)
    assert.equal(deepEqual(a, c), false)
})

test('null/undefined compare', () => {
    let a = null
    let b = undefined
    assert.equal(deepEqual(a, b), false)
})
