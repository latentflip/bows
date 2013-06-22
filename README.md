# Colorize your logs (WIP)

- Safely wraps console.log for development mode
- Optional colorizing on a module by module basis
- Colors are automatically assigned and updated, to be as far from each other as possible

## Usage
- Works great in browserify

```javascript
//In mymodule.js
var wrap = bows('MyModule');
...

bows.log(wrap('My log string')) //=> colorized "MyModule | My log string"
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

![Example output](http://monosnap.com/image/B95kOBXY93TYV884xjCmFgJwo.png)

## License

MIT