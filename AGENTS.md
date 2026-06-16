# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
Despite the `README.md` / `.cursorrules` describing a full Vue + Fastify + MongoDB stack,
the actual code in this repository is a **frontend-only Vue 3 + Vite + TypeScript landing page**
(`fm-pro-landing`). There is no backend, database, or test suite present. The npm package
manager is used (`package-lock.json`).

### Services
- **Web (Vite dev server)** — the only service. Start with `npm run dev` (serves on
  `http://localhost:5173`). Standard scripts live in `package.json` (`dev`, `build`,
  `preview`, `typecheck`).

### Non-obvious notes
- There is **no lint script and no test script**; `package.json` only defines `dev`, `build`,
  `preview`, and `typecheck`. Type checking is `npm run typecheck` (`vue-tsc --noEmit`).
- `npm run build` runs `vue-tsc --noEmit && vite build`, so it fails if typecheck fails.
  As of this writing there is a **pre-existing typecheck error** in
  `src/components/sections/StageCard.vue` (unused `ArrowRight` import, TS6133) that makes
  `typecheck`/`build` fail. The `dev` server is unaffected because Vite does not run
  `vue-tsc`. Do not "fix" this as part of environment setup — it is a code issue.
- The UI text is in Russian. The contact form (`ContactSection.vue`) submit is UI-only
  (no backend wiring): a valid submission swaps the form for a success panel.
