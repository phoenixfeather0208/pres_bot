// debug
const util = require("util");

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
 * @returns {Object} text response
 */
function responseHandler(nlp_entities, message) {
    // debug
    console.log("NLP API returned: \n", util.inspect(nlp_entities, false, null, true /* enable colors */));
    // unrecognized input.
    if (Object.keys(nlp_entities).length === 0) {
        return {
            "text": `You sent me a message: ${message}. Send me more messages or an image!`
        }
    }
    
    // respond to greetings.
    else if (nlp_entities["wit$greetings"][0].confidence >= 0.8) {
        return {
            "text": "Hello, my favorite human! How is it going?"
        }
    }
}

exports.nlpHandler = nlpHandler;
exports.response = responseHandler;