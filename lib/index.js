var JSONL = require("./lexicon.json");
const inflectors = require('en-inflectors');
const lexicon = {
	lexicon:JSONL,


	/**
	 * Extension function should be given
	 * an object where the key is the word
	 * and the value can be a String (POS tag)
	 * or an object:
	 * pos:"VB",
	 * synonyms:["something"],
	 * 
	**/
	extend:function(terms,a,b,c){
		if(typeof terms !== "object" || terms === null) {
			console.warn("You must pass an object to extend the lexicon");
			return;
		}
		for(var term in terms) {
			if(!terms.hasOwnProperty(term)) continue;
			if(!terms[term]) continue;

			if(~terms[term].split("|").indexOf("VB")||~terms[term].split("|").indexOf("VBP")) {
				var VBZ = inflectors.conjugate(term,"VBZ");
				var VBD = inflectors.conjugate(term,"VBD");
				var VBN = inflectors.conjugate(term,"VBN");
				var VBG = inflectors.conjugate(term,"VBG");
				
				if(!terms[VBZ]) terms[VBZ] = "VBZ";
				else terms[VBZ] = terms[VBZ] + "|" + "VBZ";

				if(!terms[VBD]) terms[VBD] = "VBD";
				else terms[VBD] = terms[VBD] + "|" + "VBD";

				if(!terms[VBN]) terms[VBN] = "VBN";
				else terms[VBN] = terms[VBN] + "|" + "VBN";

				if(!terms[VBG]) terms[VBG] = "VBG";
				else terms[VBG] = terms[VBG] + "|" + "VBG";
			}
		}
		JSONL = Object.assign(JSONL,terms);
	}
};

module.exports = lexicon;