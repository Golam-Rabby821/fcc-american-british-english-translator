'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body || {};

      if (text === undefined || locale === undefined) {
        return res.send({ error: 'Required field(s) missing' });
      }

      if (text === '') {
        return res.send({ error: 'No text to translate' });
      }

      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.send({ error: 'Invalid value for locale field' });
      }

      const translation = translator.translate(text, locale);
      console.log("Translation: ", translation)

      return res.send({ text, translation });
    });
};
