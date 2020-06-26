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
 * @param {string} filedata - Optional: filepath to media.
 * @returns {object} 
 */
function generate_attachment(type, url, filedata) {
    let response = {};
    if (filedata == undefined) {
        response = {
            "attachment": {
                "type": type,
                "payload": {
                    "url": url,
                    "is_reusable": true
                }
            }
        }
    }
    else if (url == "") {
        response = {
            "attachment": {
                "type": type,
                "payload": {
                    "is_reusable": true
                },
                "filedata": "@/" + filedata
            }
        }
    }
    return response;
}

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;
exports.sendAttachment = generate_attachment;