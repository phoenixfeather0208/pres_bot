"strict mode";

// debug
const util = require("util");
const responses = require("./responses");
const index = require("./index");

var timeOutID;

/**
 * Handles quick reply payload and generate response.
 * @param {string} payload
 * @returns {object} : response based on payload.
 */
function handleReplyPayload(payload, user) {
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
    else if (payload == "makeFun") {
        let preston_response = responses.makeFun_preston;
        index.sendAPI(process.env.PRESTON_PSID, preston_response);
        return responses.quick_reply_makeFun;
    }
    else if (payload == "story") {
        return responses.user_talk;
    }

    // users want to interact with Preston.
    else if (payload == "human") {
        timeOutID = setTimeout(() => {
            index.sendAPI(user.id, responses.preston_deny);
        }, 15000)
        
        // TODO: Send a message to Preston, to which Preston must respond yes or no to kill timer.

        return responses.preston_request;
    }
}

exports.handleReplyPayload = handleReplyPayload;
exports.prestonTimeOut = timeOutID;