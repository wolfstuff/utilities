'use strict';

const test       = require('ava');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();

const { loadDirectory, loadSubdirectories } = proxyquire('../src/load', {
    'target\\file.js': {},
    'target\\subdirectory': {},
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

// #loadSubdirectories
test('#loadSubdirectories: should load all the subdirectories (`sub/index.js`) in a directory', (t) => {
    const result = loadSubdirectories('./target');

    t.true(result.hasOwnProperty('subdirectory'), 'Did not load the subdirectories!');
});
