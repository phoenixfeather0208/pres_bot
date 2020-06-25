"strict mode";

// debug
const util = require("util");
const responses = require("./responses");
const index = require("./index");

var timeOutID;
var trackUser;

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
        if (index.liveIsActive) {
            return responses.preston_deny;
        }

        else {
            timeOutID = setTimeout(() => {
                index.sendAPI(user.id, responses.preston_deny);
                index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.end);
                // // TAKE BACK CONTROL
                // index.switchControl(user.id, true);
            }, 30000)

            trackUser = user;

            // Send the request to Preston.
            index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.prompt(user.first_name));

            // // PASS THREAD CONTROL HERE
            // index.switchControl(user.id, false);
            return responses.preston_request;
        }
    }

    // if Preston accepts the request - this response is only sent to Preston, not the users.
    else if (payload == "accept") {
        clearTimeout(timeOutID);
        index.sendAPI(trackUser.id, responses.preston_accept);
        return responses.contact_preston.begin;
    }

    // PRESTON ONLY
    else if (payload == "deny") {
        clearTimeout(timeOutID);
        index.sendAPI(trackUser.id, responses.preston_deny);
        return responses.contact_preston.end;
    }

}

exports.handleReplyPayload = handleReplyPayload;
exports.user = trackUser;