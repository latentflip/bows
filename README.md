# Colorize your logs (WIP)

- Safely wraps console.log for development mode
- Optional colorizing on a module by module basis
- Colors are automatically assigned and updated, to be as far from each other as possible

![Example Output](https://raw.github.com/latentflip/bows/master/example/example.png)

## Usage
- Works great in browserify and the browser
- To enable logging, set `localStorage.debug = true`

## Example

```javascript
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
