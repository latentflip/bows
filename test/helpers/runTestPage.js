var puppeteer = require('puppeteer');
var Path = require('path')

module.exports = function runTestPage(path, done) {
  doIt(path, done)
}

async function doIt(path, done) {
    var exit = 0;

    var actualLogs = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => {
      actualLogs.push(msg.text())
    })

    await page.goto(`file:${Path.join(__dirname, '..', '..', path)}`)
    var customTests = page.evaluate(function () {
        return !!window.customTests;
    });

    if (customTests) {
        var customResults = page.evaluate(function (l) {
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

        done(exit);
        return;
    }

    await browser.close()

    var exit = 0;


    var expectedLogs = page.evaluate(function () {
        return window.expectedLogs;
    });

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


    if (exit === 0) {
        console.log(path, ': all tests passed');
    } else {
        console.log(path, ': fail');
    }
    console.log('');

    done(exit);
}
