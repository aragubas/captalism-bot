// Command Function Call
function call(arguments, msg) {
    // Startup Message
    global.ReplyMessage(storage.LoadFile("startup", "list"), msg)
    var ModulesText = "";

    // Get all valid loaded modules
    var validModules = global.ListLoadedModules();


    // Say the Message
    global.ReplyMessage(global.storage.LoadFile("0", "list").replace("{0}", validModules.length), msg);

    // Unload all valid modules
    validModules.forEach(function (module) {
        ModulesText += "\n" + module.replace(global.ListLoadedModules_SearchPrefix, "");
    })

    global.ReplyMessage(ModulesText, msg);


}

exports.call = call;