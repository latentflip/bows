var page = require('webpage').create()
var exit = 0

page.onConsoleMessage = function(msg) {
    console.log(msg)
    if (-1 === msg.indexOf('OK:')) {
        console.log('fail', msg)
        exit = 1
    }
    if (-1 !== msg.indexOf('END')) {
       phantom.exit(exit)  
    }
}
page.open('test/test.html', function (status) {
    if (status !== 'success') {
        console.log('FAIL to load test file')
        phantom.exit(1)
    }
    console.log('Page loaded...')
})