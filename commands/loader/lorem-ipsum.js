// Command Call
function call(arguments, msg) {
    global.ReplyMessage(storage.LoadFile("lorem", "lorem"), msg)
}

// Make the command callable
exports.call = call;
