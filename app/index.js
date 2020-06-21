"strict mode";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const request = require("request");
require("dotenv").config();
const nlp = require("./nlp");

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
function handleMessage(sender_psid, received_message, sender) {
    let response;

    // check if the message contains text
    if (received_message.text) {
        // debug
        console.log("Message received: "+received_message.text);

        response = nlp.response(received_message.nlp, received_message.text, sender);
    }

    else if (received_message.attachments) {
        // Get the URL of the attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = 
        {
            "attachment": 
            {
                "type": "template",
                "payload": 
                {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type" : "postback",
                                    "title" : "Yes!",
                                    "payload" : "yes"
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }

    // sends the response
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // get the payload for the postback
    let payload = received_postback.payload;

    // set the response based on the payload
    if (payload == "yes") {
        response = 
        {
            "text" : "Thanks!"
        }
    }
    else if (payload == "no") {
        response =
        {
            "text": "Oh no! I guess I am not a good bot."
        }
    }
    
    // send the response
    callSendAPI(sender_psid, response);
}

// Handles quick reply
function handleQuickReplies(sender_psid, quickRepliesEvent) {
    let response;
    let payload = quickRepliesEvent.payload;
    if (payload == "talk") {
        response = 
        {
            "text": "Cool! Let's talk! I am a great listener. What would you like to talk about?"
        }
    }
    else if (payload == "bye") {
        response =
        {
            "text": "Ok. Goodbye! 👋"
        }
    }

    // send the response
    callSendAPI(sender_psid, response);
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
                //debug
                let pretty_obj = JSON.stringify(body.body, undefined, 2);
                console.log("\n User API: \n");
                console.log(pretty_obj);
                console.log("\n");

                let obj = JSON.parse(body.body);

                // check if the event is a message or postback and pass the event to the appropiate handler function
                if (event.message) {
                    if (event.message.quick_reply) {
                        handleQuickReplies(psid, event.message.quick_reply);
                    }
                    else {
                        handleMessage(psid, event.message, obj);
                    }
                }
                else if (event.postback) {
                    handlePostback(psid, event.postback);
                }
            }
        }
    )
}