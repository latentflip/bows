var b = require('browserify')(),
    fs = require('fs'),
    coffeeify = require('coffeeify');


b.add('./bows.js');
b.bundle({standalone: 'bows'}, function (err, code) {
    fs.writeFileSync('bows.bundle.js', code);
});
