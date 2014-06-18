(function() {
  function checkColorSupport() {
    var chrome = !!window.chrome,
        firefox = /firefox/i.test(navigator.userAgent),
        firefoxVersion;

    if (firefox) {
        var match = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/);
        if (match && match[1] && Number(match[1])) {
            firefoxVersion = Number(match[1]);
        }
    }
    return chrome || firefoxVersion >= 31.0;
  }

  var logLevels = ['log', 'debug', 'warn', 'error', 'info'];

  bows = function(str) {

    var inNode = typeof window === 'undefined',
        ls = !inNode && window.localStorage,
        debugKey = ls.debugKey || 'debug',
        debug = ls[debugKey],
        logger = require('andlog'),
        hue = 0,
        padLength = 15,
        noop = function() {},
        colorsSupported = ls.debugColors || checkColorSupport(),
        bows = null,
        debugRegex = null;
      
    var yieldColor = function() {
      var goldenRatio = 0.618033988749895;
      hue += goldenRatio;
      hue = hue % 1;
      return hue * 360;
    };
      
    debugRegex = debug && debug[0]==='/' && new RegExp(debug.substring(1,debug.length-1));

    var msg, colorString, logfn;
    msg = (str.slice(0, padLength));
    msg += Array(padLength + 3 - msg.length).join(' ') + '|';

    if (!debug) return noop;
    if (debugRegex && !str.match(debugRegex)) return noop;

    if (colorsSupported) {
      var color = yieldColor();
      msg = "%c" + msg;
      colorString = "color: hsl(" + (color) + ",99%,40%); font-weight: bold";

      logfn = logger.log.bind(logger, msg, colorString);
      logLevels.forEach(function (f) {
        logfn[f] = logger[f].bind(logger, msg, colorString);
      });
    } else {
      logfn = logger.log.bind(logger, msg);
      logLevels.forEach(function (f) {
        logfn[f] = logger[f].bind(logger, msg);
      });
    }

    return logfn;
  };

  bows.config = function(config) {
    if (config.padLength) {
      this.padLength = config.padLength;
    }
    if (config.debugKey) {
      this.debugKey = config.debugKey;
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = bows;
  } else {
    window.bows = bows;
  }
}).call();
