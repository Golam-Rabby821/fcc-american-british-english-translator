const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

function invertMap(map) {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function preserveCase(source, replacement) {
  if (!source) return replacement;
  if (source[0] === source[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

const highlight = (value) => `<span class="highlight">${value}</span>`;
const britishToAmericanSpelling = invertMap(americanToBritishSpelling);
const britishToAmericanTitles = invertMap(americanToBritishTitles);
const americanToBritishTerms = { ...americanOnly, ...americanToBritishSpelling };
const britishToAmericanTerms = { ...britishOnly, ...britishToAmericanSpelling };

class Translator {
  translate(text, locale) {
    let translation = text;
    let changed = false;

    if (locale === "american-to-british") {
      const titleResult = this.translateTitles(translation, americanToBritishTitles);
      translation = titleResult.text;
      changed = changed || titleResult.changed;

      const timeResult = this.translateTime(translation, locale);
      translation = timeResult.text;
      changed = changed || timeResult.changed;

      const termResult = this.translateTerms(translation, americanToBritishTerms);
      translation = termResult.text;
      changed = changed || termResult.changed;
    } else if (locale === "british-to-american") {
      const titleResult = this.translateTitles(translation, britishToAmericanTitles);
      translation = titleResult.text;
      changed = changed || titleResult.changed;

      const timeResult = this.translateTime(translation, locale);
      translation = timeResult.text;
      changed = changed || timeResult.changed;

      const termResult = this.translateTerms(translation, britishToAmericanTerms);
      translation = termResult.text;
      changed = changed || termResult.changed;
    } else {
      return null;
    }

    if (!changed) {
      return "Everything looks good to me!";
    }

    return translation;
  }

  translateTerms(text, termsMap) {
    let translated = text;
    let changed = false;

    const entries = Object.entries(termsMap).sort((a, b) => b[0].length - a[0].length);

    for (const [from, to] of entries) {
      const regex = new RegExp(`\\b${escapeRegex(from)}\\b`, "gi");
      translated = translated.replace(regex, (match) => {
        changed = true;
        return highlight(preserveCase(match, to));
      });
    }

    return { text: translated, changed };
  }

  translateTitles(text, titlesMap) {
    let translated = text;
    let changed = false;

    const entries = Object.entries(titlesMap);

    for (const [from, to] of entries) {
      const regex = new RegExp(`\\b${escapeRegex(from)}(?=\\s|$)`, "gi");
      translated = translated.replace(regex, (match) => {
        changed = true;
        return highlight(preserveCase(match, to));
      });
    }

    return { text: translated, changed };
  }

  translateTime(text, locale) {
    let translated = text;
    let changed = false;

    if (locale === "american-to-british") {
      translated = translated.replace(/\b(\d{1,2}):(\d{2})\b/g, (_, hours, minutes) => {
        changed = true;
        return highlight(`${hours}.${minutes}`);
      });
    } else if (locale === "british-to-american") {
      translated = translated.replace(/\b(\d{1,2})\.(\d{2})\b/g, (_, hours, minutes) => {
        changed = true;
        return highlight(`${hours}:${minutes}`);
      });
    }

    return { text: translated, changed };
  }
}

module.exports = Translator;
