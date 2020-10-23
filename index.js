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

// Load all initial global wax
const globalLoader = require("./globalLoader");
// Load the command module
const commands = require("./commands/index");

// Log In the Discord Client
global.client.login(storage.LoadFile("token"));


global.client.on('ready', msg => {
    console.log("Discord : Logged in as " + global.client.user.tag);
    global.client.user.setActivity(global.storage.LoadFile("activity_text", "strings"));
});

global.client.on('message', msg => {
    // Ignore invalid messages
    if (!msg.content.startsWith(global.Prefix)) { return; };
    console.log("\nDiscord : RunLoop");

    // Get Command
    var command = msg.content.split(' ')[0].replace(global.Prefix, "");

    if (command == global.Prefix || command == "") {
        console.log("\nDiscord : InvalidPrefix"); return;
    }

    var AvaliableCommands = global.ListLoadedModules();


    // Command Found
    if (AvaliableCommands.indexOf(command) != -1) {
        // Execute Command
        try {
            var moduleName = global.commandModule + command;
            var commandModule = require(moduleName);
            var messageArgument = msg.content.replace(global.Prefix, "").replace(command, "").trimStart();

            // Check if user has access to the module
            if (!global.GetModuleAccessLevel(moduleName, msg)) { console.log("Discord : User does not has access to command."); return; }

            commandModule.call(messageArgument, msg);

            console.log("Discord : Command execution completed\n");
            return;

        } catch (err) { // Catch Execution Error
            module_error(command, err, msg);
            return;
        }

    }
    // If modules does not exist.
    module_not_found_error(command, msg);

});

function module_not_found_error(command, msg) {
    global.ReplyMessage(storage.LoadFile("invalid_command", "strings").replace("{0}", command), msg);
    console.log(command + " is invalid.");

}

function module_error(command, exc, msg) {
    global.ReplyMessage(storage.LoadFile("command_exception", "strings").replace("{0}", command).replace("{1}", exc), msg);
    console.log("Execution Error!\n" + exc.stack + "\nIn Module {" + command + ".js}");
}


