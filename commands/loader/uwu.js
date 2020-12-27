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
    // Split arguments
    var args = arguments.split(" ");
    // If true, a message can be sent
    var MessageCanSend = true;

    // Generate Random Message Number
    var RandomMax = Number(global.storage.LoadFile("max_matches", "uwu"));
    // Get a random number from the random number output
    var MessageNumber = global.random_between(0, RandomMax);

    // Check if message has arguments
    if (args.length != 0) {
        switch (args[0]) {
            //
            // Command for adding messages
            //
            case "add":
                var ImageName = arguments.split(",")[0].replace("add ", "");
                var ImageContent = arguments.split(",")[1];

                // Check if title isn't null
                if (ImageName == undefined || ImageName == "") {
                    global.ReplyMessage(global.storage.LoadFile("invalid_title_error", "uwu"), msg);
                    return;
                }

                // Check if content isn't null
                if (ImageContent == undefined || ImageContent == "") {
                    global.ReplyMessage(global.storage.LoadFile("invalid_link_error", "uwu"), msg);
                    return;
                }

                var ImageID = String(RandomMax + 1);
                var FileData = ImageName + "\n\n" + ImageContent;

                global.storage.WriteFile("matches/" + ImageID + ".data", FileData, "uwu")
                global.ReplyMessage(global.storage.LoadFile("file_added_new_id", "uwu").replace("{0}", String(ImageID)).replace("{1}", ImageName).replace("{2}", ImageContent), msg);

                // Write the new max
                global.storage.WriteFile("max_matches.data", String(ImageID), "uwu")

                // Create the Ticket for the added image
                /*
                var ticketData = "Titulo: " + ImageName + "\n" +
                    "Contudo: " + ImageContent + "\n\n" +
                    "ID: " + ImageID + "\n" +
                    "ID do Usuario: " + msg.author.id + "\n" +
                    "Nome do Usuario: " + msg.author.username + "\n" +
                    "Discriminador do Usuario: " + msg.author.discriminator + "\n" +
                    "Usuario é um bot?: " + msg.author.bot + "\n" +
                    "Data criação do usuario: " + msg.author.createdAt;
                */


                var ticketData = global.storage.LoadFile("ticket_template", "uwu")
                    .replace("$msg_title", ImageName)
                    .replace("$msg_content", ImageContent)
                    .replace("$msg_id", ImageID)
                    .replace("$author_id", msg.author.id)
                    .replace("$author_username", msg.author.username)
                    .replace("$author_discriminator", msg.author.discriminator)
                    .replace("$author_is_bot", msg.author.bot)
                    .replace("$author_created_at", msg.author.createdAt)

                global.storage.WriteFile("tickets/" + String(ImageID) + ".data", ticketData, "uwu")
                global.ReplyMessage(global.storage.LoadFile("ticket_created", "uwu"), msg);

                return;

            //
            // View a message Ticket Contents
            //
            case "ticket_view":
                var TicketID = args[1];
                var ticketData = global.storage.LoadFile("tickets/" + String(TicketID), "uwu");

                // Check if TicketId is an number
                if (isNaN(TicketID)) {
                    global.ReplyMessage(global.storage.LoadFile("invalid_ticket_id", "uwu"), msg);
                    return;

                }

                // Check if ticket exists
                if (!global.storage.FileExists(TicketID + ".data", "uwu/tickets")) {
                    global.ReplyMessage(global.storage.LoadFile("ticket_does_not_exist", "uwu"), msg);
                    return;
                }

                global.ReplyMessage(global.storage.LoadFile("ticket_info_view", "uwu"), msg);
                msg.author.send(global.storage.LoadFile("ticket_view", "uwu").replace("{0}", ticketData))

                return;

            //
            // Say the total of the messages
            //
            case "total":
                global.ReplyMessage(global.storage.LoadFile("total_msg", "uwu").replace("{0}", String(RandomMax)), msg);
                return;

            //
            // (Administrators Only) Remove message
            //
            case "remove":
                var ImageID = args[1];

                // Check if user that is trying to remove the image is an Administrator
                if (!global.UserIsAdministrator(msg)) {
                    global.ReplyMessage(global.storage.LoadFile("remove_user_not_administrator", "uwu"), msg);
                    return;
                }

                // Check if typed ID is an valid number
                if (isNaN(ImageID)) {
                    global.ReplyMessage(global.storage.LoadFile("id_is_not_number", "uwu"), msg);
                    return;
                }

                // Check if Image Exists
                if (!global.storage.FileExists(ImageID + ".data", "uwu/matches")) {
                    global.ReplyMessage(global.storage.LoadFile("cannot_remove_unexistent_image", "uwu"), msg);
                    return;
                }

                //
                // Delete the file
                //
                global.storage.DeleteFile(ImageID + ".data", "uwu/matches");

                //
                // Say Image Removed Message
                //
                global.ReplyMessage(global.storage.LoadFile("image_removed", "uwu"), msg);


                return;

            //
            // If no argument was provided
            //
            default:
                //
                // Check if messages starts with '#' token
                //
                if (args[0].startsWith("#")) {
                    var wax = parseInt(args[0].replace("#", ""));
                    console.log(wax);

                    // check if input is a number
                    if (!global.IsNumber(wax)) {
                        global.ReplyMessage(global.storage.LoadFile("id_is_not_number", "uwu"), msg);

                    }

                    if (wax > RandomMax) {
                        MessageCanSend = false;
                        global.ReplyMessage(global.storage.LoadFile("invalid_message_id", "uwu"), msg);

                    } else {
                        MessageNumber = wax;

                    }

                    ReplyImgID(MessageNumber, msg);
                    MessageCanSend = false;
                    return;

                }
                break;

        }

    }

    // Send the Random Message
    if (MessageCanSend) {
        // Check if image exists
        var Tries = 0;
        var Found = false;


        // Loops with no valid image was found
        while (!Found) {
            if (Tries >= 5) {
                global.ReplyMessage(global.storage.LoadFile("maximum_tries_excedded", "uwu"), msg);
                return;
            }


            if (global.storage.FileExists(MessageNumber + ".data", "uwu/matches")) {
                // If found an Image, display it
                Found = true;
                ReplyImgID(MessageNumber, msg);
                return;

            } else {
                // If cannot find the Image, generate another ImageID
                Tries += 1;
                MessageNumber = global.random_between(0, RandomMax);


            }

        }


    }


}

function ReplyImgID(ImageID, msg) {
    // Check if message exists
    if (!storage.FileExists(ImageID + ".data", "uwu/matches")) {
        global.ReplyMessage(storage.LoadFile("image_not_found", "uwu").replace("{0}", ImageID), msg);
        return;
    }

    var UwUContent = global.storage.LoadFile(String(ImageID), "uwu/matches");

    var Message = "ID:" + String(ImageID) + "\n" + UwUContent;

    global.ReplyMessage(Message, msg);

}

// Make the command callable
exports.call = call;