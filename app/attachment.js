"strict mode";

// debug
const util = require("util");
const responses = require("./responses");
const index = require("./index");

/**
 * Respond with a generic template based on the image url.
 * @param {string} url : attachment url.
 * @param {object} user
 * @returns {Object} : template response.
 */
function responseAttachment(url, user) {
    if (url.includes("https://scontent.xx.fbcdn.net/")) {
        return {
            "text": "👍"
        }
    }
    else {
        let response = {
            "text": "Sorry, I do not understand memes yet, but I have a meme for you: "
        }
        let memeURL = "https://i.imgflip.com/46dsxq.jpg";
        index.sendAPI(user.id, response);
        return generate_attachment("image", memeURL);
    }
}

/**
 * 
 * @param {string} payload 
 * @returns {Object} : text response based on payload.
 */
function handleAttachmentPayload(payload) {
    console.log("handling payload...");
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
    // console.log("payload response: ", util.inspect(payloadResponse, false, null, true /* enable colors */))
    return payloadResponse;
}

/**
 * This fuctions generates a non text response.
 * @param {string} type - Attachment type. Image, video or audio
 * @param {string} url - Optional: url path to media.
 * @returns {object} 
 */
function generate_attachment(type, url) {
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
    return response;
}

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;
exports.sendAttachment = generate_attachment;