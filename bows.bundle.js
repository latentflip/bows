(function(e){if("function"==typeof bootstrap)bootstrap("bows",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeBows=e}else"undefined"!=typeof window?window.bows=e():global.bows=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var bows, colors, id, logger, nColors, numKeys, prefixes, updateArray, updateArrays,
  __slice = [].slice;

logger = require('andlog');

nColors = function(n) {
  var i, r, x, _i;
  i = 360 / n;
  r = [];
  for (x = _i = 0; 0 <= n ? _i <= n : _i >= n; x = 0 <= n ? ++_i : --_i) {
    r.push(i * x);
  }
  return r;
};

colors = [];

id = 0;

numKeys = 0;

prefixes = {};

updateArrays = function() {
  var array, key, lengths, maxLength, _results;
  colors = nColors(numKeys);
  lengths = Object.keys(prefixes).map(function(p) {
    return p.length;
  });
  maxLength = Math.max.apply({}, lengths);
  _results = [];
  for (key in prefixes) {
    array = prefixes[key];
    _results.push(updateArray(key, maxLength));
  }
  return _results;
};

updateArray = function(fullkey, padlength) {
  var key, msg, _ref;
  _ref = fullkey.split('-'), key = _ref[0], id = _ref[1];
  msg = "%c" + key;
  msg += Array(padlength + 2 - msg.length).join(' ') + '|';
  prefixes[fullkey][0] = msg;
  return prefixes[fullkey][1] = "color: hsl(" + colors[id] + ",50%,50%); font-weight: bold";
};

bows = function(str) {
  var fullkey, log;
  numKeys += 1;
  fullkey = "" + str + "-" + id;
  prefixes[fullkey] = ['', ''];
  updateArrays();
  id++;
  log = logger.log.apply.bind(logger.log, logger);
  log.wrap = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (bows.color) {
      return prefixes[fullkey].concat(args);
    } else {
      return args;
    }
  };
  log.w = log.wrap;
  return log;
};

bows.color = true;

bows.log = logger.log.apply.bind(logger.log, logger);

if (typeof module !== 'undefined') {
  module.exports = bows;
} else {
  window.bows = bows;
}


},{"andlog":2}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
(function(process){// follow @HenrikJoreteg and @andyet if you like this ;)
(function (window) {
    var ls = window.localStorage,
        out = {},
        inNode = typeof process !== 'undefined';

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
})(this);
})(require("__browserify_process"))
},{"__browserify_process":3}]},{},[1])(1)
});
;