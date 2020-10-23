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

// Import Exec
var exec = require('child_process').exec;
var fs = require('fs');

function call(arguments, msg) {
    global.ReplyMessage("This command has been suspended for maintennace reasons.", msg);

    return;
    var args = arguments.split(' ');

    if (args < 2) {
        global.ReplyMessage(global.storage.LoadFile("add_arguments_error", "add"), msg)
        return;
    }

    var CommandName = args[0];
    // Get a list of all loaded modules  
    var searchPrefix = StartPath + global.commandModule.replace("./", "/");
    var modules = Object.keys(require('module')._cache);
    var validModules = [];
    modules.forEach(function (module) {
        if (module.startsWith(searchPrefix)) {
            validModules.push(module);
        }
    })

    // Check if command already exists
    if (validModules.indexOf(CommandName) != 0) {
        global.ReplyMessage(storage.LoadFile("module_already_exist_error", "add"), msg)
        return;
    }

    // URL Download
    var CommandLink = args[1];
    // Check if url is from Pastebin
    if (!CommandLink.startsWith("https://pastebin.com")) {
        global.ReplyMessage(storage.LoadFile("pastebin_link_error", "add"), msg)
        return;

    }

    // Download Path
    var DownloadPath = StartPath + global.commandModule.replace("./", "/") + CommandName + ".js";


    global.ReplyMessage(storage.LoadFile("0", "add").replace("{0}", CommandName).replace("{1}", CommandLink).replace("{2}", DownloadPath), msg)

    // Function for downloading file using wget
    var download_file_wget = function () {
        var wget = 'wget -P ' + DownloadPath + ' ' + CommandLink;

        var child = exec(wget, function (err, stdout, stderr) {
            if (err) throw err;
            else {
                global.ReplyMessage(storage.LoadFile("download_complete", "add"), msg);


                // Fix Problem when downloading from pastebin
                var NomeCeiral = global.GetDirectory(DownloadPath);
                var caminhoCeira = DownloadPath + "/" + NomeCeiral

                // Copia o arquivo para o local correto
                fs.copyFileSync(caminhoCeira, global.commandModule + NomeCeiral);

                // Apaga o directorio Errado
                global.deleteFolderRecursive(DownloadPath);

                // Renomeia o arquivo para o nome correto
                var RenameSource = global.commandModule + NomeCeiral
                fs.renameSync(RenameSource, DownloadPath);

                global.ReplyMessage(storage.LoadFile("processing_complete", "add"), msg)

            }
        });
    };

    download_file_wget();

}

// Make the command callable
exports.call = call;