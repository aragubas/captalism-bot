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
    var args = arguments.split(" ");
    var MessageCanSend = true;

    var RandomMax = Number(global.storage.LoadFile("matches/max", "uwu"));
    var MessageNumber = global.random_between(0, RandomMax);

    if (args.length != 0) {
        switch (args[0]) {
            case "add":
                var ImageName = arguments.split(",")[0].replace("add ", "");
                var ImageContent = arguments.split(",")[1];

                if (ImageContent == "") {
                    global.ReplyMessage(global.storage.LoadFile("invalid_link_error", "uwu"), msg);
                    return;
                }

                var ImageID = String(RandomMax + 1);
                var FileData = ImageName + "\n\n" + ImageContent;

                global.storage.WriteFile("matches/" + ImageID + ".data", FileData, "uwu")
                global.ReplyMessage(global.storage.LoadFile("file_added_new_id", "uwu").replace("{0}", String(ImageID)).replace("{1}", ImageName).replace("{2}", ImageContent), msg);

                // Write the new max
                global.storage.WriteFile("matches/max.data", String(ImageID), "uwu")

                // Create the Ticket for the added image
                var ticketData = "ImageName: " + ImageName + "\n" +
                    "ImageContent: " + ImageContent + "\n" +
                    "ImageID: " + ImageID + "\n" +
                    "UserID: " + msg.author.id + "\n" +
                    "UserName: " + msg.author.username + "\n" +
                    "UserDiscriminator: " + msg.author.discriminator + "\n" +
                    "UserIsBot: " + msg.author.bot + "\n" +
                    "UserCreated : " + msg.author.createdAt;

                global.storage.WriteFile("tickets/" + String(ImageID) + ".data", ticketData, "uwu")
                global.ReplyMessage(global.storage.LoadFile("ticket_created", "uwu"), msg);

                return;

            case "ticket_view":
                var TicketID = args[1];
                var ticketData = global.storage.LoadFile("tickets/" + String(TicketID), "uwu");

                global.ReplyMessage(global.storage.LoadFile("ticket_info_view", "uwu"), msg);
                msg.author.send(global.storage.LoadFile("ticket_view", "uwu").replace("{0}", ticketData))

                return;

            case "report":
                var TicketID = args[1];
                var ticketData = global.storage.LoadFile("tickets/" + String(TicketID), "uwu");

                global.ReplyMessage(global.storage.LoadFile("ticket_info_view", "uwu"), msg);
                msg.author.send(global.storage.LoadFile("ticket_view", "uwu").replace("{0}", ticketData))

                return;


            default:
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

                }
                ReplyImgID(MessageNumber, msg);
                MessageCanSend = false;

                return;
        }

    }

    // Send the Random Message
    if (MessageCanSend) {
        // Check if image exists
        var Tries = 0;
        var Found = false;

        while (!Found) {
            if (Tries >= 5) {
                global.ReplyMessage(global.storage.LoadFile("maximum_tries_excedded", "uwu"), msg);
                return;
            }


            if (global.fs.existsSync("matches/" + String(MessageNumber) + ".data")) {
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
    global.ReplyMessage("ID: " + String(ImageID) + "\n" + global.storage.LoadFile("matches/" + String(ImageID), "uwu"), msg);
}

// Make the command callable
exports.call = call;