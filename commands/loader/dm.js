/*
   Copyright 2020 Paulo Otávio de Lima/Aragubas

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Command Function Call
function call(arguments, msg) {
    // Delete the message
    msg.delete();

    var SplitedInput = arguments.split(',');

    // User has not mentioned any user, or the command input is invalid.
    if (SplitedInput.length < 2) {
        console.log("DM:")
        console.log("Invalid Command Ouput")
        return;
    }

    // Test : !dm 329385467370012687,hacker

    // Send the Actual Message
    try {
        var UserIDWax = global.UserIDFilter(SplitedInput[0]);
        var User = global.client.users.cache.get(UserIDWax);

        // Invalid UserID or user does not exist.
        if (typeof User == "undefined") {
            global.ReplyMessage(msg, global.storage.LoadFile("invalid_user", "dm"))
            return;
        }

        User.send(SplitedInput[1])

    } catch (e) {
        global.ReplyMessage(msg, global.storage.LoadFile("invalid_input", "dm"))


    }



}

// Make the command callable
exports.call = call;