'use strict';

const test = require('ava');

const { isFloat, isInteger, isNaN, isNumber, truncate } = require('../src').numeric;

// #isFloat
test('#isFloat: should return true for floats', (t) => {
    t.true(isFloat(1.1), 'Did not return true!');
    t.true(isFloat(1.2), 'Did not return true!');
    t.true(isFloat(1.3), 'Did not return true!');
    t.true(isFloat(0.01), 'Did not return true!');
    t.true(isFloat(0.02), 'Did not return true!');
    t.true(isFloat(0.03), 'Did not return true!');
    t.true(isFloat(-1.001), 'Did not return true!');
    t.true(isFloat(-1.002), 'Did not return true!');
    t.true(isFloat(-1.003), 'Did not return true!');
    t.true(isFloat(-0.0001), 'Did not return true!');
    t.true(isFloat(-0.0002), 'Did not return true!');
    t.true(isFloat(-0.0003), 'Did not return true!');
});

test('#isFloat: should return false for non floats', (t) => {
    // 1.0 is a weird case; JavaScript automatically truncates the decimal:
    t.false(isFloat(1.0), 'Did not return false!');
    t.false(isFloat(1), 'Did not return false!');
    t.false(isFloat(null), 'Did not return false!');
    t.false(isFloat(), 'Did not return false!');
    t.false(isFloat(true), 'Did not return false!');
    t.false(isFloat('1.1'), 'Did not return false!');
    t.false(isFloat('Hello, world!'), 'Did not return false!');
    t.false(isFloat([]), 'Did not return false!');
    t.false(isFloat({}), 'Did not return false!');
});

// #isInteger
test('#isInteger: should return true for integers', (t) => {
    t.true(isInteger(-1), 'Did not return true!');
    t.true(isInteger(0), 'Did not return true!');
    t.true(isInteger(1), 'Did not return true!');
    // 1.0 is a weird case; JavaScript automatically truncates the decimal:
    t.true(isInteger(1.0), 'Did not return true!');
});

test('#isInteger: should return false for non integers', (t) => {
    t.false(isInteger(1.1), 'Did not return false!');
    t.false(isInteger(null), 'Did not return false!');
    t.false(isInteger(), 'Did not return false!');
    t.false(isInteger(true), 'Did not return false!');
    t.false(isInteger('1'), 'Did not return false!');
    t.false(isInteger('Hello, world!'), 'Did not return false!');
    t.false(isInteger([]), 'Did not return false!');
    t.false(isInteger({}), 'Did not return false!');
});

// #isNaN
test('#isNaN: should return true for NaN', (t) => {
    t.true(isNaN(NaN), 'Did not return true!');
});

test('#isNaN: should return false for Numbers', (t) => {
    t.false(isNaN(1), 'Did not return false!');
    t.false(isNaN(1.1), 'Did not return false!');
});

// #isNumber
test('#isNumber: should return true for Numbers', (t) => {
    t.true(isNumber(-1), 'Did not return true!');
    t.true(isNumber(0), 'Did not return true!');
    t.true(isNumber(1), 'Did not return true!');
    t.true(isNumber(-1.1), 'Did not return true!');
    t.true(isNumber(0.1), 'Did not return true!');
    t.true(isNumber(1.1), 'Did not return true!');
});

test('#isNumber: should return false for non Numbers', (t) => {
    t.false(isNumber(null), 'Did not return false!');
    t.false(isNumber(), 'Did not return false!');
    t.false(isNumber(true), 'Did not return false!');
    t.false(isNumber('1'), 'Did not return false!');
    t.false(isNumber('Hello, world!'), 'Did not return false!');
    t.false(isNumber([]), 'Did not return false!');
    t.false(isNumber({}), 'Did not return false!');
});

// #truncate
test('#truncate: should truncate {num} to a given number of decimal {places}', (t) => {
    const num = 1.123456789;

    t.true(1 === truncate(num, 0), 'Did not truncate decimal places!');
    t.true(1.1 === truncate(num, 1), 'Did not truncate decimal places!');
    t.true(1.12 === truncate(num, 2), 'Did not truncate decimal places!');
    t.true(1.123 === truncate(num, 3), 'Did not truncate decimal places!');
    t.true(1.1234 === truncate(num, 4), 'Did not truncate decimal places!');
    t.true(1.12345 === truncate(num, 5), 'Did not truncate decimal places!');
    t.true(1.123456 === truncate(num, 6), 'Did not truncate decimal places!');
    t.true(1.1234567 === truncate(num, 7), 'Did not truncate decimal places!');
    t.true(1.12345678 === truncate(num, 8), 'Did not truncate decimal places!');
    t.true(1.123456789 === truncate(num, 9), 'Did not truncate decimal places!');
});
