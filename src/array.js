'use strict';

const assert = require('assert');

const { random, range } = require('./random');

module.exports = { array, copy, isArray, isEmpty, pick, product, shuffle, tail };

/**
 * Creates a new Array of length {n}, optionally filled with [fill]. The fill value is
 * optional, but the fill operation is not; Arrays created with the `new` operator do
 * some interesting things unless they're explicitly filled with undefined values.
 *
 * @param   {number} n       - The length of the Array.
 * @param   {*}      [fill]  - A value to fill the Array with.
 * @returns {Array.<*>}      - A new Array.
 * @throws  {AssertionError} - If {n} is less than 0.
 * @public
 * @example
 *     const arr1 = array(5);
 *     arr1.length; // 5
 *     const arr2 = array(-1); // AssertionError
 */
function array(n, fill) {
    assert(n >= 0, 'Array length must be 0 or greater');

    return new Array(n).fill(fill);
}

/**
 * Shallowly copies a given Array {arr}. If you want deep copying, see `./clone.js`.
 *
 * @param   {Array.<*>} arr  - An Array to copy.
 * @returns {Array.<*>}      - A shallow copy of {arr}.
 * @throws  {AssertionError} - If {arr} is not an Array.
 * @public
 * @example
 *     const arr1 = [ 1, 2, 3, 4, 5 ];
 *     const arr2 = copy(arr1);
 *     arr1 === arr1; // true
 *     arr1 === arr2; // false
 *     const arr3 = copy(null); // AssertionError
 */
function copy(arr) {
    assert(isArray(arr), '{arr} must be an Array');

    return Array.from(arr);
}

/**
 * Checks whether a given {thing} is an Array.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is an Array and false if it is not.
 * @public
 * @example
 *     isArray([]); // true
 *     isArray(1); // false
 */
function isArray(thing) {
    return Array.isArray(thing);
}

/**
 * Checks whether a given Array {arr} is empty.
 *
 * @param   {Array.<*>} arr  - An Array to check.
 * @returns {boolean}        - True if the Array is empty and false if it is not.
 * @throws  {AssertionError} - If {arr} is not an Array.
 * @public
 * @example
 *     isEmpty([]); // true
 *     isEmpty([ 1, 2, 3 ]); // false
 *     isEmpty(null); // AssertionError
 */
function isEmpty(arr) {
    assert(isArray(arr), '{arr} must be an Array');

    return arr.length === 0;
}

/**
 * Gets a random element from a given Array {arr} using an optional [rand] function.
 * If no other [rand] function is provided, a global instance is used as a default value.
 *
 * @param   {Array.<*>} arr           - An Array to get the last index of.
 * @param   {Function}  [rand=random] - A function that returns a random value.
 * @returns {*}                       - A random element in {arr}.
 * @throws  {AssertionError}          - If {arr} is not an Array.
 * @public
 * @example
 *     const arr = [ 1, 2, 3, 4, 5 ];
 *     const choice1 = pick(arr); // 1-5 at random
 *     const choice2 = pick(null); // AssertionError
 */
function pick(arr, rand = random) {
    assert(isArray(arr), '{arr} must be an Array');

    const index = range(0, arr.length - 1, rand);

    return arr[index];
}

/**
 * Recursively generates the Cartesian product of two or more Arrays.
 *
 * @param   {Array.<*>}    first    - An Array.
 * @param   {Array.<*>}    [second] - Another Array.
 * @param   {...Array.<*>} [others] - Potentially more Arrays.
 * @returns {Array.<Array.<*>>}     - An Array representing the product of {first}, [second], and [others].
 * @throws  {AssertionError}        - If {first} and [second] are not Arrays.
 * @public
 * @example
 *     const cards = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
 *     const suits = [ 'diamonds', 'clubs', 'hearts', 'spades' ];
 *     const deck = product(cards, suits);
 *     deck.length; // 52
 */
function product(first, second, ...others) {
    assert(isArray(first) && (!second || isArray(second)), '{first} and [second] must both be an Array');

    if (second) {
        return product([].concat(...first.map((firstEl) => {
            return second.map((secondEl) => {
                return [].concat(firstEl, secondEl);
            });
        })), ...others);
    }

    return first;
}

/**
 * Shuffles the elements of a given Array {arr} using an optional [rand] function. If
 * no other [rand] function is provided, a global instance is used as a default value.
 * Does not mutate the original Array {arr}, but does not deep clone its contents.
 *
 * @param   {Array.<*>} arr           - An Array to shuffle.
 * @param   {Function}  [rand=random] - A function that returns a random value.
 * @returns {Array.<*>}               - A shallow copy of {arr} with its elements shuffled.
 * @throws  {AssertionError}          - If {arr} is not an Array.
 * @public
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @example
 *     const arr = [ 1, 2, 3, 4, 5 ];
 *     const shuffled = shuffle(arr);
 */
function shuffle(arr, rand = random) {
    // No type assertion for {arr} necessary; copy asserts:
    const result = copy(arr);

    let length = result.length, index, temp;

    while (length) {
        index = Math.floor(rand() * length--);
        temp = result[length];

        result[length] = result[index];
        result[index] = temp;
    }

    return result;
}

/**
 * Returns an Array containing the last {n} elements of a given Array {arr}.
 *
 * @param   {Array.<*>} arr - The Array to return from.
 * @param   {number}    n   - The number of elements to discard.
 * @returns {Array.<*>}     - The Array, trimmed.
 * @public
 * @example
 *     const arr = [ 1, 2, 3, 4, 5 ];
 *     tail(arr, 3); // [ 3, 4, 5 ];
 */
function tail(arr, n) {
    return (arr.length >= n)
        ? arr.slice(arr.length - n)
        : arr;
}
