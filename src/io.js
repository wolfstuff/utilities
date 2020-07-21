'use strict';

const fs = require('fs');

module.exports = { readFile, writeFile };

/**
 * Reads the contents of a file at a given {path}.
 *
 * @param   {string} path      - The path to read.
 * @returns {Promise.<string>} - A Promise for the file contents.
 * @public
 * @example
 *     readFile('hello_world.txt')
 *         .then((text) => {
 *             console.log(text); // Hello, world!
 *         });
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
}

/**
 * Writes {data} to a file at a given {path}, creating the file if it does not yet exist.
 *
 * @param   {string}             path      - The path to write to.
 * @param   {string|ArrayBuffer} data      - Data to write.
 * @returns {Promise.<string|ArrayBuffer>} - A Promise for the written file contents.
 * @public
 * @example
 *     writeFile('hello_world.txt', 'Hello, world!')
 *         .then((text) => {
 *             console.log(text); // Hello, world!
 *         });
 */
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, { flag: 'w' }, (error) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
}
