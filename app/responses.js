"strict mode";

const preston = require("./preston");

module.exports = {
    wrongName: 
    {
        "text": "Lmao! Do you even know my name? Let's try this again. :P"
    },
    bye:
    {
        "text": "Before you go, would you care to rate your experience with our conversation?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "😊",
                "payload": "happy"
            },
            {
                "content_type": "text",
                "title": "😐",
                "payload": "neutral"
            },
            {
                "content_type": "text",
                "title": "😒",
                "payload": "notHappy"
            },
            {
                "content_type": "text",
                "title": "I SAID GOODBYE",
                "payload": "exit"
            }
        ]
    },
    feedBackResponse: [
        {
            "text": "Aww.. I enjoyed talking to you too. I hope you have a good day."
        },
        {
            "text" : "Cool. Take Care. :)"
        },
        {
            "text" : "I am sorry that you did not enjoy our conversation. Machines go brrrr....",
        }
    ],
    receive_feedback: function(payload, name) {
        if (payload == "happy") {
            return {
                "text": `${name} enjoyed our conversation.`
            }
        }
        else if (payload == "neutral") {
            return {
                "text": `It was meh for ${name}. We can do better.`
            }
        }
        else {
            return {
                "text": `${name} did not have fun with our conversation.`
            }
        }
    },
    greeting: function(name) 
    {
        return {
            "text": `How's it goin, ${name}! It's nice to have you here with me 😎`,
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Let's talk!",
                    "payload": "talk"
                },
                {
                    "content_type": "text",
                    "title": "Goodbye!",
                    "payload": "bye"
                }
            ]
        }
    },
    exit: {
        "text": "Ok, goodbye! 👋"
    },
    compliment:
    {
        "text": "Thanks! You are awesome too! :)"
    },
    payload_yes:
    {
        "text": "Thanks!"
    },
    payload_no:
    {
        "text": "Oh no! I guess I am not a good bot."
    },
    payload_summary:
    {
        "text": "I am proud to be graduated from UC Davis. I majored in C.S. with an econ minor! I am seeking a full-time position role in software engineering, espcially interested in full-stack, machine learning and blockchain! I am very passionate about using technology to make my life more fun and awesome. Check out my website to see my portfolio."
    },
    get_started:
    {
        "text": "To begin, say hi! :)"
    },
    quick_reply_talk:
    {
        "text": "Cool! What would you like to talk about?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Get To Know Preston",
                "payload": "intro"
            },
            {
                "content_type": "text",
                "title": "See My Portfolio",
                "payload": "hire"
            },
            {
                "content_type": "text",
                "title": "Shh... let me talk",
                "payload": "story"
            }
        ]
    },
    quick_reply_hire:
    {
        "attachment":
        {
            "type": "template",
            "payload":
            {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Hire me, maybe? 😉",
                        "subtitle": "Select an option:",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Elevator Pitch",
                                "payload": "summary"
                            },
                            {
                                "type": "web_url",
                                "url": "https://prestonongis.online/",
                                "title": "Website"
                            },
                            {
                                "type": "web_url",
                                "url": "http://github.com/preston4896",
                                "title": "GitHub"
                            }
                        ]
                    }
                ]
            }
        }
    },
    quick_reply_intro:
    {
        "text": "Hello, even though I am a bot, I speak on behalf of Preston. You may pick an option below or ask me questions like, what I do for fun, my meme collections or anything else about me. :)",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Short Intro",
                "payload": "shortIntro"
            },
            {
                "content_type": "text",
                "title": "Interest",
                "payload": "interest"
            },
            {
                "content_type": "text",
                "title": "Random",
                "payload": "random"
            }
        ]
    },
    preston_details: 
    {
        bio: 
        {
            "text" : preston.prestonBio()
        } 
    },
    smile:
    {
        "text": ":)"
    },
    insult:
    {
        "text": "You know what? I agree with you. My creator doesn't know how to code at all. I can make fun of him on your behalf. Shall I proceed?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Make fun of Preston",
                "payload": "makeFun"
            }
        ]
    },
    quick_reply_makeFun:
    {
        "text": "Preston is gonna be mad lmao"
    },
    makeFun_preston:
    {
        "text": "Hey! A user thinks you suck!"
    },
    user_talk:
    {
        "text": "Ok pour it out.. I am a great listener and I won't judge you. You can tell me anything :)"
    },
    contribute:
    {
        "attachment":
        {
            "type": "template",
            "payload":
            {
                "template_type": "generic",
                "elements":
                    [
                        {
                            "title": "Found a bug?",
                            "subtitle": "Feel free to explore source code, report bugs or submit pull requests.",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": "https://github.com/preston4896/pres_bot",
                                    "title": "View Repo"
                                },
                            ]
                        }
                    ]
            }
        }
    },
    story_positive:
    [
        {
            "text": "I am so happy to hear that! :)"
        },
        {
            "text": "Wow! That is awesome! :)"
        }
    ],
    story_negative:
    [
        {
            "text": "I am sorry to hear that. :("
        },
        {
            "text": "Oh no! That sucks. :/"
        }
    ],
    story_neutral:
    {
        "text": "Cool story, bro! 😎"
    },
    sad:
    {
        "text": ":/"
    },
    // preston_request:
    // {
    //     "text": "Ok! Let me get a hold of him..."
    // },
    // preston_deny:
    // {
    //     "text": "I am sorry! Preston is not available at the moment, I will make sure he gets back to you asap. :)"
    // },
    // preston_accept:
    // {
    //     "text": "You are now connected with Human Preston."
    // },
    // contact_preston:
    // {
    //     prompt: function(name)
    //     {
    //         return {
    //             "text": `${name} sent you a chat request.`,
    //             "quick_replies": [
    //                 {
    //                     "content_type": "text",
    //                     "title": "Accept",
    //                     "payload": "accept"
    //                 },
    //                 {
    //                     "content_type": "text",
    //                     "title": "Deny",
    //                     "payload": "deny"
    //                 }
    //             ]
    //         }
    //     },
    //     begin:
    //     {
    //         "text": "Chat session has initiated."
    //     },
    //     end:
    //     {
    //         "text": "Preston has ended chat session."
    //     }
    // },
    out_of_scope: function(name, message)
    {
        return {
            "text": `Hey, ${name}. I am sorry, but I do not understand "${message}". Continue?`,
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Continue",
                    "payload": "talk"
                },
                // {
                //     "content_type": "text",
                //     "title": "Talk to Human",
                //     "payload": "human"
                // },
                {
                    "content_type": "text",
                    "title": "Goodbye!",
                    "payload": "bye"
                }
            ]
        }
    },
    report_error:
    {
        "text" : "Uh-oh! I am experiencing an internal error. Send me another message or if error persists, contact Preston."
    },
    feature_not_ready:
    {
        "text" : "Sorry, this feature is not ready yet."
    }
}