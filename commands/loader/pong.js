// Command Function Call
function call(arguments, msg) {
    global.ReplyMessage(storage.LoadFile("1", "ping"), msg)
}

exports.call = call;