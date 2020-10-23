// Command Function Call
function call(arguments, msg) {
    global.ReplyMessage(global.storage.LoadFile("0", "ping").replace("{0}", Date.now() - msg.createdTimestamp), msg)
}

// Make the command callable
exports.call = call;