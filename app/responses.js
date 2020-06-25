"strict mode";

// responses to extract.
module.exports = {
    wrongName: 
    {
        "text": "Lmao! Do you even know my name? Let's try this again. :P"
    },
    bye:
    {
        "text": "Ok. Goodbye! 👋"
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
        "text": "Heyo! I am proud to be graduated from UC Davis. I majored in C.S. with an econ minor! I am seeking a full-time position role in software engineering, espcially interested in full-stack, machine learning and blockchain! I am very passionate about using technology to make my life more fun and awesome. Check out my website to see my portfolio."
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
                "title": "Introduce yourself",
                "payload": "intro"
            },
            {
                "content_type": "text",
                "title": "Hire Preston!",
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
        "text": "Hello! My name is Preston Ong. That's it for now. I will do a better job at introducing myself in the future. :P"
    },
    smile:
    {
        "text": ":)"
    },
    insult:
    {
        "text": "You know what? I agree with you. My creator doesn't know how to code at all. Why don't we make fun of him together?",
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
                            "title": "Contributions are appreciated!",
                            "subtitle": "Feel free to explore source code and submit pull requests.",
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
    out_of_scope: function(name, message)
    {
        return {
            "text": `Hey, ${name}. I am sorry but I do not understand "${message}" yet. I am not the perfect bot. Maybe you should talk to human Preston Ong!`,
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Talk to PresBot",
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
    report_error:
    {
        "text" : "Uh-oh! I am experiencing an internal error. Send me another message or if error persists, contact Preston."
    }
}