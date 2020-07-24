'use strict';

const test = require('ava');

const { addProperty, assign, has, hasAll, immutable, isDefined, isNull, isObject, object } = require('../src').object;

// #addProperty
test('#addProperty: should add a property to an object', (t) => {
    const obj = {};

    addProperty(obj, 'hello', 'world');

    t.true(Object.prototype.hasOwnProperty.call(obj, 'hello'), 'Did not add a property to an object!');
});

// #assign
test('#assign: should merge two or more objects', (t) => {
    const obj1 = {
        first: 1
    };

    const obj2 = {
        second: 2,
        third: 3
    };

    const result = assign(Object.create(null), obj1, obj2);
    const expected = Object.assign(Object.create(null), {
        first: 1,
        second: 2,
        third: 3
    });

    t.deepEqual(result, expected, 'Did not merge two or more objects!');
});

// #has
test('#has: should return true if an object has a property', (t) => {
    const obj = {
        first: 1,
        second: 2,
        third: 3
    };

    t.true(has(obj, 'first'), 'Did not return true!');
    t.true(has(obj, 'second'), 'Did not return true!');
    t.true(has(obj, 'third'), 'Did not return true!');
});

test('#has: should return false if an object does not have a property', (t) => {
    const obj = {
        first: 1,
        second: 2,
        third: 3
    };

    t.false(has(obj, 'fourth'), 'Did not return false!');
});

// #hasAll
test('#hasAll: should return true if an object has all listed propeties', (t) => {
    const obj = {
        first: 1,
        second: 2,
        third: 3
    };

    t.true(hasAll(obj, 'first', 'second', 'third'), 'Did not return true!');
});

test('#hasAll: should return false if an object is missing any listed propeties', (t) => {
    const obj = {
        first: 1,
        second: 2,
        third: 3
    };

    t.false(hasAll(obj, 'first', 'second', 'third', 'fourth'), 'Did not return false!');
});

// #immutable
test('#immutable: should return an immutable object', (t) => {
    const obj = immutable({ del: false });

    t.throws(() => {
        obj.prop = true;
        return obj;
    }, { instanceOf: TypeError }, 'Did not throw TypeError!');

    t.throws(() => {
        delete obj.del;
        return obj;
    }, { instanceOf: TypeError }, 'Did not throw TypeError!');
});

// #isDefined
test('#isDefined: should return false for undefined values', (t) => {
    t.false(isDefined(), 'Did not return false!');
    t.false(isDefined(undefined), 'Did not return false!');
});

test('#isDefined: should return true for defined values', (t) => {
    t.true(isDefined(null), 'Did not return true!');
    t.true(isDefined(1), 'Did not return true!');
    t.true(isDefined(-1.02), 'Did not return true!');
    t.true(isDefined('Hello, world!'), 'Did not return true!');
    t.true(isDefined(true), 'Did not return true!');
    t.true(isDefined([]), 'Did not return true!');
    t.true(isDefined({}), 'Did not return true!');
});

// #isNull
test('#isNull: should return true for null values', (t) => {
    t.true(isNull(null), 'Did not return true!');
});

test('#isNull: should return false for non null values', (t) => {
    t.false(isNull(1), 'Did not return false!');
    t.false(isNull(-1.02), 'Did not return false!');
    t.false(isNull(), 'Did not return false!');
    t.true(isDefined('Hello, world!'), 'Did not return true!');
    t.false(isNull(true), 'Did not return false!');
    t.false(isNull([]), 'Did not return false!');
    t.false(isNull({}), 'Did not return false!');
});

// #isObject
test('#isObject: should return true for objects', (t) => {
    t.true(isObject(object()), 'Did not return true!');
    t.true(isObject(Object.create(null)), 'Did not return true!');
    t.true(isObject({}), 'Did not return true!');
});

test('#isObject: should return false for non objects', (t) => {
    t.false(isObject(1), 'Did not return false!');
    t.false(isObject(-1.02), 'Did not return false!');
    t.false(isObject(null), 'Did not return false!');
    t.false(isObject(), 'Did not return false!');
    t.false(isObject(true), 'Did not return false!');
    t.false(isObject([]), 'Did not return false!');
    t.false(isObject(object), 'Did not return false!');
    t.false(isObject(function() {}), 'Did not return false!');
});


// #object
test('#object: should return an object', (t) => {
	t.deepEqual(object(), Object.create(null), 'Did not return an object!');
});
