var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var mocha = new Mocha;

// add tests
fs.readdirSync('test').filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
        console.log(file.toString());
        // Use the method "addFile" to add the file to mocha
        mocha.addFile(
            path.join('test', file)
        );
    });

mocha.run(function(failures){
    process.on('exit', function () {
        process.exit(failures);
    });
});
