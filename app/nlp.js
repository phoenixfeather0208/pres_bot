/**
 * NLP helper function.
 * @param {Object} nlp 
 * @param {string} name 
 */
function nlpHandler(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}



exports.nlpHandler = nlpHandler;