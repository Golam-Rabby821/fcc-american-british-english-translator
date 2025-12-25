const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

const translator = new Translator();

const localeAB = "american-to-british";
const localeBA = "british-to-american";

suite("Unit Tests", () => {
	// #1
	test("Translate 'Mangoes are my favorite fruit.' to British English", function () {
		assert.strictEqual(
			`Mangoes are my <span class="highlight">favourite</span> fruit.`,
			translator.translate("Mangoes are my favorite fruit.", localeAB),
		);
	});

	// #2
	test("Translate 'I ate yogurt for breakfast.' to British English", function () {
		assert.strictEqual(
			`I ate <span class="highlight">yoghurt</span> for breakfast.`,
			translator.translate("I ate yogurt for breakfast.", localeAB),
		);
	});

	// #3
	test("Translate 'We had a party at my friend's condo.' to British English", function () {
		assert.strictEqual(
			`We had a party at my friend's <span class="highlight">flat</span>.`,
			translator.translate("We had a party at my friend's condo.", localeAB),
		);
	});

	// #4
	test("Translate 'Can you toss this in the trashcan for me?' to British English", function () {
		assert.strictEqual(
			`Can you toss this in the <span class="highlight">bin</span> for me?`,
			translator.translate(
				"Can you toss this in the trashcan for me?",
				localeAB,
			),
		);
	});

	// #5
	test("Translate 'The parking lot was full.' to British English", function () {
		assert.strictEqual(
			`The <span class="highlight">car park</span> was full.`,
			translator.translate("The parking lot was full.", localeAB),
		);
	});

	// #6
	test("Translate 'Like a high tech Rube Goldberg machine.' to British English", function () {
		assert.strictEqual(
			`Like a high tech <span class="highlight">Heath Robinson device</span>.`,
			translator.translate("Like a high tech Rube Goldberg machine.", localeAB),
		);
	});

	// #7
	test("Translate 'To play hooky means to skip class or work.' to British English", function () {
		assert.strictEqual(
			`To <span class="highlight">bunk off</span> means to skip class or work.`,
			translator.translate(
				"To play hooky means to skip class or work.",
				localeAB,
			),
		);
	});

	// #8
	test("Translate 'No Mr. Bond, I expect you to die.' to British English", function () {
		assert.strictEqual(
			`No <span class="highlight">Mr</span> Bond, I expect you to die.`,
			translator.translate("No Mr. Bond, I expect you to die.", localeAB),
		);
	});

	// #9
	test("Translate 'Dr. Grosh will see you now.' to British English", function () {
		assert.strictEqual(
			`<span class="highlight">Dr</span> Grosh will see you now.`,
			translator.translate("Dr. Grosh will see you now.", localeAB),
		);
	});

	// #10
	test("Translate 'Lunch is at 12:15 today.' to British English", function () {
		assert.strictEqual(
			`Lunch is at <span class="highlight">12.15</span> today.`,
			translator.translate("Lunch is at 12:15 today.", localeAB),
		);
	});

	// #11
	test("Translate 'We watched the footie match for a while.' to American English", function () {
		assert.strictEqual(
			`We watched the <span class="highlight">soccer</span> match for a while.`,
			translator.translate(
				"We watched the footie match for a while.",
				localeBA,
			),
		);
	});

	// #12
	test("Translate 'Paracetamol takes up to an hour to work.' to American English", function () {
		assert.strictEqual(
			`<span class="highlight">Tylenol</span> takes up to an hour to work.`,
			translator.translate(
				"Paracetamol takes up to an hour to work.",
				localeBA,
			),
		);
	});

	// #13
	test("Translate 'First, caramelise the onions.' to American English", function () {
		assert.strictEqual(
			`First, <span class="highlight">caramelize</span> the onions.`,
			translator.translate("First, caramelise the onions.", localeBA),
		);
	});

	// #14
	test("Translate 'I spent the bank holiday at the funfair.' to American English", function () {
		assert.strictEqual(
			`I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`,
			translator.translate(
				"I spent the bank holiday at the funfair.",
				localeBA,
			),
		);
	});

	// #15
	test("Translate 'I had a bicky then went to the chippy.' to American English", function () {
		assert.strictEqual(
			`I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`,
			translator.translate("I had a bicky then went to the chippy.", localeBA),
		);
	});

	// #16
	test("Translate 'I've just got bits and bobs in my bum bag.' to American English", function () {
		assert.strictEqual(
			`I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`,
			translator.translate(
				"I've just got bits and bobs in my bum bag.",
				localeBA,
			),
		);
	});

	// #17
	test("Translate 'The car boot sale at Boxted Airfield was called off.' to American English", function () {
		assert.strictEqual(
			`The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`,
			translator.translate(
				"The car boot sale at Boxted Airfield was called off.",
				localeBA,
			),
		);
	});

	// #18
	test("Translate 'Have you met Mrs Kalyani?' to American English", function () {
		assert.strictEqual(
			`Have you met <span class="highlight">Mrs.</span> Kalyani?`,
			translator.translate("Have you met Mrs Kalyani?", localeBA),
		);
	});

	// #19
	test("Translate 'Prof Joyner of King's College, London.' to American English", function () {
		assert.strictEqual(
			`<span class="highlight">Prof.</span> Joyner of King's College, London.`,
			translator.translate("Prof Joyner of King's College, London.", localeBA),
		);
	});

	// #20
	test("Translate 'Tea time is usually around 4 or 4.30.' to American English", function () {
		assert.strictEqual(
			`Tea time is usually around 4 or <span class="highlight">4:30</span>.`,
			translator.translate("Tea time is usually around 4 or 4.30.", localeBA),
		);
	});

	// #21
	test("Highlight translation in 'Mangoes are my favorite fruit.'", function () {
		assert.include(
			translator.translate("Mangoes are my favorite fruit.", localeAB),
			`<span class="highlight">favourite</span>`,
		);
	});

	// #22
	test("Highlight translation in 'I ate yogurt for breakfast.'", function () {
		assert.include(
			translator.translate("I ate yogurt for breakfast.", localeAB),
			`<span class="highlight">yoghurt</span>`,
		);
	});

	// #23
	test("Highlight translation in 'We watched the footie match for a while.'", function () {
		assert.include(
			translator.translate("We watched the footie match for a while.", localeBA),
			`<span class="highlight">soccer</span>`,
		);
	});

	// #24
	test("Highlight translation in 'Paracetamol takes up to an hour to work.'", function () {
		assert.include(
			translator.translate("Paracetamol takes up to an hour to work.", localeBA),
			`<span class="highlight">Tylenol</span>`,
		);
	});
});
