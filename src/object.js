'use strict';

module.exports = { addProperty, assign, has, hasAll, immutable, isDefined, isNull, isObject, object };

/**
 * Adds a property to an Object {obj}. Use to add a property to an Object that nothing
 * else should be able to interfere with very easily.
 *
 * @param   {object} obj     - The Object to add a property to.
 * @param   {string} prop    - The property key.
 * @param   {*}      value   - The property value.
 * @param   {object} options - Options to pass to Object.defineProperty.
 * @returns {object}         - The {obj} with the added property.
 * @public
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * @example
 *     const obj = {};
 *     addProp(obj, 'bool', true);
 *     obj.bool; // true
 *     obj.bool = false; // TypeError
 */
function addProperty(obj, prop, value, options = {}) {
    Object.defineProperty(obj, prop, assign({ value }, options));

    return obj;
}

/**
 * Assigns one or more Objects {objs} to a base Object {obj}. Mutates {obj} in
 * the process, so use with caution.
 *
 * @param   {object}    obj  - An Object to assign other Objects to.
 * @param   {...object} objs - Objects to assign to {obj}.
 * @returns {object}         - The {obj} with other Objects assigned to it.
 * @public
 * @example
 *     const obj1 = { bool: true };
 *     const obj2 = assign(obj1, { bool: false });
 *     obj1.bool; // false
 *     obj2.bool; // false
 */
function assign(obj, ...objs) {
    return Object.assign(obj, ...objs);
}

/**
 * Checks whether a given Object {obj} contains a given property {prop}.
 *
 * @param   {object} obj  - An Object to check.
 * @param   {string} prop - A property to look for.
 * @returns {boolean}     - True if {obj} contains {prop} and false if it does not.
 * @public
 * @example
 *     const obj = { bool: true };
 *     has(obj, 'bool'); // true
 *     has(obj, 'string'); // false
 */
function has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Checks whether a given Object {obj} contains one or more properties {props}.
 *
 * @param   {object}    obj   - An Object to check.
 * @param   {...string} props - One or more properties to look for.
 * @returns {boolean}         - True if {obj} contains all {props} and false if it does not.
 * @public
 * @example
 *     const obj = { bool: true, string: 'Hello, world!' };
 *     hasAll(obj, 'bool', 'string'); // true
 *     hasAll(obj, 'int', 'string'); // false
 */
function hasAll(obj, ...props) {
    return props.every((prop) => has(obj, prop));
}

/**
 * Makes a given Object {obj} immutable.
 *
 * @param   {object} obj - An Object to freeze.
 * @returns {object}     - A frozen Object.
 * @public
 * @example
 *     const obj = immutable({ bool: true });
 *     obj.bool; // true
 *     obj.bool = false; // TypeError
 */
function immutable(obj) {
    return Object.freeze(obj);
}

/**
 * Checks whether a given {thing} is defined.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is defined and false if it is not.
 * @public
 * @example
 *     isDefined(1); // true
 *     isDefined(); // false
 */
function isDefined(thing) {
    return thing !== undefined;
}

/**
 * Checks whether a given {thing} is null.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is null and false if it is not.
 * @public
 * @example
 *     isNull({}); // false
 *     isNull(1); // false
 *     isNull(null); // true
 */
function isNull(thing) {
    return thing === null;
}

/**
 * Checks whether a given {thing} is an Object.
 *
 * @param   {*} thing - A thing to check.
 * @returns {boolean} - True if {thing} is an Object and false if it is not.
 * @public
 * @example
 *     isObject({}); // true
 *     isObject(1); // false
 *     isObject(null); // false
 */
function isObject(thing) {
    return typeof thing === 'object' && !isNull(thing);
}

/**
 * Creates an Object with the null prototype; literally a bag of key-value pairs without
 * any prototype pollution attached.
 *
 * @returns {object} - An empty Object.
 * @public
 * @example
 *     const obj = object();
 *     obj.bool = true;
 *     obj.bool; // true
 */
function object() {
    return Object.create(null);
}
