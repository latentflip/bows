# Bows
## Safe, production happy, colourful logging for chrome - makes reading your logs _much_ easier.

![Example Output](https://raw.github.com/latentflip/bows/master/example/cols.png)

(Rain)bows makes logging debug messages in your apps much nicer.
- It allows you to create custom loggers for each module in your app, that prefix all log messages with the name of the app, so that you can scan the messages more easily.
- It colors the prefix differently and distinctly for each logger/module so that it's even easier to read.
- It can be safely used in production, where logging will be disabled by default, so that you can leave log messages in your code. 

![Example Output](https://raw.github.com/latentflip/bows/master/example/example.png)

## Installation.

If you are using browserify, you'll want something like:

```
npm install bows --save
```

If you aren't using browserify, download either (bows.js)[https://raw.github.com/latentflip/bows/master/bows.js] or (bows.min.js)[https://raw.github.com/latentflip/bows/master/bows.min.js].

## Usage
- Works great in browserify and the browser.
- To enable logging, set `localStorage.debug = true` in your console and refresh the page.

## Example

```javascript
  //Should be set in your console to see messages
  localStorage.debug = true
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

## License

MIT
