'use strict';

const test               = require('ava');
const { AssertionError } = require('assert');

const { isString, isURL, titleCase } = require('../src').string;

// #isString
test('#isString: should return true for strings', (t) => {
    t.true(isString(''), 'Did not return true!');
    t.true(isString('-1.02'), 'Did not return true!');
    t.true(isString('Hello, world!'), 'Did not return true!');
});

test('#isString: should return false for non strings', (t) => {
    t.false(isString(1), 'Did not return false!');
    t.false(isString(-1.02), 'Did not return false!');
    t.false(isString(null), 'Did not return false!');
    t.false(isString(), 'Did not return false!');
    t.false(isString(true), 'Did not return false!');
    t.false(isString([]), 'Did not return false!');
    t.false(isString({}), 'Did not return false!');
});

// #isURL
test('#isURL: should return true for valid URLs', (t) => {
    t.true(isURL('https://www.example.com/'), 'Did not return true!');
});

test('#isURL: should return false for invalid URLs', (t) => {
    t.false(isURL('Hello, world!'), 'Did not return false!');
});

test('#isURL: should throw AssertionError if {str} is not a string', (t) => {
    const str = null;

    t.throws(() => {
        return isURL(str);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});

// #titleCase
test('#titleCase: should return {str} title cased', (t) => {
    t.true(titleCase('hello, world!') === 'Hello, World!', 'Did not return {str} title cased!');
});

test('#titleCase: should return blank string if {str} is a blank string', (t) => {
    t.true(titleCase('') === '', 'Did not return blank string!');
});

test('#titleCase: should throw AssertionError if {str} is not a string', (t) => {
    const str = null;

    t.throws(() => {
        return titleCase(str);
    }, { instanceOf: AssertionError }, 'Did not throw AssertionError!');
});
