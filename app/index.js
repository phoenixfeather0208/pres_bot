"strict mode";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const request = require("request");
require("dotenv").config();

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
            console.log(webhook_event);

            // Get the sender's PSID
            let sender_psid = webhook_event.sender.id;
            console.log("Sender PSID: " + sender_psid);

            // check if the event is a message or postback and pass the event to the appropiate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            }
            else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
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
function handleMessage(sender_psid, received_message) {
    let response;

    // check if the message contains text
    if (received_message.text) {
        // NLP greeting
        const greeting = firstTrait(received_message.nlp, "wit$greetings");

        if (greeting && greeting.confidence > 0.8) {
            // check firstTrait function output
            console.log("firstTrait() returned: \n", util.inspect(greeting, false, null, true /* enable colors */));
            response = 
            {
                "text": "Hello to my favorite human! How are you? :)"
            }
        }
        else {
            response =
            {
                "text": 'You sent me a message: "' + received_message.text + '". Send me more texts or an image!'
            }
        }
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

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // constrcut the message body
    let request_body = 
    {
        "recipient": {"id": sender_psid},
        "message": response
    }

    // send the POST request to the Messenger platform
    request({
        "url": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log("Message sent!");
        }
        else {
            console.error("Unable to send message: " + err);
        }
    })
}

// NLP helper function.
function firstTrait(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}