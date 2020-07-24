'use strict';

const test = require('ava');

const { queue } = require('../src').queue;

// #queue
test('#queue: should return an object with #contents, #empty, #push, and #size methods', (t) => {
    const result = queue(1);

    [ 'contents', 'empty', 'push', 'size' ].forEach((method) => {
        t.true(result.hasOwnProperty(method) && typeof result[method] === 'function', `Does not have ${ method } method!`);
    });
});

// #queue.contents
test('#queue.contents: should return an Array', (t) => {
    const result = queue(1);

    t.true(Array.isArray(result.contents()), 'Did not return an Array!');
});

test('#queue.contents: should return a copy of the underlying Array', (t) => {
    const arr    = [1, 2, 3 ];
    const result = queue(3, arr);

    t.deepEqual(arr, result.contents(), 'Did not return a copy of the underlying Array!');
});

// #queue.empty
test('#queue.empty: should empty the underlying Array', (t) => {
    const result = queue(3, [ 1, 2, 3 ]);
    result.empty();

    t.true(result.contents().length === 0, 'Did not empty the underlying Array!');
});

// #queue.push
test('#queue.push: should add an element to the underlying Array', (t) => {
    const result = queue(3, [ 1, 2 ]);
    result.push(3);

    t.deepEqual([ 1, 2, 3 ], result.contents(), 'Did not add an element to the underlying Array!');
});

test('#queue.push: should constrain the size of the underlying Array', (t) => {
    const result = queue(3, [ 1, 2, 3 ]);
    result.push(4);

    t.deepEqual([ 2, 3, 4 ], result.contents(), 'Did not constrain the size of the underlying Array!');
});

// #queue.size
test('#queue.size: should return the maximum size of the underlying Array', (t) => {
    const size   = 3;
    const result = queue(size);

    t.true(result.size() === size, 'Did not return the maximum size of the underlying Array!');
});
