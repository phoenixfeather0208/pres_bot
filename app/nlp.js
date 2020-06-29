"strict mode";

// debug
const util = require("util");
const responses = require("./responses");
const index = require("./index");

var confidence_threshold = 0.8;

/**
 * A comprehensive method to determine the bot's responses based on the entities of the user's message.
 * @param {Object} nlp_entities : entities recognized.
 * @param {string} message : user-input message
 * @param {Object} user : UserProfile API body object.
 * @returns {Object} text response
 */
function responseHandler(nlp_entities, message, user) {
    // // debug
    // console.log("NLP API returned: \n", util.inspect(nlp_entities, false, null, true /* enable colors */));

    // error detection from wit.ai
    if (nlp_entities.errors) {
        callSendAPI(user.id, response.report_error, false);
    }

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

    // console.log("Entities: \n", util.inspect(nlp_entities, false, null, true /* enable colors */))

    // Step 4: Respond appropriately based on intent.
    if ((intent.length > 0) && (intent[0].confidence >= confidence_threshold)) {
        let acceptableName = ["preston", "preston ong", "presbot", "preston ong liat sheng", "preston liat sheng ong", "王列聖", "王列圣", "列聖", "列圣" ,"bro", "dude", "man", "chinito", "you", "ongo"];

        // check name first.
        if ((entities.length != 0) && (entities.includes(nlp_entities.entities["name:name"]))) {
            let name = nlp_entities.entities["name:name"][0].body.toLowerCase();

            // ignore intent when incorrect name detected.
            if (!acceptableName.includes(name)) {
                console.log("Wrong name!");
                return responses.wrongName;
            }
        }

        // name accepted.
        // greet the users
        if (intent[0].name == "greet") {
            return responses.greeting(user.first_name);
        }

        // users said bye.
        else if (intent[0].name == "bye") {
            return responses.bye;
        }

        // getting compliments
        else if ((intent[0].name == "compliment")) {
            return responses.compliment;
        }

        else if ((intent[0].name == "talk")) {
            return responses.quick_reply_talk;
        }

        else if ((intent[0].name == "smile")) {
            return responses.smile;
        }

        else if ((intent[0].name == "intro")) {
            return responses.quick_reply_intro;
        }

        else if ((intent[0].name == "hire")) {
            return responses.quick_reply_hire;
        }
        else if (intent[0].name == "insult") {
            return responses.insult;
        }
        else if (intent[0].name == "user") {
            return responses.user_talk;
        }
        else if (intent[0].name == "source") {
            return responses.contribute;
        }

        // detect user's story
        else if (intent[0].name == "story") {
            if (((entities.length > 0) || (traits.length > 0)) && ((checkConfidence(traits[0])))) {
                let story_response;
                if ((traits[0][0].value == "positive") || (entities[0][0].role == "positive")) {
                    story_response = index.randomOutput(responses.story_positive);
                }

                else if ((traits[0][0].value == "negative") || (entities[0][0].role == "negative")) {
                    story_response = index.randomOutput(responses.story_negative);
                }
                return story_response;
            }

            else {
                return responses.story_neutral;
            }
        }

        else if (intent[0].name == "disagreement") {
            return responses.sad;
        }

        else if (intent[0].name == "meme") {
            return responses.meme();
        }

        else if (intent[0].name == "interest") {
            return responses.preston_details.interest(user);
        }

        else if ((intent[0].name == "url")) {
            if ((nlp_entities.entities["personal:socialMedia"] !== undefined)) {
                let requestedSite = nlp_entities.entities["personal:socialMedia"][0].value.toLowerCase();
                // console.log("requested site: " + requestedSite);
                return responses.preston_details.url(requestedSite);
            }
            else return responses.out_of_scope(user.first_name, message);
        }
    }

    // out-of-scope message.
    else return responses.out_of_scope(user.first_name, message);
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