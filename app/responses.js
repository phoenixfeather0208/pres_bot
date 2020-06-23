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
            "text": `What's up, ${name}! It's good to see you. 😎`,
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
        "text": "I recently graduated from UC Davis, majored in C.S. with an econ minor. I am seeking a full-time position role in software engineering, espcially interested in full-stack, machine learning and blockchain!"
    },
    get_started:
    {
        "text": "To begin, say hi!"
    },
    quick_reply_talk:
    {
        "text": "Cool! I am a great listener. What would you like to talk about?",
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
                        "title": "Hire me!",
                        "subtitle": "Select an option!",
                        "image_url": "https://raw.githubusercontent.com/preston4896/preston4896.github.io/master/assets/headshot.png",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quick Summary",
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
    out_of_scope: function(name, message)
    {
        return {
            "text": `Hey, ${name}. As much as I love to discuss "${message}" with you. I am not the perfect bot yet. Maybe you should talk to human Preston Ong!`,
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
    }
}