import inflectors = require("en-inflectors");
const Inflectors = inflectors.Inflectors;
import JSONL from './lexicon';
import {LexiconType as LexiconType} from "./lexicon";

const lexicon = {
	lexicon:JSONL,
	extend:function(terms:LexiconType):undefined{
		if(typeof terms !== "object" || terms === null) {
			console.warn("You must pass an object to extend the lexicon");
			return;
		}
		for(let term in terms) {
			if(!terms.hasOwnProperty(term)) continue;
			if(!terms[term]) continue;

			if(~terms[term].split("|").indexOf("VB")||~terms[term].split("|").indexOf("VBP")) {
				let VBZ = new Inflectors(term).conjugate("VBZ");
				let VBD = new Inflectors(term).conjugate("VBD");
				let VBN = new Inflectors(term).conjugate("VBN");
				let VBG = new Inflectors(term).conjugate("VBG");
				
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
		for (let newEntry in terms) {lexicon.lexicon[newEntry] = terms[newEntry];}
	}
};

export {lexicon}