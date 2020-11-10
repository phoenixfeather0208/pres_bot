"strict mode";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const request = require("request");
require("dotenv").config();
const nlp = require("./nlp");
const attachment = require("./attachment");
const reply = require("./reply");
// const seedRandom = require("seedrandom");

// debug
const util = require("util");

app.listen(process.env.PORT || 1337, () => console.log("listening..."));

// GET REQUEST - VERIFY WEBHOOK
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// After verification, listen for messages via POST request, then PARSE.
app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];

            // Get the sender's PSID
            let sender_psid = webhook_event.sender.id;
            console.log("Webhook Event: \n", util.inspect(webhook_event, false, null, true /* enable colors */));
            console.log("debug psid: " + sender_psid);

            // detect guest users
            let user_is_guest = webhook_event.hasOwnProperty("postback") && webhook_event.postback.hasOwnProperty("referral") && webhook_event.postback.referral.is_guest_user;
            if (user_is_guest) {
                set_persistent_menu(sender_psid);
            }

            get_user_profile_then_respond(sender_psid, webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } 
    else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

// Handles messages events
function handleMessage(user, received_message, psid) {
    let response;

    // check if the message contains text
    if (received_message.text) {
        // debug
        console.log("Message received: "+received_message.text);
        // response = nlp.response(received_message.nlp, received_message.text, user);
        response = {
            "text" : `Sorry, ${user.first_name}. My NLP model is not functioning and currently under maintenance at the moment. Meanwhile, select an option from the hamburger menu down below. :(`
        }
    }

    else if (received_message.attachments) {
        // Get the URL of the attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = attachment.responseAttachment(attachment_url, user);
    }

    // sends the response
    callSendAPI(psid, response);
}

// Handles messaging_postbacks events
function handlePostback(user, received_postback, psid) {
    let response;
    // get the payload for the postback
    let payload = received_postback.payload;
    response = attachment.handleAttachmentPayload(payload, user);
    // send the response
    callSendAPI(psid, response);
}

// Handles quick reply
function handleQuickReplies(user, quickRepliesEvent, psid) {
    let response;
    let payload = quickRepliesEvent.payload;
    response = reply.handleReplyPayload(payload, user);

    // send the response
    callSendAPI(psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // debug response
    console.log("Sending response: \n", util.inspect(response, false, null, true /* enable colors */));

    // constrcut the message body
    let request_body = 
    {
        "recipient": {"id": sender_psid},
        "message": response,
        "messaging-type": "RESPONSE"
    }

    sender_action(sender_psid, false);

    // send the POST request to the Messenger platform
    request(
        {
        "url": "https://graph.facebook.com/v7.0/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
        }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message: " + err);
        }
    })
}

// request to set persistent menu for guest
function set_persistent_menu(psid) {
    let request_body = {
        "psid": `${psid}`,
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled":true,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Get To Know Me",
                        "payload": "intro"
                    },
                    {
                        "type": "postback",
                        "title": "See My Portfolio",
                        "payload": "hire"
                    },
                    {
                        "type": "postback",
                        "title": "Report An Issue",
                        "payload": "contribute"
                    }
                ]
            }
        ]
    }
    request(
        {
            "url" : `https://graph.facebook.com/v8.0/me/custom_user_settings?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
            "method" : "POST",
            "json" : request_body
        }, (err, body) => {
            if (err) {
                console.error("Failed to set persistent menu");
            }
            else {
                console.log("Successfully updated persistent menu for: " + psid);
            }
        }
    )
}

// get user profile info and respond.
function get_user_profile_then_respond(psid, event) {
    request(
        {
        "url": `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        "method": "GET"
        }, (err, body) => {
            if (err) {
                console.error("User Profile API error");
            }
            else {
                let obj = JSON.parse(body.body);
                
                // debug
                // console.log("pageToken: " + process.env.PAGE_ACCESS_TOKEN);
                console.log("User API returned: \n", util.inspect(obj, false, null, true /* enable colors */));
                
                
                // console.log("Preston is live? " + sendingAsPersona);
                // // Human Preston is live.
                // if ((psid == process.env.PRESTON_PSID)) {
                //     // Preston's message is sent to the user.
                    
                // }

                // check if the event is a message or postback and pass the event to the appropiate handler function
                if (event.message) {
                    sender_action(psid, true);
                    setTimeout(() => {
                        if (event.message.quick_reply) {
                            handleQuickReplies(obj, event.message.quick_reply, psid);
                        }
                        else {
                            handleMessage(obj, event.message, psid);
                        }
                    }, 750)
                }
                else if (event.postback) {
                    sender_action(psid, true);
                    setTimeout(() => {
                        handlePostback(obj, event.postback, psid);
                    }, 750)
                }
            }
        }
    )
}

function sender_action(sender_psid, isTyping) {
    let typeStatus;
    if (isTyping) {
        typeStatus = "typing_on";
    }
    else {
        typeStatus = "typing_off";
    }
    let request_body = {
        "recipient" : {"id" : sender_psid},
        "sender_action" : typeStatus
    }
    request(
        {
            "url": "https://graph.facebook.com/v7.0/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (err) {
                console.error("Sender action error: " + err);
            }
        }
    )
}

function random_output_from_array(inArray) {
    // // set random seed.
    // let seed = seedRandom();
    // // console.log("seed:" + seed());
    let returnedIndex = Math.floor(Math.random() * (inArray.length));
    return inArray[returnedIndex];
}

exports.sendAPI = callSendAPI;
exports.randomOutput = random_output_from_array;