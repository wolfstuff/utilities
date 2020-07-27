'use strict';

const test       = require('ava');
const { join }   = require('path');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const { loadDirectory, loadSubdirectories } = proxyquire('../src/load', {
    [ join('target', 'file1.js') ]: {},
    [ join('target', 'file2.js') ]: {},
    [ join('target', 'subdirectory1') ]: {},
    [ join('target', 'subdirectory2') ]: {},
    fs: {
        readdirSync: function readDirStub(path, options) {
            return [
                {
                    name: 'index.js',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'file1.js',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'file2.js',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'hello_world.txt',
                    isDirectory: () => false,
                    isFile: () => true
                },
                {
                    name: 'subdirectory1',
                    isDirectory: () => true,
                    isFile: () => false
                },
                {
                    name: 'subdirectory2',
                    isDirectory: () => true,
                    isFile: () => false
                }
            ];
        }
    }
});

// #loadDirectory
test('#loadDirectory: should load all JavaScript files in target directory except `index.js`', (t) => {
    const result = loadDirectory('./target');

    t.true(result.hasOwnProperty('file1'), 'Did not load `file1.js`!');
    t.true(result.hasOwnProperty('file2'), 'Did not load `file1.js`!');
    t.false(result.hasOwnProperty('index'), 'Loaded `index.js`!');
    t.false(result.hasOwnProperty('hello_world'), 'Loaded `hello_world.txt`!');
    t.false(result.hasOwnProperty('subdirectory1'), 'Loaded `subdirectory1`!');
    t.false(result.hasOwnProperty('subdirectory2'), 'Loaded `subdirectory2`!');
});

// #loadSubdirectories
test('#loadSubdirectories: should load all subdirectorie index files (`sub/index.js`) in target directory', (t) => {
    const result = loadSubdirectories('./target');

    t.true(result.hasOwnProperty('subdirectory1'), 'Did not load `subdirectory1`!');
    t.true(result.hasOwnProperty('subdirectory2'), 'Did not load `subdirectory2`!');
    t.false(result.hasOwnProperty('file1'), 'Loaded `file1.js`!');
    t.false(result.hasOwnProperty('file2'), 'Loaded `file1.js`!');
    t.false(result.hasOwnProperty('index'), 'Loaded `index.js`!');
    t.false(result.hasOwnProperty('hello_world'), 'Loaded `hello_world.txt`!');
});
