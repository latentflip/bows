!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.bows=e():"undefined"!=typeof global?global.bows=e():"undefined"!=typeof self&&(self.bows=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"andlog":2}],2:[function(require,module,exports){
// follow @HenrikJoreteg and @andyet if you like this ;)
(function () {
    var inNode = typeof window === 'undefined',
        ls = !inNode && window.localStorage,
        out = {};

    if (inNode) {
        module.exports = console;
        return;
    }

    if (ls && ls.debug && window.console) {
        out = window.console;
    } else {
        var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),
            l = methods.length,
            fn = function () {};

        while (l--) {
            out[methods[l]] = fn;
        }
    }
    if (typeof exports !== 'undefined') {
        module.exports = out;
    } else {
        window.console = out;
    }
})();

},{}]},{},[1])
(1)
});
;