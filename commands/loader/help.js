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
    var SpecificCommandHelp = arguments.split(' ')[0].trimStart().trimEnd();

    // Check if command exists
    if (!global.ModuleExists(SpecificCommandHelp)) {
        global.ReplyMessage(global.storage.LoadFile("command_not_exists", "help").replace("{0}", SpecificCommandHelp), msg);
        return;
    }

    // Check if command has help file
    if (!global.storage.FileExists(SpecificCommandHelp + ".data", "help/help_file")) {
        global.ReplyMessage(global.storage.LoadFile("command_not_has_help_file", "help").replace("{0}", SpecificCommandHelp), msg);
        return;
    }
    global.ReplyMessage(global.storage.LoadFile(SpecificCommandHelp, "help/help_file"), msg);



}

// Make the command callable
exports.call = call;