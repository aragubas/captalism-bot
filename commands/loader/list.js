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