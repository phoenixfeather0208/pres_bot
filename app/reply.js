"strict mode";

// debug
const util = require("util");
const responses = require("./responses");
const index = require("./index");

// var timeOutID;
// var trackUser;

/**
 * Handles quick reply payload and generate response.
 * @param {string} payload
 * @param {object} user
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
    else if (payload == "happy") {
        index.sendAPI(process.env.PRESTON_PSID, responses.receive_feedback(payload, user.first_name));
        return responses.feedBackResponse[0];
    }
    else if (payload == "neutral") {
        index.sendAPI(process.env.PRESTON_PSID, responses.receive_feedback(payload, user.first_name));
        return responses.feedBackResponse[1];
    }
    else if (payload == "notHappy") {
        index.sendAPI(process.env.PRESTON_PSID, responses.receive_feedback(payload, user.first_name));
        return responses.feedBackResponse[2];
    }
    else if (payload == "exit") {
        return responses.exit;
    }
    else if (payload == "shortIntro") {
        return responses.feature_not_ready;
    }
    else if (payload == "interest") {
        return responses.preston.interest;
    }

    // // users want to interact with Preston.
    // else if (payload == "human") {
    //     // Send the request to Preston.
    //     index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.prompt(user.first_name));

    //     if (index.liveIsActive) {
    //         return responses.preston_deny;
    //     }

    //     else {
    //         timeOutID = setTimeout(() => {
    //             index.sendAPI(user.id, responses.preston_deny);
    //             index.sendAPI(process.env.PRESTON_PSID, responses.contact_preston.end);
    //             // // TAKE BACK CONTROL
    //             // index.switchControl(user.id, true);
    //         }, 30000)

    //         trackUser = user;

    //         // // PASS THREAD CONTROL HERE
    //         // index.switchControl(user.id, false);
    //         return responses.preston_request;
    //     }
    // }

    // // if Preston accepts the request - this response is only sent to Preston, not the users.
    // else if (payload == "accept") {
    //     clearTimeout(timeOutID);
    //     index.sendAPI(trackUser.id, responses.preston_accept);
    //     return responses.contact_preston.begin;
    // }

    // // PRESTON ONLY
    // else if (payload == "deny") {
    //     clearTimeout(timeOutID);
    //     index.sendAPI(trackUser.id, responses.preston_deny);
    //     return responses.contact_preston.end;
    // }

}

// /**
//  * Listens for Preston's messages and then send it to the user and vice versa.
//  * @param {Number} senderID - Preston's PSID
//  * @param {Number} receiverID - User's PSID
//  * @param {string} messageInput - Text message
//  * @returns {boolean} - Switch personas.
//  */
// function send_message_to_user(senderID, receiverID, messageInput) {
//     // Preston ends session.
//     if ((senderID == process.env.PRESTON_PSID) && (messageInput == "exitChat")) {
//         index.sendAPI(receiverID, responses.contact_preston.end, false);
//         index.sendAPI(senderID, responses.contact_preston.end);
//         return false;
//     }

//     else {
//         let messageObject = {
//             "text": messageInput
//         }
//         index.sendAPI(receiverID, messageObject, true);
//         return true;
//     }
// }

exports.handleReplyPayload = handleReplyPayload;