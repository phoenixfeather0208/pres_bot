"strict mode";

// debug
const util = require("util");

var confidence_threshold = 0.8;

/**
 * A comprehensive method to determine the bot's responses based on the entities of the user's message.
 * @param {Object} nlp_entities : entities recognized.
 * @param {string} message : user-input message
 * @param {Object} user : UserProfile API body object.
 * @returns {Object} text response
 */
function responseHandler(nlp_entities, message, user) {
    // debug
    console.log("NLP API returned: \n", util.inspect(nlp_entities, false, null, true /* enable colors */));

    // Step 1: Variables to store entities and traits.
    let intent = nlp_entities.intents;
    let traits = [];
    let entities = [];

    // Step 2: Fetch traits.
    for (let keys in nlp_entities.traits) {
        traits.push(nlp_entities.traits[keys]);
    }

    // Step 3: Fetch entities.
    for (let keys in nlp_entities.entities) {
        entities.push(nlp_entities.entities[keys]);
    }

    // Step 4: Respond appropriately based on intent.
    if ((intent.length > 0) && (intent[0].confidence >= confidence_threshold)) {
        let acceptableName = ["preston", "preston ong", "presbot", "preston ong liat sheng", "preston liat sheng ong", "王列聖", "王列圣", "列聖", "列圣"];

        // check name first.
        if ((entities.length != 0) && (entities.includes(nlp_entities.entities["name:name"]))) {
            // check name
            let name = nlp_entities.entities["name:name"][0].body.toLowerCase();
            console.log("Verify input name: " + name);
            if (!acceptableName.includes(name)) {
                console.log("Wrong name!");
                return {
                    "text": "Lmao! Do you even know my name? Let's try this again. :P"
                }
            }
        }

        // name accepted.
        // greet the users
        if (intent[0].name == "greet") {
            let greetTrait = nlp_entities.traits["wit$greetings"];
            if ((traits.includes(greetTrait)) && checkConfidence(greetTrait)) {
                return {
                    "text": `What's up, ${user.first_name}! It's good to see you. 😎`,
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

        else if (intent[0].name == "bye") {
            return {
                "text": "Ok. Goodbye! 👋"
            }
        }

        else if ((intent[0].name == "compliment")) {
            return {
                "text": "Thanks! You are awesome too! :)"
            }
        }

        // TODO
    }

    // out-of-scope message.
    else return {
        "text": `Hey, ${user.first_name}. As much as I love to discuss "${message}" with you. I am not the perfect bot yet. Maybe you should talk to human Preston Ong!`,
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

/**
 * This function checks if the trait meets confidence threshold.
 * @param {Object} key : wit.ai traits or entities
 */
function checkConfidence(key) {
    if (key[0].confidence >= confidence_threshold) {
        return true;
    }
    else return false;
}

exports.response = responseHandler;