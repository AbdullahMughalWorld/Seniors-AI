# Seniors Ai — Gemini Edition

Seniors Ai is your existing single-page chat interface, connected to Google Gemini through a secure Vercel serverless function. The existing layout, themes, assistant modes, prompt inspector, chat history UI, and local browser storage are preserved.

## What changed

- Replaced the original Claude-artifact-only `claude.use('sample')` integration.
- Connected the existing chat flow to the same-origin `/api/chat` endpoint.
- Added a Vercel serverless backend at `api/chat.js`.
- Added multi-turn conversation history and the existing assistant system instructions to Gemini requests.
- Kept the Gemini API key on the server using `GEMINI_API_KEY`.
- Added clear error messages when the API key is missing, quota is reached, or the API request fails.

## Project structure

```text
Seniors-AI-Gemini/
├── api/
│   └── chat.js
├── index.html
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 1. Create a Gemini API key

1. Open [Google AI Studio API keys](https://aistudio.google.com/app/apikey).
2. Sign in and create an API key.
3. Copy it somewhere private. Do not paste it into `index.html`, `api/chat.js`, GitHub, or a public message.

Check Google's current Gemini API documentation for model availability, quotas, and pricing.

## 2. Deploy this folder to Vercel

1. Upload the contents of this project folder to a new GitHub repository, or replace the contents of your existing `Seniors-AI` repository with these files.
2. In Vercel, choose **Add New → Project** and import that GitHub repository.
3. Choose **Other** as the framework preset.
4. Keep the project root as `./`.
5. Do not add a build command. Leave the output directory unset/blank so Vercel can serve the root `index.html` and detect the `api/` function.
6. Deploy.

The project needs to be hosted on Vercel for `/api/chat` to work. A GitHub Pages deployment will only serve the static frontend and cannot run this backend function.

## 3. Add the API key to Vercel

1. Open your Vercel project.
2. Go to **Settings → Environment Variables**.
3. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Google AI Studio API key
   - **Environments:** Production (and Preview/Development if you need them)
4. Save the variable.
5. Redeploy the project. Environment variable changes apply to new deployments.

Never expose the API key in browser JavaScript or commit a real `.env` file.

## 4. Test

1. Open the Vercel deployment URL, not the GitHub Pages URL.
2. Start a new conversation and ask a question such as: `Explain machine learning in simple words.`
3. Ask a follow-up question to test conversation context.
4. Try General, Coding, Study, and Writing modes.
5. If an error appears, open **Vercel → Project → Logs / Functions** and inspect the `/api/chat` function.

## Local development (optional)

Requires Node.js and the Vercel CLI.

```bash
npm install -g vercel
vercel dev
```

Create a local `.env` file containing:

```env
GEMINI_API_KEY=your_private_key_here
```

Do not commit `.env`. The `.gitignore` file already excludes it.

## Important notes

- This is a starter implementation. It does not include user accounts, a cloud database, cross-device chat sync, or file/image upload yet. Existing conversations remain in browser `localStorage`.
- The function has basic input validation, but a public production chatbot should add durable rate limiting, abuse protection, and appropriate usage limits before sharing widely.
- Gemini usage may be subject to quotas and charges depending on your Google AI Studio account and current plan.
- Model availability and quotas can change. The backend currently requests `gemini-3.8-flash`, the stable Gemini Flash model listed in Google's current model documentation. Update the model ID in `api/chat.js` if Google changes its availability.
- Never share your API key with anyone, including in screenshots.

## Official documentation

- [Google Gen AI JavaScript SDK / Gemini docs](https://googleapis.github.io/js-genai/)
- [Gemini API generate content](https://ai.google.dev/api/generate-content)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
