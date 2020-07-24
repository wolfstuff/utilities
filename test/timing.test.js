'use strict';

const test = require('ava');

const { ms, now } = require('../src').timing;

// #ms
test('#ms: should return a number', (t) => {
    const result = ms(now());

    t.true(Number(result) === result, 'Did not return a number!');
});

// #now
test('#now: should return an Array', (t) => {
	t.true(Array.isArray(now()), 'Did not return an Array!');
});
