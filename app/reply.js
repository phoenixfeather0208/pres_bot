"strict mode";

// debug
const util = require("util");

/**
 * Handles quick reply payload and generate response.
 * @param {string} payload
 * @returns {object} : response based on payload.
 */
function handleReplyPayload(payload) {
    if (payload == "talk") {
        return{
            "text": "Cool! Let's talk! I am a great listener. What would you like to talk about?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Get to know Preston!",
                    "payload": "intro"
                },
                {
                    "content_type": "text",
                    "title": "Hire Preston!",
                    "payload": "hire"
                }
            ]
        }
    }
    else if (payload == "bye") {
        return{
            "text": "Ok. Goodbye! 👋"
        }
    }
    else if (payload == "hire") {
        return{
            "attachment":
            {
                "type": "template",
                "payload":
                {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Hire me!",
                            "subtitle": "Check out my website.",
                            "default_action":
                            {
                                "type": "web_url",
                                "url": "https://prestonongis.online/",
                                "webview_height_ratio": "tall"
                            }
                        }
                    ]
                }
            }
        }
    }
    else if (payload == "intro") {
        return{
            "text": "Hello! My name is Preston Ong. That's it for now. I will do a better job at introducing myself in the future. :P"
        }
    }
}

exports.handleReplyPayload = handleReplyPayload;