# American / British English Translator

Small Express API that translates text between American and British English using the provided word lists and title/time rules from freeCodeCamp’s Quality Assurance certification project.

## How it works
- Translation is driven entirely by the supplied dictionaries in `components/` (american-only, british-only, american-to-british-spelling, american-to-british-titles). Only words/phrases in those lists (plus time/title patterns) are translated.
- Titles are converted and highlighted (e.g., `Mr.` → `Mr`, `Dr.` → `Dr` for American→British).
- Times convert `10:30` ⇄ `10.30` depending on locale.
- Any translated term is wrapped in `<span class="highlight">...</span>`. If nothing changes, the response says `Everything looks good to me!`.

## API
- `POST /api/translate`
  - Body: `{ "text": "some text", "locale": "american-to-british" | "british-to-american" }`
  - Responses:
    - `{ text, translation }` on success
    - `{ error: "Required field(s) missing" }` if `text` or `locale` is absent
    - `{ error: "No text to translate" }` if `text` is empty
    - `{ error: "Invalid value for locale field" }` if locale is invalid

## Running
- Install: `npm install`
- Start dev server: `npm run dev`
- Start server: `npm start`

## Tests
- Set `NODE_ENV=test` in `.env`.
- Run all tests: `npm test` (runs mocha in watch mode). If you want a single run: `npx mocha --timeout 5000 --require @babel/register --recursive --exit --ui tdd tests/`.

## Notes
- The translator does exact, word-boundary matches; punctuation/capitalization are handled via the maps and simple case-preservation, but only known terms are changed.
