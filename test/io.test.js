'use strict';

const test       = require('ava');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const { readFile, writeFile } = proxyquire('../src/io', {
    fs: {
        readFile: function(path, callback) {
            if (path === 'BAD') {
                return callback(new Error('Stub error!'));
            }

            return callback(null, 'Hello, world!');
        },
        writeFile: function(path, data, options, callback) {
            if (path === 'BAD') {
                return callback(new Error('Stub error!'));
            }

            return callback(null, data);
        }
    }
});

// #readFile
test('#readFile: should read a file', async (t) => {
    const result = await readFile('hello_world.txt');

    t.true(result === 'Hello, world!', 'Did not read a file!');
});

test('#readFile: should throw if the file cannot be read', async (t) => {
    await t.throwsAsync(async () => {
        return await readFile('BAD');
    }, null, 'Did not throw an Error!');
});

// #writeFile
test('#writeFile: should read a file and return written data', async (t) => {
    const result = await writeFile('hello_world.txt', 'Hello, world!');

    t.true(result === 'Hello, world!', 'Did not write a file!');
});

test('#writeFile: should throw if the file cannot be written to', async (t) => {
    await t.throwsAsync(async () => {
        return await writeFile('BAD', 'Hello, world!');
    }, null, 'Did not throw an Error!');
});
