var assert = require('assert'),
    bows = require('./bows.js');

var foo, bar, cat;
var fooPrefix, barPrefix, catPrefix;


foo = bows('Foo')
fooPrefix = foo();

assert.equal(fooPrefix[0], '%cFoo |', 'Foo prefix set');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color set to black');

// Add more
bar = bows('Barrr');
barPrefix = bar();
fooPrefix = foo();

assert.equal(barPrefix[0], '%cBarrr |', 'Bar prefix set');
assert.equal(barPrefix[1], 'color: hsl(180,50%,50%); font-weight: bold', 'Bar color set to the next one');

assert.equal(fooPrefix[0], '%cFoo   |', 'Foo prefix length updated');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color not updated');



//Add even more

var cat = bows('Cat');

catPrefix = cat();
barPrefix = bar();
fooPrefix = foo();

assert.equal(catPrefix[0], '%cCat   |', 'Bar prefix set');
assert.equal(catPrefix[1], 'color: hsl(240,50%,50%); font-weight: bold', 'Cat color set to the next one');

assert.equal(barPrefix[0], '%cBarrr |', 'Bar prefix set');
assert.equal(barPrefix[1], 'color: hsl(120,50%,50%); font-weight: bold', 'Bar color updated');

assert.equal(fooPrefix[0], '%cFoo   |', 'Foo prefix length updated');
assert.equal(fooPrefix[1], 'color: hsl(0,50%,50%); font-weight: bold', 'Foo color not updated');

bows.color = false;
assert.equal(foo('a log string')[0], 'a log string', 'disable logging');

console.log('All tests pass');
