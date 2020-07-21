'use strict';

module.exports = { isFloat, isInteger, isNaN, isNumber, truncate };

/**
 * Determines whether a given {thing} is a floating point number.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is a float, false if it is not.
 * @public
 * @example
 *     isFloat(1); // false
 *     isFloat(1.4); // true
 *     isFloat('Hello, world!'); // false
 */
function isFloat(thing) {
    return isNumber(thing) && !isInteger(thing);
}

/**
 * Determines whether a given {thing} is an integer.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is an integer, false if it is not.
 * @public
 * @example
 *     isInteger(1); // true
 *     isInteger(1.4); // false
 *     isInteger('Hello, world!'); // false
 */
function isInteger(thing) {
    return Number.isInteger(thing);
}

/**
 * Determines whether a given {thing} is not a number.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is not a number, false if it is.
 * @public
 * @example
 *     isNaN(1); // false
 *     isNaN(1.4); // false
 *     isNaN('Hello, world!'); // true
 */
function isNaN(thing) {
    return Number.isNaN(thing);
}

/**
 * Determines whether a given {thing} is a number.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is a number, false if it is not.
 * @public
 * @example
 *     isNumber(1); // true
 *     isNumber(1.4); // true
 *     isNumber('Hello, world!'); // false
 */
function isNumber(thing) {
    return Number(thing) === thing && !isNaN(thing);
}

/**
 * Truncates a floating point number {num} to a given number of decimal {places}.
 *
 * @param   {number} num    - A number to truncate.
 * @param   {number} places - The number of decimal places to truncate to.
 * @returns {number}        - A truncated number.
 * @public
 * @example
 *     truncate(1.12345, 1); // 1.1
 *     truncate(1.12345, 2); // 1.12
 *     truncate(1.12345, 3); // 1.123
 */
function truncate(num, places) {
    const pow = 10 ** places;

    return Math.trunc(num * pow) / pow;
}
