var assert = require('assert'),
    bows = require('./bows.js');


var fooPrefix = bows('Foo');
assert.equal(fooPrefix[0], '%cFoo |', 'Foo prefix set');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color set to black');

barPrefix = bows('Barrr');
assert.equal(barPrefix[0], '%cBarrr |', 'Bar prefix set');
assert.equal(barPrefix[1], 'color: hsl(180,50%,50%); font-weight: bold', 'Bar color set to the next one');

assert.equal(fooPrefix[0], '%cFoo   |', 'Foo prefix length updated');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color not updated');

catPrefix = bows('Cat');

assert.equal(catPrefix[0], '%cCat   |', 'Bar prefix set');
assert.equal(catPrefix[1], 'color: hsl(240,50%,50%); font-weight: bold', 'Cat color set to the next one');

assert.equal(barPrefix[0], '%cBarrr |', 'Bar prefix set');
assert.equal(barPrefix[1], 'color: hsl(120,50%,50%); font-weight: bold', 'Bar color updated');

assert.equal(fooPrefix[0], '%cFoo   |', 'Foo prefix length updated');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color not updated');


console.log('All tests pass');
