var runTestPage = require('./helpers/runTestPage');

var scripts = [
    'test/enabled.html',
    'test/disabled.html',
    'test/no-local-storage.html',
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

async function runAllScripts () {
    const results = {passed: [], failed: []}

    for (const script of scripts) {
        console.log(`\n--- Running ${script} ---`)
        const passed = await runTestPage(script)
        if (passed) {
            results.passed.push(script)
        } else {
            results.failed.push(script)
        }
    }

    if (results.failed.length === 0) {
        console.log('All test suites passed');
    } else {
        console.log(`${results.failed.length} of ${results.failed.length + results.passed.length} suites failed.`)
    }

    const exitCode = results.failed.length === 0 ? 0 : 1
    process.exit(exitCode)
}

runAllScripts()
