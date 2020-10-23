console.log("Initialy Loading all Commands...");
LoadModules();
console.log("Operation Completed!");

function LoadModules() {
    var glob = require('glob')
        , path = require('path');

    glob.sync(global.commandModule + '**/*.js').forEach(function (file) {
        var moduleName = path.resolve(file)
        require(moduleName);
    });

}

exports.LoadModules = LoadModules;
