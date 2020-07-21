'use strict';

const assert = require('assert');

const { has, isObject, object } = require('./object');
const { isArray } = require('./array');

module.exports = { cloneArray, cloneObject };

/**
 * Recursively performs a deep copy of a given Array {arr} and all its contents.
 *
 * @param   {Array.<*>} arr  - An Array to deep copy.
 * @returns {Array.<*>}      - A deep copy of {arr}.
 * @throws  {AssertionError} - If {arr} is not an Array.
 * @public
 * @example
 *     const arr1 = [ { bool: true }, { bool: false } ];
 *     const arr2 = cloneArray(arr1);
 *     arr2[0].bool = false;
 *     arr1[0].bool; // true
 *     arr2[0].bool; // false
 *     const arr3 = cloneArray(null); // AssertionError
 */
function cloneArray(arr) {
    assert(isArray(arr), '{arr} must be an Array');

    return arr.map((el) => {
        if (isArray(el)) {
            return cloneArray(el);
        } else if (isObject(el)) {
            return cloneObject(el);
        }

        return el;
    });
}

/**
 * Recursively performs a deep copy of a given Object {obj} and all its contents.
 *
 * @param   {object} obj - An Object to deep copy.
 * @returns {object}     - A deep copy of {obj}.
 * @public
 * @example
 *     const obj1 = { inner: { bool: true } };
 *     const obj2 = cloneObject(obj1);
 *     obj2.inner.bool = false;
 *     obj1.inner.bool; // true
 *     obj2.inner.bool; // false
 */
function cloneObject(obj) {
    if (!isObject(obj)) {
        return obj;
    } else if (isArray(obj)) {
        return cloneArray(obj);
    }

    const newObj = object();

    for (const key in obj) {
        if (has(obj, key)) {
            const value = obj[key];

            newObj[key] = cloneObject(value);
        }
    }

    return newObj;
}
