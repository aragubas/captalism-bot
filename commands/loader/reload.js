var handler = require(StartPath + "/commands/index");

function call(arguments, msg) {
    // Startup Message
    global.ReplyMessage(global.storage.LoadFile("startup", "reload"), msg)
    var searchPrefix = StartPath + global.commandModule.replace("./", "/");

    // Get all valid loaded modules
    var modules = Object.keys(require('module')._cache);
    var validModules = [];
    modules.forEach(function (module) {
        if (module.startsWith(searchPrefix)) {
            validModules.push(module);
        }
    })

    // Say the Message
    msg.channel.send(global.storage.LoadFile("module_reload_0", "reload").replace("{0}", validModules.length));

    // Unload all valid modules
    validModules.forEach(function (module) {
        delete require.cache[module];
    })

    handler.LoadModules();
}


// Make the command callable
exports.call = call;