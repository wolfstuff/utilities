'use strict';

const test = require('ava');

const { black, red, green, yellow, blue, magenta, cyan, white } = require('../src').colors;

// #black
test('#black: should return {str} colored black for the console', (t) => {
    t.true(black('') === '\x1b[30m\x1b[0m', 'Did not return black text!');
    t.true(black('Hello, world!') === '\x1b[30mHello, world!\x1b[0m', 'Did not return black text!');
});

// #red
test('#red: should return {str} colored red for the console', (t) => {
    t.true(red('') === '\x1b[31m\x1b[0m', 'Did not return red text!');
    t.true(red('Hello, world!') === '\x1b[31mHello, world!\x1b[0m', 'Did not return red text!');
});

// #green
test('#green: should return {str} colored green for the console', (t) => {
    t.true(green('') === '\x1b[32m\x1b[0m', 'Did not return green text!');
    t.true(green('Hello, world!') === '\x1b[32mHello, world!\x1b[0m', 'Did not return green text!');
});

// #yellow
test('#yellow: should return {str} colored yellow for the console', (t) => {
    t.true(yellow('') === '\x1b[33m\x1b[0m', 'Did not return yellow text!');
    t.true(yellow('Hello, world!') === '\x1b[33mHello, world!\x1b[0m', 'Did not return yellow text!');
});

// #blue
test('#blue: should return {str} colored blue for the console', (t) => {
    t.true(blue('') === '\x1b[34m\x1b[0m', 'Did not return blue text!');
    t.true(blue('Hello, world!') === '\x1b[34mHello, world!\x1b[0m', 'Did not return blue text!');
});

// #magenta
test('#magenta: should return {str} colored magenta for the console', (t) => {
    t.true(magenta('') === '\x1b[35m\x1b[0m', 'Did not return magenta text!');
    t.true(magenta('Hello, world!') === '\x1b[35mHello, world!\x1b[0m', 'Did not return magenta text!');
});

// #cyan
test('#cyan: should return {str} colored cyan for the console', (t) => {
    t.true(cyan('') === '\x1b[36m\x1b[0m', 'Did not return cyan text!');
    t.true(cyan('Hello, world!') === '\x1b[36mHello, world!\x1b[0m', 'Did not return cyan text!');
});

// #white
test('#white: should return {str} colored white for the console', (t) => {
    t.true(white('') === '\x1b[37m\x1b[0m', 'Did not return white text!');
    t.true(white('Hello, world!') === '\x1b[37mHello, world!\x1b[0m', 'Did not return white text!');
});
