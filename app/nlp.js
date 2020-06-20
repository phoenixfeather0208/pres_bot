// debug
const util = require("util");

var confidence_threshold = 0.8;

/**
 * NLP handler. Returns traits and entities.
 * @param {Object} nlp : NLP object generated from wit.ai
 */
function nlpHandler(nlp) {
    NLP = nlp && nlp.entities && nlp.traits;
    return NLP;
}

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

    // iterate NLP object to check for traits.
    for (let key in nlp_entities) {
        // greet the user.
        if ((key == "wit$greetings") && (checkConfidence(nlp_entities[key]))) {
            return {
                "text": `Hello, ${user.first_name}! My favorite human! How is it going? :)`
            }
        }

        // TODO: add more response to different traits. Training needed.
    }

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

exports.nlpHandler = nlpHandler;
exports.response = responseHandler;