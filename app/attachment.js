"strict mode";

// debug
const util = require("util");
const index = require("./index");

/**
 * Respond with a generic template based on the image url.
 * @param {string} url : attachment url.
 * @param {object} user
 * @returns {Object} : template response.
 */
function responseAttachment(url, user) {
    const preston = require("./preston");
    if (url.includes("https://scontent.xx.fbcdn.net/")) {
        return {
            "text": "👍"
        }
    }
    else {
        let caption = "Sorry, I do not understand memes yet. ";
        let memeURL = index.randomOutput(preston.favoriteMemesURL);
        return generate_attachment("image", memeURL, caption, user);
    }
}

/**
 * 
 * @param {string} payload 
 * @param {object} user
 * @returns {Object} : text response based on payload.
 */
function handleAttachmentPayload(payload, user) {
    const responses = require("./responses");
    // console.log("handling payload...");
    // console.log("Postback payload response: ", util.inspect(responses, false, null, true /* enable colors */));
    let payloadResponse = {};
    if (payload == "summary") {
        payloadResponse = responses.payload_summary;
    }
    else if (payload == "get_started") {
        payloadResponse =  responses.get_started;
    }
    else if (payload == "contribute") {
        payloadResponse =  responses.contribute;
    }
    else if (payload == "hire") {
        payloadResponse =  responses.quick_reply_hire;
    }
    else if (payload == "intro") {
        payloadResponse =  responses.quick_reply_intro;
    }
    else if (payload == "prolang") {
        payloadResponse = responses.preston_details.prolang;
    }
    else if (payload == "acmt") {
        payloadResponse = responses.preston_details.achievement;
    }
    else if (payload == "area") {
        payloadResponse = responses.preston_details.prointerest;
    }
    else if (payload == "shortIntro") {
        payloadResponse = responses.preston_details.bio;
    }
    else if (payload == "interest") {
        payloadResponse = responses.preston_details.interest(user);
    }
    else if (payload == "meme") {
        payloadResponse = responses.meme();
    }
    // console.log("payload response: ", util.inspect(payloadResponse, false, null, true /* enable colors */))
    return payloadResponse;
}

/**
 * This fuctions generates a non text response.
 * @param {string} type - Attachment type. Image, video or audio
 * @param {string} url - Optional: url path to media.
 * @param {string} caption - Optional: text caption.
 * @param {object} user - Input user.
 * @returns {object} 
 */
function generate_attachment(type, url, caption, user) {
    if ((caption != undefined) && (user != undefined)) {
        let textResponse = {
            "text": caption
        }
        index.sendAPI(user.id, textResponse);
    }
    let response = 
    {
        "attachment": {
            "type": type,
            "payload": {
                "url": url,
                "is_reusable": true
            }
        }
    };
    // console.log("Attachment response: \n", util.inspect(response, false, null, true /* enable colors */))
    return response;
}

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;
exports.sendAttachment = generate_attachment;