'use strict';

const { readdirSync }             = require('fs');
const { basename, extname, join } = require('path');

module.exports = { loadDirectory, loadSubdirectories };

/**
 * A utility function for automatically loading every JavaScript file in a given
 * directory {dir} except for `index.js`. Loaded files are attached to an object
 * with keys matching their filenames and values that are the result of using
 * Node.js's regular `require` function to include them.
 *
 * @param   {string} dir - The directory to load.
 * @returns {object}     - An object of loaded files.
 * @public
 * @example
 *     const files = loadDirectory('./');
 */
function loadDirectory(dir) {
    return load(dir, isValidFileTarget);
}

/**
 * A directory entry from fs.readdirSync.
 *
 * @typedef {object} Dirent
 * @private
 */

/**
 * Determines whether a given {file} is a valid target for loading.
 *
 * @param   {Dirent} file - A directory entry to check.
 * @returns {boolean}     - True if the file is valid, false if it is not.
 * @private
 * @example
 *     isValidFileTarget(goodFile); // true
 *     isValidFileTarget(indexJs); // false
 *     isValidFileTarget(txtFile); // false
 *     isValidFileTarget(directory); // false
 */
function isValidFileTarget(file) {
    return file.isFile()
        && file.name !== 'index.js'
        && extname(file.name) === '.js';
}

/**
 * A utility function for automatically loading the root JavaScript file in every
 * subdirectory of a given directory {dir}. Loaded files are attached to an object
 * with keys matching their parent directory filename and values that are the result
 * of using Node.js's regular `require` function to include them.
 *
 * If each subdirectory doesn't include an `index.js` file, this function will throw
 * an error, naturally.
 *
 * @param   {string} dir - The directory to load.
 * @returns {object}     - An object of loaded files.
 * @public
 * @example
 *     const files = loadSubdirectories('./');
 */
function loadSubdirectories(dir) {
    return load(dir, (each) => {
        return each.isDirectory();
    });
}

/**
 * Loads a given directory {dir} of JavaScript files using Node.js's `require` function.
 * A {filter} function determines which files are loaded.
 *
 * @param   {string}   dir    - The directory to load.
 * @param   {Function} filter - A function that determines which files to load.
 * @returns {object}          - An object of loaded files.
 * @private
 * @example
 *     const files = load('./', myFilterFn);
 */
function load(dir, filter) {
    return readdirSync(dir, { withFileTypes: true })
        .filter(filter)
        .reduce(requireReducer(dir), {});
}

/**
 * Returns a reducer function for Array.prototype.reduce that will use Node.js's `require`
 * function to load every file in the parent Array relative to a given directory {dir}.
 *
 * @param   {string} dir - The directory being loaded.
 * @returns {Function}   - A reducer function to load files in {dir}.
 * @private
 * @example
 *     const forUtils = requireReducer('./utils');
 */
function requireReducer(dir) {
    return function(results, each) {
        results[basename(each.name, '.js')] = require(join(dir, each.name));

        return results;
    };
}
