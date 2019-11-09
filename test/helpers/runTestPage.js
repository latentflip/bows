var puppeteer = require('puppeteer');
var Path = require('path')

module.exports = async function runTestPage(path) {
    var exit = 0;

    var actualLogs = [];
    var pageErrors = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
      actualLogs.push(msg.text())
    })

    page.on('pageerror', (error) => {
      console.log('Exception: ', error.message);
      pageErrors.push(error.message)
    })

    await page.goto(`file:${Path.join(__dirname, '..', '..', path)}`)
    var customTests = await page.evaluate(function () {
        return !!window.customTests;
    });

    if (customTests) {
        var customResults = await page.evaluate(function (l) {
            return window.customTests(l);
        }, actualLogs);

        customResults.forEach(function (result) {
            if (!result[0]) {
                console.log('✖ ', result[1]);
                exit = 1;
            } else {
                console.log('✔', result[1]);
            }
        });

        return exit === 0 && (pageErrors.length === 0);
    }


    var expectedLogs = await page.evaluate(function () {
        return window.expectedLogs;
    });

    await browser.close()

    var exit = 0;

    expectedLogs.forEach(function (expectedLog, i) {
        if (expectedLog !== actualLogs[i]) {
            console.log('✖ Log mismatch');
            console.log('    Expected | "', expectedLog, '"');
            console.log('    Received | "', actualLogs[i], '"');
            exit = 1;
        } else {
            console.log('✔', expectedLog);
        }
    });

    if (expectedLogs.length === actualLogs.length) {
        console.log('✔ Received ', expectedLogs.length, 'logs');
    } else {
        console.log('✖ Expected', expectedLogs.length, 'logs, received', actualLogs.length);

        console.log("Expected:");
        console.log(expectedLogs.map(function (s) { return '"' + s + '"'; }).join(' ; '));

        console.log("Actual:");
        console.log(actualLogs.map(function (s) { return '"' + s + '"'; }).join(' ; '));

        exit = 1;
    }

    return exit === 0 && (pageErrors.length === 0);
}
