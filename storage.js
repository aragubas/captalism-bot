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

    if (FileData.length >= 2000) {
        throw "FileData cannot be grather than 2000 characters.";
    }

    return FileData;
}

exports.LoadFile = LoadFile;

// WriteFile Function
function WriteFile(fileName, fileData, folder = "sys") {
    var Path = global.StartPath + "/storage/" + folder + "/" + fileName;

    fs.writeFileSync(Path, fileData, 'utf8');
}

exports.WriteFile = WriteFile;
