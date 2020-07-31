'use strict';

const { copy, tail } = require('./array');

module.exports = { queue };

/**
 * A revolving queue of fixed size. As new elements are pushed onto the end of it,
 * old elements are automatically removed.
 *
 * @typedef {object} Queue
 * @property {Function} contents - Returns a copy of the queue's underlying Array.
 * @property {Function} empty    - Empties the queue's underlying Array.
 * @property {Function} push     - Pushes an element onto the queue's underlying Array.
 * @property {Function} size     - Returns the maximum size of the queue's underlying Array.
 */

/**
 * Creates a revolving queue of fixed size.
 *
 * @param   {number}    size     - The size to constrain the queue to.
 * @param   {Array.<*>} [arr=[]] - An optional Array to base the queue on.
 * @returns {Queue}              -
 * @public
 * @example
 *     const only3 = queue(3, [ 1, 2, 3 ]);
 *     only3.contents(); // [ 1, 2, 3 ]
 *     only3.push(4);
 *     only3.contents; // [ 2, 3, 4 ]
 */
function queue(size, arr = []) {
    // The underlying Array managed by the queue wrapper object.
    let _ = tail(arr, size);

    /**
     * @type {Queue}
     */
    const wrapper = {
        /**
         * Retrieves a copy of the underlying Array's contents. It is copied to prevent
         * external tampering that might cause issues with the queue.
         *
         * @returns {Array.<*>} - A copy of the underlying queue Array.
         * @public
         * @example
         *     const only3 = queue(3);
         *     only3.contents().length; // 0
         *     only3.push('Hello, world!');
         *     only3.contents().length; // 1
         *     only3.contents()[0]; // 'Hello, world!'
         */
        contents: () => copy(_),

        /**
         * Empties the underlying Array by swapping it for an empty Array.
         *
         * @returns {Queue} - The queue being operated on.
         * @public
         * @example
         *     const only3 = queue(3, [ 1, 2, 3 ]);
         *     only3.empty();
         *     only3.contents(); // []
         */
        empty: () => {
            _ = [];

            return wrapper;
        },

        /**
         * Adds an element {el} to the end of the queue.
         *
         * @param   {*} el  - An element to push.
         * @returns {Queue} - The queue being operated on.
         * @public
         * @example
         *     const only3 = queue(3, [ 1, 2 ]);
         *     only3.push(3);
         *     only3.contents(); // [ 1, 2, 3 ]
         *     only3.push(4);
         *     only3.contents(); // [ 2, 3, 4 ]
         */
        push: (el) => {
            _.push(el);
            _ = tail(_, size);

            return wrapper;
        },

        /**
         * Retrieves the maximum size of the queue.
         *
         * @returns {number} - The maximum size of the queue.
         * @public
         * @example
         *     const only3 = queue(3);
         *     const only9 = queue(9);
         *     only3.size(); // 3
         *     only9.size(); // 9
         */
        size: () => size
    };

    return wrapper;
}
