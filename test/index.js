var runTestPage = require('./helpers/runTestPage');

var scripts = [
    'test/enabled.html',
    'test/disabled.html',
    'test/alternative-key.html',
    'test/regex.html',
    'test/not-regex.html',
    'test/color-map.html',
    'test/separator.html',
    'test/no-separator.html',
    'test/padLength.html',
    'test/no-padding.html',
    'test/args.html'
];

async function runNextScript () {
    var script = scripts.shift();

    if (!script) {
        console.log('All tests passed');
        return;
    }

    console.log('Running', script);
    runTestPage(script, function (exitCode) {
        if (exitCode > 0) {
          throw "FAILED"
        }
        runNextScript();
    });
}

runNextScript();
