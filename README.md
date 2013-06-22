# Colorize your logs (WIP)

- Safely wraps console.log for development mode
- Optional colorizing on a module by module basis
- Colors are automatically assigned and updated, to be as far from each other as possible

![Example Output](http://monosnap.com/image/DjUMOcyjg8TP74kk608Dddhzg.png)

## Usage
- Works great in browserify

### Browserify
```javascript
//In mymodule.js
var log = require('bows')('MyModule');
...

log(log.wrap('My log string')) //=> colorized "MyModule | My log string"


/In another module.js
var log = require('bows')('Another Module');

log(log.wrap('My log')) //=> colorized "Another Module | My log"
```

## Example

```javascript
var firstModule = (function() {
  var logwrap = bows('firstModule');

  return function() {
    var a = 1 + 1;
    bows.log(logwrap('The result is', a))
    return a
  }
})();

var anotherModule = (function() {
  var logwrap = bows('this is another module');

  return function() {
    var b = 1 + 1;
    bows.log(logwrap('The result is', b));
    return b;
  }
})();

var moreModule = (function() {
  var logwrap = bows('this is another module');

  return function(val) {
    bows.log(logwrap('I got a ', val));
  }
})();

firstModule();
anotherModule();
moreModule(5);
```

Result:

![Example output](http://monosnap.com/image/DjUMOcyjg8TP74kk608Dddhzg.png)

## License

MIT
