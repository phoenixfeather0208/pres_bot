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
    trackUser = user;

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
            index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.end);
        }, 30000)
        
        // Send the request to Preston.
        index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.prompt(user.first_name));

        return responses.preston_request;
    }

    // if Preston accepts the request - this response is only sent to Preston, not the users.
    else if (payload == "accept") {
        clearTimeout(timeOutID);
        // How to let user know they are connected to me?
        // also turn on sender's action.
        return responses.contact_preston.begin;
    }

    
}

exports.handleReplyPayload = handleReplyPayload;
exports.prestonTimeOut = timeOutID;