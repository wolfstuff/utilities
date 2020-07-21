'use strict';

module.exports = { random: prng(), prng, range, seed };

/**
 * Given an initial seed value {s} and a number of cycles to initially run [n],
 * returns a function that generates noncryptographically-strong pseudorandom
 * floating point numbers in the interval [0, 1). The returned function is
 * intended as a drop-in, seedable replacement for JavaScript's `Math.random()`
 * function with comparable performance and a greater cycle length.
 *
 * @param   {number} [s=seed()] - The seed value to initialize the PRNG with.
 * @param   {number} [n=20]     - The number of cycles to initialize the PRNG with.
 * @returns {Function}          - A function that generates pseudorandom numbers.
 * @public
 * @see https://burtleburtle.net/bob/rand/smallprng.html
 * @example
 *     const random = prng(0); // seed with 0
 *     const value  = random(); // 0.3585193462204188
 */
function prng(s = seed(), n = 20) {
    const ctx = [ 4058668781, s, s, s ];

    for (let i = 0; i < n; i++) {
        next(ctx);
    }

    return () => next(ctx);
}

/**
 * Given a {min} and {max} value, and optionally a [rand] function, returns a random
 * number in the interval [{min}, {max}]. If no other [rand] function is provided, a
 * global instance is used as a default value.
 *
 * @param   {number}   min                          - The minimum value in the range.
 * @param   {number}   max                          - The maximum value in the range.
 * @param   {Function} [rand=module.exports.random] - A function that returns a random value.
 * @returns {number}                                - A random number between {min} and {max}.
 * @public
 * @example
 *     const value1 = range(min, max); // use global instance
 *     const value2 = range(min, max, Math.random); // use Math.random
 */
function range(min, max, rand = module.exports.random) {
    return Math.floor(rand() * (max - min + 1)) + min;
}

/**
 * Converts a call to `process.hrtime()` to nanoseconds. Suitable as a basic
 * seed value for noncryptographic pseudorandom number generators.
 *
 * @param   {Array.<number>} arr - The result of a call to `process.hrtime()`.
 * @returns {number}             - A numeric value.
 * @public
 * @example
 *     const seedValue = seed();
 */
function seed(arr = process.hrtime()) {
    return (arr[0] * 1e9) + arr[1];
}

/**
 * Performs a bitwise left circular shift on {x}.
 *
 * @param   {number} x - A number to perform bitwise operations on.
 * @param   {number} k - The number of places to shift left.
 * @returns {number}   - The number with its bits shifted.
 * @private
 * @example
 *     rot(1, 1); // 2
 *     rot(2, 1); // 4
 *     rot(4, 1); // 8
 */
function rot(x, k) {
    return (x << k) | (x >> (32 - k));
}

/**
 * Performs bitwise shuffling on the values in a given context Array to produce
 * a pseudorandom value.
 *
 * @param   {Array.<number>} ctx - An Array of values representing a PRNG's internal state.
 * @returns {number}             - A pseudorandom number.
 * @private
 * @example
 *     next([
 *         4058668781,
 *         0,
 *         0,
 *         0
 *     ]); // 0.3585193462204188
 */
function next(ctx) {
    const e = (ctx[0] - rot(ctx[1], 27)) >>> 0;

    ctx[0] = (ctx[1] ^ rot(ctx[2], 17)) >>> 0;
    ctx[1] = (ctx[2] + ctx[3]) >>> 0;
    ctx[2] = (ctx[3] + e) >>> 0;
    ctx[3] = (ctx[0] + e) >>> 0;

    return ctx[3] / 4294967296.0;
}
