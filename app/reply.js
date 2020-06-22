"strict mode";

// debug
const util = require("util");
const responses = require("./responses");

/**
 * Handles quick reply payload and generate response.
 * @param {string} payload
 * @returns {object} : response based on payload.
 */
function handleReplyPayload(payload) {
    if (payload == "talk") {
        return responses.quick_reply_talk;
    }
    else if (payload == "bye") {
        return responses.bye;
    }
    else if (payload == "hire") {
        return responses.quick_reply_hire;
    }
    else if (payload == "intro") {
        return responses.quick_reply_intro;
    }
}

exports.handleReplyPayload = handleReplyPayload;