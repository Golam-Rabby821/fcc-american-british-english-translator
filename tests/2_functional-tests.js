const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

// chai-http is ESM-only in newer releases; fall back to .default when required via CommonJS
const chaiHttpPlugin = chaiHttp.default || chaiHttp;
chai.use(chaiHttpPlugin);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

});
