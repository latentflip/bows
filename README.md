# Colorize your logs (WIP)

- Safely wraps console.log for development mode
- Optional colorizing on a module by module basis
- Colors are automatically assigned and updated, to be as far from each other as possible

![Example Output](https://raw.github.com/latentflip/bows/master/example/example.png)

<div style="display: inline-block; width: 25px; height: 50px; background: hsl(349.4099321971274,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(211.90216814708958,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(74.39440409705173,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(296.88664004701394,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(159.37887599697615,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(21.871111946938395,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(244.3633478969006,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(106.8555838468628,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(329.34781979682504,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(191.84005574678721,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(54.33229169674938,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(276.8245276467116,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(139.31676359667378,99%,40%)"></div>
<div style="width: 25px; height: 50px; background: hsl(1.8089995466360342,99%,40%)"></div>

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
