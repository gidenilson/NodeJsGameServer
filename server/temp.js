var fs = require('fs');
var objeto = function(){};
var i;
var f;


fs.readdir('prototype', function(err, files) {
    for (i = 0; i < files.length; i += 1) {
        f = files[i].substr(0, files[i].indexOf('.js'));
        objeto.prototype[f] = require('./prototype/'+f);
        console.log(f);

    }
});