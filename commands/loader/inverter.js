// Command Call
function call(arguments, msg) {
    var ReversedText = global.ReverseText(arguments);

    global.ReplyMessage(ReversedText, msg)

}

exports.call = call;