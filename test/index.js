var runTestPage = require('./helpers/runTestPage');


runTestPage('test/disabled.html', function (exitCode) {
    if (exitCode > 0) {
        return phantom.exit(exitCode);
    }

    runTestPage('test/enabled.html', function (exitCode) {
        phantom.exit(exitCode);
    });
});
