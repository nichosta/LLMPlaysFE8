# AGENTS.md

# Repository Guidelines

This repository integrates an LLM-driven agent with the mGBA emulator to control Fire Emblem: The Sacred Stones via HTTP and Lua. Follow these conventions to contribute effectively.

## Project Structure & Module Organization
- `gamestate/emulator/`: Memory I/O modules (`httpMemoryReader.js`, `httpMemoryWriter.js`). Base URL: `http://localhost:5000/core`.
- `tools/`: Interaction utilities (`buttonPress.js` for GBA inputs).
- `agent.js`: LLM driver and game loop; requires `OPENROUTER_API_KEY`.
- `constants.js`: API config, timing, prompts, game constants.
- `extra/`: ROM/Lua integration files (gitignored). Do not commit ROMs.

## Build, Test, and Development Commands
- Prereqs: Node.js 18+, mGBA with HTTP server enabled; ports `5000` (HTTP) and `8888` (socket) available.
- Install deps (for `agent.js`): `npm i node-fetch`.
- Run agent loop: `node agent.js`.
- Local dev tip: use `node --watch agent.js` or `npx nodemon agent.js` during iterations.

## Coding Style & Naming Conventions
- Language: modern JS with ES modules (`export`/`import`), async/await only.
- Indentation: 2 spaces; max line ~100 chars; trailing commas where valid.
- Naming: `lowerCamelCase` for files and functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants.
- Domain rules: memory addresses are hex (prefix `0x`); chunk reads ≤ 1024 bytes; button sequence delay ~500ms.

## Testing Guidelines
- No test suite yet. Add unit tests under `tests/` using Vitest or Jest.
- Mock HTTP with `nock` or `undici` mock. Example run (once configured): `npx vitest`.
- Name tests `<module>.test.js`; cover error paths for HTTP failures and chunking.

## Commit & Pull Request Guidelines
- Commits: short, imperative subject (e.g., “Add FE8 memory read helpers”); group related changes.
- PRs: include description, linked issues, setup/verification steps, and screenshots/logs where relevant.
- Checklist: preserve sequential HTTP behavior (no parallel requests), respect timing constants, document new memory addresses and endpoints in code comments.

## Architecture & Configuration Tips
- mGBA Lua bridge handles button queueing (~15 frames). Avoid overlapping requests; the server is synchronous.
- Keep secrets local; set `OPENROUTER_API_KEY` in your environment, not in code.
