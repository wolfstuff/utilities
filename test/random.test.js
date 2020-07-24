'use strict';

const test = require('ava');

const { random, prng, range, seed } = require('../src').random;

// #random
test('#random: should return a floating point value between 0 and 1', (t) => {
    for (let i = 0; i < 100; i++) {
        const value = random();

        t.true(value > 0 && value < 1, 'Value not between 0 and 1!');
        t.true(Number(value) === value
            && !Number.isNaN(value)
            && !Number.isInteger(value), 'Did not return a floating point number!');
    }
});

// #prng
test('#prng: should return a Function', (t) => {
    t.true(typeof prng() === 'function', 'Did not return a function!');
});

// #range
test('#range: should return an integer between {min} and {max}, inclusive', (t) => {
    const min = 1;
    const max = 6;

    for (let i = 0; i < 100; i++) {
        const value = range(1, 6);

        t.true(value >= min && value <= max, 'Value not between {min} and {max}!');
        t.true(Number.isInteger(value), 'Did not return an integer!');
    }
});

// #seed
test('#seed: should return an integer', (t) => {
    t.true(Number.isInteger(seed()));
});
