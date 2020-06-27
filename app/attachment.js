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
        let memeURL = "https://i.imgflip.com/46dsxq.jpg";
        return generate_attachment("image", memeURL, "Sorry, I do not understand memes yet, but I have a meme for you: ");
    }
}

/**
 * 
 * @param {string} payload 
 * @returns {Object} : text response based on payload.
 */
function handleAttachmentPayload(payload) {
    if (payload == "summary") {
        return responses.payload_summary;
    }
    else if (payload == "get_started") {
        return responses.get_started;
    }
    else if (payload == "contribute") {
        return responses.contribute;
    }
    else if (payload == "hire") {
        return responses.quick_reply_hire;
    }
    else if (payload == "intro") {
        return responses.quick_reply_intro;
    }
}

/**
 * This fuctions generates a non text response.
 * @param {string} type - Attachment type. Image, video or audio
 * @param {string} url - Optional: url path to media.
 * @param {string} caption - Optional: attachment text.
 * @returns {object} 
 */
function generate_attachment(type, url, caption) {
    if (caption != undefined) {
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
    return response;
}

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;
exports.sendAttachment = generate_attachment;