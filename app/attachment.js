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
    if (url == "https://scontent.xx.fbcdn.net/v/t39.1997-6/cp0/39178562_1505197616293642_5411344281094848512_n.png?_nc_cat=1&_nc_sid=ac3552&_nc_ohc=rYS1XLwdA2cAX-lJ0eM&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=60c90b8831cb39119b379003106ec134&oe=5F1B4349") {
        return {
            "text": "👍"
        }
    }
    else {
        let response = {
            "text": "Sorry, I do not understand, but I have a meme for you: "
        }
        let memeURL = "https://i.imgflip.com/46dsxq.jpg";
        index.sendAPI(user.id, response);
        return generate_template_response("image", memeURL);
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
function generate_template_response(type, url, filedata) {
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