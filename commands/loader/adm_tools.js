// Command Function Call
function call(arguments, msg) {
    var args = arguments.split(' ');

    if (args.length != 0) {
        switch (args[0]) {
            case "check":
                var UserIDToCheck = args[1];

                if (global.UserIsAdministratorByUserID(UserIDToCheck)) {
                    global.ReplyMessage(global.storage.LoadFile("user_is_adm", "sys/adm_tools/check"), msg)
                    return;

                } else {
                    global.ReplyMessage(global.storage.LoadFile("user_is_not_adm", "sys/adm_tools/check"), msg)
                    return;
                }

            case "remove_adm":
                var UserIDRemove = args[1];
                var CurrentADMList = storage.LoadFile("administrator_users").split('|');

                // Check if UserID Box is an number
                if (isNaN(UserIDRemove)) {
                    global.ReplyMessage(global.storage.LoadFile("invalid_user_id", "sys/adm_tools/add_adm"), msg)
                    return;
                }

                // Check if user is the bot owner
                if (UserIDRemove == storage.LoadFile("owner")) {
                    global.ReplyMessage(global.storage.LoadFile("user_is_bot_owner", "sys/adm_tools/remove_adm"), msg)
                    return;
                }

                // Check if user is an administrator
                if (!global.UserIsAdministratorByUserID(UserIDRemove)) {
                    global.ReplyMessage(global.storage.LoadFile("user_not_administrator", "sys/adm_tools/remove_adm"), msg)
                    return;
                }


                // Changed loaded list
                var Index = CurrentADMList.indexOf(UserIDRemove)
                CurrentADMList.splice(Index, 1);

                var UsersAdmString = "";

                CurrentADMList.forEach(item => {
                    // Check if item is an number
                    if (!isNaN(item)) { UsersAdmString += item + "|"; }

                });

                UsersAdmString = UsersAdmString.replace("||", "|");

                global.storage.WriteFile("administrator_users.data", UsersAdmString)

                global.ReplyMessage(global.storage.LoadFile("adm_removed", "sys/adm_tools/remove_adm"), msg)

                break;

            case "add_adm":
                var UserIDToAdd = args[1];
                var CurrentADMList = storage.LoadFile("administrator_users").split('|');

                // Check if UserID Box is an number
                if (isNaN(UserIDToAdd)) {
                    global.ReplyMessage(global.storage.LoadFile("invalid_user_id", "sys/adm_tools/add_adm"), msg)
                    return;
                }

                // Check if user isn't already an administrator
                if (global.UserIsAdministratorByUserID(UserIDToAdd)) {
                    global.ReplyMessage(global.storage.LoadFile("already_adm", "sys/adm_tools/add_adm"), msg)
                    return;
                }

                // Check if user is the bot owner
                if (UserIDToAdd == storage.LoadFile("owner")) {
                    global.ReplyMessage(global.storage.LoadFile("user_is_bot_owner", "sys/adm_tools/add_adm"), msg)
                    return;
                }

                // Change Loaded List
                CurrentADMList.push(UserIDToAdd);

                var UsersAdmString = "";

                CurrentADMList.forEach(item => {
                    // Check if item is an number
                    if (!isNaN(item)) { UsersAdmString += item + "|"; }

                });

                UsersAdmString = UsersAdmString.replace("||", "|");

                global.storage.WriteFile("administrator_users.data", UsersAdmString)

                global.ReplyMessage(global.storage.LoadFile("new_adm", "sys/adm_tools/add_adm"), msg)

                break;


            default:
                global.ReplyMessage(global.storage.LoadFile("invalid_command_argument", "sys/adm_tools"), msg)
                break;
        }
    }

}

exports.call = call;