var browserify = require('browserify'),
    fs = require('fs'),
    uglify = require("uglify-js");

var b = browserify({ standalone: 'bows' });
b.add('./bows.js');
b.bundle(function (error, code) {
    fs.writeFileSync('./dist/bows.js', code);

    //Uglify
    var min_code = uglify.minify('./dist/bows.js').code;
    fs.writeFileSync('./dist/bows.min.js', min_code);
});
