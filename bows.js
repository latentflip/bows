(function() {
  function checkColorSupport() {
    var chrome = !!window.chrome,
        firefox = /firefox/i.test(navigator.userAgent),
        firebug = firefox && !!window.console.exception;

    return chrome || firebug;
  }

  var inNode = typeof window === 'undefined',
      ls = !inNode && window.localStorage,
      debug = ls.debug,
      logger = require('andlog'),
      hue = 0,
      padLength = 15,
      noop = function() {},
      colorsSupported = ls.debugColors || checkColorSupport(),
      yieldColor,
      bows,
      debugRegex;

  yieldColor = function() {
    var goldenRatio = 0.618033988749895;
    hue += goldenRatio;
    hue = hue % 1;
    return hue * 360;
  };

  debugRegex = debug && debug[0]==='/' && new RegExp(debug.substring(1,debug.length-1));

  bows = function(str) {
    var msg, colorString, logfn;
    msg = (str.slice(0, padLength));
    msg += Array(padLength + 3 - msg.length).join(' ') + '|';

    if (debugRegex && !str.match(debugRegex)) return noop;

    if (colorsSupported) {
      var color = yieldColor();
      msg = "%c" + msg;
      colorString = "color: hsl(" + (color) + ",99%,40%); font-weight: bold";

      logfn = logger.log.bind(logger, msg, colorString);
      ['log', 'debug', 'warn', 'error', 'info'].forEach(function (f) {
        logfn[f] = logger[f].bind(logger, msg, colorString);
      });
    } else {
      logfn = logger.log.bind(logger, msg);
      ['log', 'debug', 'warn', 'error', 'info'].forEach(function (f) {
        logfn[f] = logger[f].bind(logger, msg);
      });
    }

    return logfn;
  };

  bows.config = function(config) {
    if (config.padLength) {
      this.padLength = config.padLength;
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = bows;
  } else {
    window.bows = bows;
  }
}).call();
