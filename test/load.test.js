'use strict';

const test       = require('ava');
const { join }   = require('path');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const { loadDirectory, loadSubdirectories } = proxyquire('../src/load', {
    [ join('target', 'file.js') ]: {},
    [ join('target', 'subdirectory') ]: {},
    fs: {
        readdirSync: function readDirStub(path, options) {
            return [
                {
                    name: 'index.js',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'file.js',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'hello_world.txt',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'subdirectory',
                    isDirectory: () => true,
                    isFile: () => false
                },
            ];
        }
    }
});

// #loadDirectory
test('#loadDirectory: should load all the JavaScript files in a directory that are not `index.js`', (t) => {
    const result = loadDirectory('./target');

    t.true(result.hasOwnProperty('file'), 'Did not load the directory!');
});

test('#loadDirectory: should not load any JavaScript files in a directory that are `index.js`', (t) => {
    const result = loadDirectory('./target');

    t.false(result.hasOwnProperty('index'), 'Loaded `index.js`!');
});

// #loadSubdirectories
test('#loadSubdirectories: should load all the subdirectories (`sub/index.js`) in a directory', (t) => {
    const result = loadSubdirectories('./target');

    t.true(result.hasOwnProperty('subdirectory'), 'Did not load the subdirectories!');
});
