"strict mode";

const preston = require("./preston");
const index = require("./index");
const attachment = require("./attachment");
const util = require("util");

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
            "text" : "I am sorry that you did not enjoy our conversation. Machines go brrrr...."
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
            "text": `How's it goin, ${name}! It's nice to see you! 😎`,
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
    payload_summary:
    {
        "attachment":
        {
            "type" : "template",
            "payload" : 
            {
                "template_type" : "button",
                "text": preston.profession.elevator_pitch(),
                "buttons" : [
                    {
                        "type" : "postback",
                        "title" : "Programming Languages",
                        "payload" : "prolang"
                    },
                    {
                        "type": "postback",
                        "title": "Areas of Interest",
                        "payload": "area"
                    },
                    {
                        "type": "postback",
                        "title": "Achievement",
                        "payload": "acmt"
                    }
                ]
            }
        }
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
        "attachment":
        {
            "type": "template",
            "payload":
            {
                "template_type": "button",
                "text": "Although I am a bot, I speak on behalf of Preston. You may pick an option below or ask me questions about my ethnicity, fun facts or anything else about me. :)",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Short Intro",
                        "payload": "shortIntro"
                    },
                    {
                        "type": "postback",
                        "title": "Fun Facts",
                        "payload": "interest"
                    }
                ]
            }
        }
    },
    preston_details: 
    {
        bio: 
        {
            "text" : preston.prestonBio()
        },
        interest: function(user) {
            let randomObject = index.randomOutput(preston.interest);
            let returnObj = {};
            if (randomObject.imgURL === undefined) {
                returnObj = {"text": randomObject.text};
            }
            else {
                returnObj = attachment.sendAttachment("image", randomObject.imgURL, randomObject.text, user);
            }
            returnObj["quick_replies"] = [
                {
                    "content_type": "text",
                    "title": "More Facts",
                    "payload": "facts"
                }
            ];
            return returnObj;
        },
        prolang: 
        {
            "text" : preston.profession.tech.languageStatement()
        },
        prointerest:
        {
            "text" : preston.profession.tech.interestStatement()
        },
        achievement:
        {
            "text" : preston.profession.achievement.achievementStatement()
        },
        name: 
        {
            "text" : preston.name.printStatement()
        },
        birthday:
        {
            "text" : preston.age.birthdayStatement()
        },
        age:
        {
            "text" : preston.age.ageStatement()
        },
        hometown:
        {
            "text" : preston.origin.originStatement()
        },
        ethnicity:
        {
            "text" : preston.origin.ethnicityStatement()
        },
        education:
        {
            "text" : preston.profession.education.educationStatement()
        },
        url: function(location) {
            let checkURL = preston.url[location];
            if (checkURL === undefined) {
                return {
                    "text" : `Preston is not reachable on ${location}.`
                }
            }
            else {
                return {
                    "text" : checkURL
                }
            }
        }
    },
    smile:
    {
        "text": "😂"
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
    quick_reply_makeFun: function(user) {
        return attachment.sendAttachment("image", "https://i.kym-cdn.com/entries/icons/original/000/032/468/snape.jpg", "Lmao! Preston be like this...", user);
    },
    makeFun_preston: function(name){
        return {
            "text": `Hey man! ${name} thinks you suck!`
        }
    },
    user_talk:
    {
        "text": "Alrighty then! You can tell me about your day, a story or pretty much anything else. I am here for you and I care about you. <3"
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
    meme: function() {
        // return attachment.sendAttachment("image", index.randomOutput(preston.favoriteMemesURL));
        let returnObj = attachment.sendAttachment("image", index.randomOutput(preston.favoriteMemesURL));
        returnObj["quick_replies"] = [
            {
                "content_type": "text",
                "title": "More Memes",
                "payload": "memes"
            }
        ];
        return returnObj;
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