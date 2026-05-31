---
name: task-decomposition
description: Decomposes incoming tasks into a high-level plan, assigns roles, and creates or updates a living markdown specification in docs/specs/. Use when a new feature or task is received, or when an existing feature is being modified.
---

# Task Decomposition

## Step 1 — Identify task type and roles

| Task type | Roles involved |
|-----------|---------------|
| UI only | Frontend Dev → QA |
| Full feature (API + UI) | DB Architect → Backend Dev → Frontend Dev → QA |
| Data/schema change | DB Architect → Backend Dev → QA |
| Bug fix | Identify affected role → fix → QA |

## Step 2 — Check for a better approach

Before presenting the plan, consider whether a simpler or more optimal approach exists.
If yes, propose it:
> "Alternative: [approach] — [reason: simpler / better performance / less code]. Proceed with original or switch?"

Wait for user choice.

## Step 3 — Present the plan (inline, brief)

```
Plan:
1. [Role] — [one sentence: what will be done]
2. [Role] — [one sentence] (requires: step 1)
3. ...
```

Wait for explicit user confirmation before starting any work.

## Step 4 — Create or update the feature spec

**On new task** → create `docs/specs/[feature-name].md` using the template below.
**On modification of existing feature** → update the existing spec: add to Change Log, update Files and Decisions sections as needed.

Spec file name: lowercase, hyphenated, matches the feature folder name.
Example: `docs/specs/sales-calculator.md`

## Spec Template

```markdown
# [Feature Name]

## Status
`planned` | `in-progress` | `done`

## Task
[Original task description as given by the user]

## Plan
1. [Role] — [what]
2. [Role] — [what] (requires: 1)

## Roles & Output
| Role | Deliverable | Status |
|------|-------------|--------|
| DB Architect | Schema + OpenAPI contract | [ ] |
| Backend Dev | Routes + business logic | [ ] |
| Frontend Dev | Vue components + store | [ ] |
| QA | Unit/integration tests | [ ] |

## API Contract
> Link or inline summary after DB Architect completes their step.

## Files
> Populated as work progresses. Each role adds their files when done.
- `path/to/file.ts` — description

## Decisions
> Record any non-obvious choices made during implementation.
- [decision]: [rationale]

## Edge Cases Found
> Record edge cases discovered during work and how they were resolved.
- [edge case]: [resolution]

## Change Log
| Date | Change | Commit |
|------|--------|--------|
| YYYY-MM-DD | Initial implementation | `feat(...): ...` |
```

## Step 5 — Keep spec alive

- After each sub-role completes their work: update the Files table and mark role status as done
- After each edge case: add to Edge Cases section
- After any future modification to this feature: add a row to Change Log and update affected sections
- Commit spec updates together with the code change: `docs: update spec — [feature-name]`
