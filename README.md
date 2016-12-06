# Bows
![Colors](https://raw.github.com/latentflip/bows/master/example/cols.png)
Safe, production happy, colourful logging - makes reading your logs _much_ easier.


(Rain)bows makes logging debug messages in your apps much nicer.
- It allows you to create custom loggers for each module in your app, that prefix all log messages with the name of the app, so that you can scan the messages more easily.
- It colors the prefix differently and distinctly for each logger/module so that it's even easier to read.
- It can be safely used in production, where logging will be disabled by default, so that you can leave log messages in your code.
- Loggers safely wrap console.log, to maintain the line number from where they are called in the console output.

![Example Output](https://raw.github.com/latentflip/bows/master/example/realexample.png)

## Installation

If you are using browserify, you'll want something like:

```
npm install bows --save
```

If you use Bower:

```
bower install bows --save
```

Otherwise, download either [bows.js](https://raw.github.com/latentflip/bows/master/dist/bows.js) or [bows.min.js](https://raw.github.com/latentflip/bows/master/dist/bows.min.js).

## Features

* Easily create prefixes for your logs, so that you can distinguish between logs from different parts of your app easily.
* If supported, prefixes will be color coded for even easier identification.
* Can be safely used in production, as logs will be disabled for your users, but can be enabled by you with a local storage flag.
* Greppable logs by setting `localStorage.debug = /Foo/` to only display logs for modules matching the regex to help you focus in development.
    * Invert regex to remove logs matching with: `localStorage.debug ='!/Foo/`
* Customize the localStorage key by setting `localStorage.andlogKey` and you can use `localStorage.<anyKeyYouWant>` to set your log grepping.

# Browser Support

* Works in all reasonable browsers
* Supports colors in chrome, opera, firefox >= 31.0, electron

## Usage
- Works great in browserify and the browser.
- Creating a new logger:
  - Browserify: `var log = require('bows')("My Module Name")`
  - Browser: `var log = bows("My Module Name")`
- Then using it is easy:
  - `log("Module loaded") //-> "My Module Name | Module Loaded"`
  - `log("Did something") //-> "My Module Name | Did something"`
- Typically each seperate module/view/etc in your app would create it's own logger. It will be assigned it's own color to make it easy to spot logs from different modules.
- You can pass additional arguments to `bows` which will be automatically prepended to each message, e.g.:

    ```js
    var log = bows("My App", "[ChuckNorris]");
    log("Kicks ass!");
    //outputs:
    //My App         | [ChuckNorris] Kicks ass!
    ```

- Logging is disabled by default. To enable logging, set `localStorage.debug = true` in your console and refresh the page.
- To **disable** logging again, you must do `delete localStorage.debug` (`localStorage.debug = false` will not work).
- You can leave the code in in production, and log() will just safely no-op unless localStorage.debug is set.
- Where colors are not supported, bows will just log plain text, but still with the module prefix.
    - If you wish to manually disable colors in an environment because detection is incorrect, set `localStorage.debugColors = false`, to reenable `delete localStorage.debugColors`.

## Example

```javascript
  //Should be set in your console to see messages
  localStorage.debug = true
  //Configure the max length of module names (optional)
  bows.config({ padLength: 10 })

  var logger1 = bows('Module 1')
  var logger2 = bows('Module 2')
  var logger3 = bows('Module 3')

  logger1("We started up")
  logger2("We did something too")
  logger3("I'm here")
  logger3("I'm still here")
  logger2("I'm tired")
  logger1("We're done here")
```

Result:

![Example Output](https://raw.github.com/latentflip/bows/master/example/example.png)

## Test

__Status:__ [![Build Status](https://travis-ci.org/latentflip/bows.svg?branch=master)](https://travis-ci.org/latentflip/bows)

This project uses `phantomjs` for tests. To run the tests install the development dependencies and then run:

```bash
npm test
```

### New tests

Add a file in `test`, refer to enabled.html/disabled.html, then add the script to the array in test/index.js.

## License & Credits

MIT

Copyright [@philip\_roberts](http://twitter.com/philip\_roberts) / [latentflip.com](http://latentflip.com).

With contributions from:
* [@lloydwatkin](https://twitter.com/lloydwatkin).
* [@camillereynders](https://twitter.com/camillereynders).

Bows depends on [andlog](http://github.com/henrikjoreteg/andlog), a nice little logging module by [@HenrikJoreteg](https://twitter.com/henrikjoreteg).


## Contributing

Please feel free to raise issues, or make contributions:

```bash
git clone https://github.com/latentflip/bows.git
cd bows
npm install #install dependencies
#edit bows.js
npm test
npm run build.js #build dist/bows.js and dist/bows.min.js, also done by `npm test`
```

