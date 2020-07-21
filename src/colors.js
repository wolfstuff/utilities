'use strict';

module.exports = Object.entries({
    black:   '\x1b[30m',
    red:     '\x1b[31m',
    green:   '\x1b[32m',
    yellow:  '\x1b[33m',
    blue:    '\x1b[34m',
    magenta: '\x1b[35m',
    cyan:    '\x1b[36m',
    white:   '\x1b[37m'
}).reduce((result, [ key, value ]) => {
    /**
     * Formats a given string {str} in the specified color for the console.
     *
     * Accessing a key from an object with a computed property name ensures that exported
     * functions are all properly named, hence the bizarre syntax. It avoids `eval` at least!
     *
     * @param   {string} str - A string.
     * @returns {string}     - {str}, but colored.
     * @public
     * @see https://stackoverflow.com/a/41854075
     * @example
     *     const text = 'Hello, world!';
     *     red(text); // '\x1b[31mHello, world!\x1b[0m';
     */
    result[key] = { [key](str) {
        return color(str, value);
    } }[key];

    return result;
}, {});

/**
 * Formats a given String {str} in a given {color} for the console.
 *
 * @param   {string} str   - A string.
 * @param   {string} color - A color.
 * @returns {string}       - {str}, but colored.
 * @private
 * @example
 *     const text = 'Hello, world!';
 *     const red = '\x1b[31m';
 *     color(text, red); // '\x1b[31mHello, world!\x1b[0m';
 */
function color(str, color) {
    return `${ color }${ str }\x1b[0m`;
}
