var runTestPage = require('./helpers/runTestPage');

var scripts = [
    'test/enabled.html',
    'test/disabled.html',
    'test/alternative-key.html',
    'test/regex.html',
    'test/not-regex.html',
    'test/color-map.html',
    'test/padLength.html',
    'test/args.html'
];

function runNextScript () {
    var script = scripts.shift();

    if (!script) {
        console.log('All tests passed');
        phantom.exit(0);
        return;
    }

    console.log('Running', script);
    runTestPage(script, function (exitCode) {
        if (exitCode > 0) {
            return phantom.exit(exitCode);
        }
        runNextScript();
    });
}

runNextScript();
