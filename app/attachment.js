"strict mode";

// debug
const util = require("util");

/**
 * Respond with a generic template based on the image url.
 * @param {string} url : attachment url.
 * @returns {Object} : template response.
 */
function responseAttachment(url) {
    return {
        "attachment":
        {
            "type": "template",
                "payload":
            {
                "template_type": "generic",
                    "elements": 
                    [
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes"
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

/**
 * 
 * @param {string} payload 
 * @returns {Object} : text response based on payload.
 */
function handleAttachmentPayload(payload) {
    // set the response based on the payload
    if (payload == "yes") {
        return{
            "text": "Thanks!"
        }
    }
    else if (payload == "no") {
        return{
            "text": "Oh no! I guess I am not a good bot."
        }
    }
}

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;