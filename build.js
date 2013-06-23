var b = require('browserify')(),
    fs = require('fs'),
    uglify = require("uglify-js");

b.add('./bows.js');
b.bundle({standalone: 'bows'}, function (err, code) {
    fs.writeFileSync('./dist/bows.js', code);

    //Uglify
    var min_code = uglify.minify('./dist/bows.js').code;
    fs.writeFileSync('./dist/bows.min.js', min_code);
});
