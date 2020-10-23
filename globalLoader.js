console.log("Loading Global Bindings...")

/////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const storage = require("./storage");
var path = require('path');
var StartPath = path.dirname(require.main.filename);

global.Discord = Discord;
global.client = client;
global.storage = storage;
global.StartPath = StartPath;
global.path = path;
global.fs = fs;

////////////////////////////////////////
var StorageFile = ".data";
var StoragePath = "./storage/"

global.StorageFile = StorageFile;
global.StoragePath = StoragePath;

// Load Strings
global.InvalidCommandString = storage.LoadFile("invalid_command", "strings")
global.Prefix = storage.LoadFile("prefix");


/////////////////////////////////////////
var commandModule = "./commands/loader/";

global.commandModule = commandModule;


global.ReplyMessage = function ReplyMessage(message, msg) {
    msg.channel.send(message);
}

/////////////////////////////////////////
function random_between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

global.random_between = random_between;
////////////////////////////////////////
function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file);
    });
}

global.GetDirectory = getDirectories;
///////////////////////////////////////
function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

global.deleteFolderRecursive = deleteFolderRecursive;
///////////////////////////////////////
function ReverseText(Input) {
    return Input.split("").reverse().join("");
}

global.ReverseText = ReverseText;
//////////////////////////////////////
function IsNumber(str) {
    return !isNaN(str) && !isNaN(parseInt(str))
}

global.IsNumber = IsNumber;
//////////////////////////////////////
global.ListLoadedModules_SearchPrefix = StartPath + commandModule.replace("./", "/");

function ListLoadedModules() {
    // Get all valid loaded modules
    var validModules = [];
    var modules = Object.keys(require('module')._cache);
    var searchPrefix = ListLoadedModules_SearchPrefix;
    modules.forEach(function (module) {
        if (module.startsWith(searchPrefix)) {
            validModules.push(module.replace(StartPath + "/commands/loader/", "").replace(".js", ""));
        }
    })

    return validModules;
}

global.ListLoadedModules = ListLoadedModules;
//////////////////////////////////////
function GetModuleAccessLevel(ModuleName, msg) {
    // Parse the Command Name
    ModuleName = ModuleName.replace(commandModule, "").replace(".js", "");

    // Load Access level list
    var AccessLevelSpecialCommandsList = storage.LoadFile("special_commands_list", "sys/access_level").split('|');

    // Command is a SpecialLevel Command
    if (AccessLevelSpecialCommandsList.indexOf(ModuleName) != -1) {
        // Check if user is Administrator
        if (UserIsAdministrator(msg)) {
            return true;
        }

        // If user is not on SpecialLevel, say message
        global.ReplyMessage(storage.LoadFile("insuficient_access_level", "sys/access_level"), msg)
        return false;

    }

    // if command is not a special one
    return true;



}

global.GetModuleAccessLevel = GetModuleAccessLevel;
////////////////////////////////////////////////////
function UserIsAdministrator(msg) {
    // Check current user level
    var SpecialUsers = storage.LoadFile("administrator_users").split('|');

    if (SpecialUsers.indexOf(msg.author.id) != -1) {
        // Check if UserID is bot owner
        if (msg.author.id == storage.LoadFile("owner")) { return true; }
        return false;
    }


    return true;
}

global.UserIsAdministrator = UserIsAdministrator;
//////////////////////////////////////////////////
function UserIsAdministratorByUserID(user_id) {
    // Check current user level
    var SpecialUsers = storage.LoadFile("administrator_users").split('|');

    if (SpecialUsers.indexOf(user_id) != -1) {
        // Check if UserID is bot owner
        if (user_id == storage.LoadFile("owner")) { return true; }
        return false;
    }

    return true;
}

global.UserIsAdministratorByUserID = UserIsAdministratorByUserID;
//////////////////////////////////////////////////

console.log("Done");