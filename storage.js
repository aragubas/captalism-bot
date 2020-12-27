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


// Export Read-Write wax
var fs = require("fs");


// LoadFile Function
function LoadFile(fileName, folder = "sys") {
    FullPath = global.StoragePath + folder + "/" + fileName + global.StorageFile;

    FileData = fs.readFileSync(FullPath, "utf8", function (err, data) {
        if (err) {
            console.log("Storage.LoadFile : I/O Error\n" + err);
        }
    }).trimEnd();

    // Limit FileData Size
    if (FileData.length >= 2000) {
        throw "FileData cannot be grather than 2000 characters.";
    }

    return FileData.replace("$owner", global.Owner).replace("$prefix", global.Prefix);
}

exports.LoadFile = LoadFile;
/////////////////////////////

// WriteFile Function
function WriteFile(fileName, fileData, folder = "sys") {
    var Path = global.StartPath + "/storage/" + folder + "/" + fileName;

    fs.writeFileSync(Path, fileData, 'utf8');
}

exports.WriteFile = WriteFile;
///////////////////////////////
function FileExists(fileName, folder = "sys") {
    var Path = global.StartPath + "/storage/" + folder + "/" + fileName;

    return fs.existsSync(Path);
}

exports.FileExists = FileExists;
/////////////////////////////////
function DeleteFile(fileName, folder = "sys") {
    var Path = global.StartPath + "/storage/" + folder + "/" + fileName;

    return fs.unlinkSync(Path);
}

exports.DeleteFile = DeleteFile;
/////////////////////////////////
