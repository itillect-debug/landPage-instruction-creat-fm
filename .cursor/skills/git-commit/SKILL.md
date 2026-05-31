---
name: git-commit
description: Generate a Conventional Commits message and commit approved changes. Use when the user has explicitly approved the result of an iteration and it is time to commit.
disable-model-invocation: true
---

# Git Commit

## Pre-conditions

Before committing:
- [ ] User has explicitly approved the result
- [ ] All files are saved
- [ ] Feature spec updated if this is a feature change (`docs/specs/[feature].md`)

## Commit Message Format

```
<type>[optional scope]: <short description>

[optional body — only if non-obvious context is needed]
```

Types: `feat` / `fix` / `chore` / `docs` / `refactor` / `test`

Scope: feature or module name, lowercase, hyphenated.

## Examples by Role

```bash
# DB Architect
git commit -m "feat(sales): add sale schema and OpenAPI contract"
git commit -m "docs: update spec — sales-calculator"

# Backend Dev
git commit -m "feat(sales): implement POST /api/v1/sales route"
git commit -m "fix(sales): correct aggregation for monthly totals"

# Frontend Dev
git commit -m "feat(sales): add SalesCalculator component"
git commit -m "fix(currency-input): prevent float on kopeck conversion"

# QA
git commit -m "test(sales): add unit tests for margin calculation"

# Rules update
git commit -m "docs: update rules — zero-value edge case in calculator"

# Spec update (alongside code)
git commit -m "feat(expenses): add expense tracker — closes spec"
```

## Commit Command

```bash
git add .
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>
EOF
)"
```

## After Commit

Update the Change Log table in `docs/specs/[feature-name].md` with the date and commit message.
