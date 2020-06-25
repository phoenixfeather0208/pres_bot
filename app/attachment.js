"strict mode";

// debug
const util = require("util");
const responses = require("./responses");

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
        return responses.payload_yes;
    }
    else if (payload == "no") {
        return responses.payload_no;
    }
    else if (payload == "summary") {
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

exports.responseAttachment = responseAttachment;
exports.handleAttachmentPayload = handleAttachmentPayload;