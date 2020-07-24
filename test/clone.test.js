'use strict';

const test               = require('ava');
const { AssertionError } = require('assert');

const { cloneArray, cloneObject } = require('../src').clone;

// #cloneArray
test('#cloneArray: should clone (deep copy) an Array', (t) => {
    const original = [ 1, true, 'Hello, world!', [ 2, 3, 4 ], { bool: false } ];
    const result   = cloneArray(original);

    t.false(original === result, 'These reference the same area in memory!');
    t.deepEqual(original, result, 'Did not clone an Array!');
});

test('#cloneArray: should throw AssertionError if {arr} is not an Array', (t) => {
    const arr = null;

    t.throws(() => {
        return cloneArray(arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #cloneObject
test('#cloneObject: should clone (deep copy) an object', (t) => {
    const original = {
        first: 1,
        second: 2,
        third: {
            fourth: {
                fifth: 5
            }
        }
    };
    const result   = cloneObject(original);

    t.false(original === result, 'These reference the same area in memory!');
    t.deepEqual(original, result, 'Did not clone an object!');
});

test('#cloneObject: should ignore inherited properties', (t) => {
    class Obj {
        prop1 = true;
    }
    Obj.prototype.prop2 = false;

    const original = new Obj();
    const result   = cloneObject(original);

    t.false(original === result, 'These reference the same area in memory!');
    t.false(Object.hasOwnProperty(original, 'prop1'));
});

test('#cloneObject: should also clone Arrays', (t) => {
    const original = [ 1, true, 'Hello, world!', [ 2, 3, 4 ], { bool: false } ];
    const result   = cloneObject(original);

    t.false(original === result, 'These reference the same area in memory!');
    t.deepEqual(original, result, 'Did not clone an Array!');
});
