'use strict';

const { truncate } = require('./numeric');

module.exports = { ms, now };

/**
 * Converts a time duration from `process.hrtime` into milliseconds.
 *
 * @param   {Array.<number>} hrtime - A high-resolution timestamp.
 * @returns {number}                - The number of milliseconds that have elapsed since then.
 * @public
 * @example
 *     const start = process.hrtime();
 *     // some timed operation
 *     console.log(ms(start));
 */
function ms(hrtime) {
    const end = process.hrtime(hrtime);

    return truncate(((end[0] * 1e9) + end[1]) / 1e6, 3);
}

/**
 * Obtains a call to `process.hrtime()`.
 *
 * @returns {Array.<number>} - An Array of [ seconds, nanoseconds ].
 * @public
 * @example
 *     const start = now();
 */
function now() {
    return process.hrtime();
}
