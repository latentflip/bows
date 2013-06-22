var b = require('browserify')(),
    fs = require('fs'),
    coffeeify = require('coffeeify');


b.add('./src/bows.coffee');
b.transform(coffeeify);
b.bundle({standalone: 'bows'}, function (err, code) {
    fs.writeFileSync('bows.bundle.js', code);
});
