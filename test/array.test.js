'use strict';

const test               = require('ava');
const { AssertionError } = require('assert');

const { array, copy, isArray, isEmpty, pick, product, shuffle, tail } = require('../src').array;

// #array
test('#array: should return an Array', (t) => {
	t.true(Array.isArray(array(3)), 'Did not return an Array!');
});

test('#array: should return an Array of length {n}', (t) => {
    const n   = 3;
    const arr = array(n);

    t.true(Array.isArray(arr), 'Did not return an Array!');
    t.true(arr.length === n, 'Did not return an Array of correct length!');
});

test('#array: should return an Array of length {n} filled with {fill}', (t) => {
    const n    = 3;
    const fill = true;
    const arr  = array(n, fill);

    t.true(Array.isArray(arr), 'Did not return an Array!');
    t.true(arr.length === n, 'Did not return an Array of correct length!');
    t.true(arr.every((el) => el), 'Did not return an Array with correct fill!');
});

test('#array: should throw AssertionError if {n} is not an integer', (t) => {
    const n = null;

    t.throws(() => {
        return array(n);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

test('#array: should throw AssertionError if {n} is less than 0', (t) => {
    const n = -1;

    t.throws(() => {
        return array(n);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #copy
test('#copy: should return an Array', (t) => {
    t.true(Array.isArray(copy([ 1, 2, 3 ])), 'Did not return an Array!');
});

test('#copy: should return a shallow copy of an Array', (t) => {
    const original  = [ 1, 2, 3 ];
    const duplicate = copy(original);

    duplicate.push(4);

    t.notDeepEqual(original, duplicate, 'Did not return a copy of an Array!');
});

test('#copy should throw AssertionError if {arr} is not an Array', (t) => {
    const arr = { bad: true };

    t.throws(() => {
        return copy(arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #isArray
test('#isArray: should return true when called on Arrays', (t) => {
    t.true(isArray([]), 'Did not return true!');
    t.true(isArray(array(0)), 'Did not return true!');
    t.true(isArray(new Array(0)), 'Did not return true!');
});

test('#isArray: should return false when called on non-Arrays', (t) => {
    t.false(isArray(), 'Did not return false!');
    t.false(isArray(null), 'Did not return false!');
    t.false(isArray({}), 'Did not return false!');
    t.false(isArray(1), 'Did not return false!');
    t.false(isArray(1.1), 'Did not return false!');
    t.false(isArray('Hello, world!'), 'Did not return false!');
});

// #isEmpty
test('#isEmpty: should return true when called on empty Arrays', (t) => {
    t.true(isEmpty([]), 'Did not return true!');
    t.true(isEmpty(array(0)), 'Did not return true!');
    t.true(isEmpty(new Array(0)), 'Did not return true!');
});

test('#isEmpty: should return false when called on non-empty Arrays', (t) => {
    t.false(isEmpty([ 1 ]), 'Did not return false!');
    t.false(isEmpty(array(1, 1)), 'Did not return false!');
    t.false(isEmpty(new Array(1).fill(1)), 'Did not return false!');
});

test('#isEmpty should throw AssertionError if {arr} is not an Array', (t) => {
    const arr = { bad: true };

    t.throws(() => {
        return isEmpty(arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #pick
test('#pick: should return an element in {arr}', (t) => {
    const random = () => 0; // always return first element

    t.true(pick([ 1, 2, 3 ], random) === 1, 'Did not return Array element!');
});

test('#pick should throw AssertionError if {arr} is not an Array', (t) => {
    const arr = { bad: true };

    t.throws(() => {
        return pick(arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #product
test('#product: should return an Array of Arrays', (t) => {
    const result = product([ 1 ], [ 2 ]);

    t.true(Array.isArray(result), 'Did not return an Array!');
    t.true(result.every((el) => Array.isArray(el)), 'Did not return an Array of Arrays!');
});

test('#product: should return the Cartesian product of two or more Arrays', (t) => {
    const result1 = product([ 1 ], [ 2 ]);
    const result2 = product([ 1 ], [ 2 ], [ 3 ]);

    t.deepEqual(result1, [ [ 1, 2 ] ], 'Did not return a Cartesian product!');
    t.deepEqual(result2, [ [ 1, 2, 3 ] ], 'Did not return a Cartesian product!');
});

test('#product: should return the initial Array if no other Arrays are provided', (t) => {
    const result = product([ 1 ]);

    t.deepEqual(result, [ 1 ], 'Did not return the initial Array!');
});

test('#product should throw AssertionError if {first} or [second] are not Arrays', (t) => {
    const arr = { bad: true };

    t.throws(() => {
        return product(arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');

    t.throws(() => {
        return product([ 1 ], arr);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #shuffle
test('#shuffle: should return an Array', (t) => {
    t.true(Array.isArray(shuffle([])), 'Did not return an Array!');
});

test('#shuffle: should return a shallow copy of an Array', (t) => {
    const original  = [ 1, 2, 3 ];
    const random    = () => 0; // moves first element to the end of the Array
    const duplicate = shuffle(original, random);

    t.notDeepEqual(original, duplicate, 'Did not return a copy of an Array!');
});

test('#shuffle: should shuffle the values in the returned Array', (t) => {
    const original  = [ 1, 2, 3 ];
    const random    = () => 0; // moves first element to the end of the Array
    const duplicate = shuffle(original, random);

    t.true(duplicate.every((el, i) => el !== original[i]), 'Did not shuffle the values in the returned Array!');
});

// #tail
test('#tail: should return an Array', (t) => {
    t.true(Array.isArray(tail([], 1)), 'Did not return an Array!');
});

test('#tail: should return an Array of the last {n} elements in {arr}', (t) => {
    const original  = [ 1, 2, 3, 4 ];
    const duplicate = tail(original, 3);

    t.notDeepEqual(original, duplicate, 'Did not return an Array different from {arr}!');
    t.deepEqual([ 2, 3, 4 ], duplicate, 'Did not return an Array of the last {n} elements in {arr}!');
});
