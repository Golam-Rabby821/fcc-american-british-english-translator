const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

// chai-http is ESM-only in newer releases; fall back to .default when required via CommonJS
const chaiHttpPlugin = chaiHttp.default || chaiHttp;
chai.use(chaiHttpPlugin);
const request = chaiHttp.request;

const localeAB = "american-to-british";

suite("Functional Tests", () => {
	// #1
	test("Translation with text and locale fields: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ text: "Mangoes are my favorite fruit.", locale: localeAB })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, {
					text: "Mangoes are my favorite fruit.",
					translation:
						'Mangoes are my <span class="highlight">favourite</span> fruit.',
				});
				done();
			});
	});

	// #2
	test("Translation with text and invalid locale field: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ text: "Mangoes are my favorite fruit.", locale: "invalid-locale" })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, { error: "Invalid value for locale field" });
				done();
			});
	});

	// #3
	test("Translation with missing text field: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ locale: localeAB })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, { error: "Required field(s) missing" });
				done();
			});
	});

	// #4
	test("Translation with missing locale field: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ text: "Mangoes are my favorite fruit." })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, { error: "Required field(s) missing" });
				done();
			});
	});

	// #5
	test("Translation with empty text: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ text: "", locale: localeAB })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, { error: "No text to translate" });
				done();
			});
	});

	// #6
	test("Translation with text that needs no translation: POST /api/translate", function (done) {
		request
			.execute(server)
			.post("/api/translate")
			.send({ text: "Hello world.", locale: localeAB })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.status, 200);
				assert.deepEqual(res.body, {
					text: "Hello world.",
					translation: "Everything looks good to me!",
				});
				done();
			});
	});
});
