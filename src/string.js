'use strict';

const assert = require('assert');

module.exports = { isString, isURL };

/**
 * Determines whether a given {thing} is a string or not. Does not work on String
 * objects constructed with the `new` operator, but that's bad practice anyway.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is a string, false if it is not.
 * @public
 * @example
 *     isString('Hello, world!'); // true
 *     isString(1); // false
 *     isString(); // false
 */
function isString(thing) {
    return typeof thing === 'string';
}

/**
 * The regular expression used to match valid URLs.
 *
 * @type {RegExp}
 * @private
 */
const url_expr = /^(?:https?|ftp|file):\/\/[A-Za-z0-9+&@#/%?=~_|!:,.;-]*[A-Za-z0-9+&@#/%=~_|-]$/imu;

/**
 * Determines whether a given string {str} is a valid URL or not.
 *
 * @param   {string} str     - A string to check.
 * @returns {boolean}        - True if {str} is a valid URL, false if not.
 * @throws  {AssertionError} - If {str} is not a string.
 * @public
 * @example
 *     isUrl('https://google.com'); // true
 *     isUrl('Hello, world!'); // false
 *     isUrl(null); // AssertionError
 */
function isURL(str) {
    assert(isString(str), '{str} must be a string');

    return url_expr.test(str);
}
