/// <reference path="../node_modules/@types/node/index.d.ts"/>
/// <reference path="../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import * as lexicon from "../src/index";

describe('Basic tests', function () {
	it('Lexicon is an object', function () {
		assert.equal(typeof lexicon,"object");
	});
	it('Lexicon JSON is an object', function () {
		assert.equal(typeof lexicon.lexicon,"object");
	});
	it('Extend is a function', function () {
		assert.equal(typeof lexicon.extend,"function");
	});
	it('word count', function () {
		const count = Object.keys(lexicon.lexicon).length;
		(this as any).test.title = `There is ${count} words in the lexicon`;
		assert.equal(count>=100000,true);
	});
});

describe('Test lexicon object', function () {
	it('Get word pos tags', function () {
		assert.equal(typeof lexicon.lexicon["show"],"string");
		assert.equal(lexicon.lexicon["objective"],"NN|JJ");
	});
});


describe('Extensibility', function () {
	var newTerms = {
		"indoor-derelocate":"VBP|VB",
		"small-defeather-margined":"JJ"
	};

	lexicon.extend(newTerms);

	it('Test new entries', function () {
		assert.equal(lexicon.lexicon["indoor-derelocate"],"VBP|VB");
		assert.equal(lexicon.lexicon["small-defeather-margined"],"JJ");
	});

	it('conjugated verbs', function () {
		assert.equal(lexicon.lexicon["indoor-derelocated"],"VBD|VBN");
	});
});