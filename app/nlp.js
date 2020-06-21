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
    let traits = [];

    // Step 2: Fetch.
    for (let keys in nlp_entities.traits) {
        traits.push(nlp_entities.traits[keys]);
    }

    // greet the users
    if (nlp_entities.intents[0].name == "greet") {
        let greetTraits = nlp_entities.traits["wit$greetings"];
        if ((traits.includes(greetTraits)) && checkConfidence(greetTraits)) {  
            return {
                "text": `Hello, ${user.first_name}! My favorite human! How is it going? :)`
            }
        }
    }

    // TODO: add more response to different traits. Training needed.

    // out-of-scope message.
    return {
        "text": `${user.first_name}, you sent me a message: "${message}". Send me more messages or an image!`
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