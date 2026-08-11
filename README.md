# Mobile UI Playground

A mobile-style profile card UI that you can restyle in real time using natural language — type something like *"make it dark"* or *"use a blue theme"* and watch the interface update instantly.

Built with **React**, **Vite**, and **Tailwind CSS**, with optional AI-powered command interpretation via the **Hugging Face Inference API**.

## How it works

- Type a natural-language styling command into the input bar (e.g. *"dark mode"*, *"rounded corners"*, *"blue theme"*).
- The app first tries to interpret the command with a keyword-based pattern matcher (`src/services/mockResponses.js`) — fast, free, works offline.
- If a valid Hugging Face API key is configured, it can also route commands through the Hugging Face Inference API (`src/services/huggingface.js`) for more flexible interpretation, with automatic fallback to the pattern matcher if the API call fails.
- Changes apply instantly to a live profile card preview, with smooth transitions via Framer Motion.

## Features

- **Natural language UI theming** — describe a style change in plain English.
- **Undo / redo command history** (`useCommandHistory` hook).
- **Config export/import** — save your current UI state as JSON and reload it later (`useConfigExport` hook).
- **Randomize** — generate a random theme combination.
- **Animated transitions** — powered by Framer Motion (`AdvancedAnimations.jsx`).
- **Works with or without an API key** — falls back to local pattern matching if no Hugging Face key is set.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | lucide-react |
| Optional AI | Hugging Face Inference API (via `axios`) |

## Project structure

```
src/
├── App.jsx                      # Main app shell
├── components/
│   ├── Layout.jsx                  # Page layout wrapper
│   ├── Header.jsx                    # Top header bar
│   ├── ProfileCard.jsx                 # The themeable mobile profile card
│   ├── EnhancedInputBar.jsx              # Command input with history/suggestions
│   ├── InputBar.jsx                        # Simpler input bar variant
│   ├── StatusMessage.jsx                     # Feedback/status banner
│   └── AdvancedAnimations.jsx                  # Reusable animation components
├── hooks/
│   ├── useEnhancedUIState.js                     # Core UI state + apply/undo/redo/export logic
│   ├── useUIState.js                               # Simpler UI state variant
│   ├── useCommandHistory.js                          # Undo/redo history tracking
│   └── useConfigExport.js                              # JSON export/import of UI config
├── services/
│   ├── huggingface.js                                    # Hugging Face Inference API client
│   ├── openai.js                                           # AI processing orchestration/status helpers
│   └── mockResponses.js                                      # Local keyword-based pattern matcher (no API needed)
└── utils/
    └── promptProcessor.js                                        # Decides AI vs. local processing, with fallback
```

## Getting started

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone <this-repo-url>
cd Mobile-UI-Playground

# Install dependencies
npm install

# Configure environment (optional — app works without an API key)
cp .env.example .env

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Environment variables

| Variable | Description |
|---|---|
| `VITE_HUGGINGFACE_API_KEY` | Optional. A Hugging Face access token (starts with `hf_`). Without it, the app still works fully using local pattern matching. |
| `VITE_HUGGINGFACE_MODEL` | Hugging Face model to use for command interpretation (defaults to `microsoft/DialoGPT-medium`). |
| `VITE_APP_NAME` | Display name shown in the app. |
| `VITE_APP_VERSION` | App version string. |
| `VITE_DEBUG_MODE` | Set to `true` for extra console logging during development. |

> ⚠️ Never commit a `.env` file with a real API key. Only `.env.example` (placeholder values) belongs in the repository.

## Known limitations

- No automated test suite yet.
- The `services/openai.js` filename is a bit of a misnomer — it currently orchestrates the Hugging Face integration and processing status, not an OpenAI API call.

## License

MIT — see [LICENSE](LICENSE).
