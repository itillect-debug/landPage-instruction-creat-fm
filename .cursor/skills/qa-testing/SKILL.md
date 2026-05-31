---
name: qa-testing
description: Unit and integration test generation for financial business logic and API routes. Use when a feature implementation is complete and ready for testing. Focus: critical business logic only (calculations, API behavior, schema validation).
---

# QA Testing

## Scope

**Test**: financial calculations, API route behavior, Mongoose schema validation.
**Skip for now**: Vue component tests, E2E flows.

## Test File Location

```
server/features/[feature-name]/
  __tests__/
    [feature].service.test.ts    — business logic / calculation tests
    [feature].routes.test.ts     — API integration tests
```

## Financial Calculation Tests

Every calculation function must cover:

```typescript
describe('[functionName]', () => {
  it('returns correct result for normal input', () => {
    expect(calcMargin(100000, 60000)).toBe(40000) // kopecks
  })
  it('returns 0 when revenue is 0', () => {
    expect(calcMargin(0, 0)).toBe(0)
  })
  it('handles negative profit (loss)', () => {
    expect(calcMargin(50000, 80000)).toBe(-30000)
  })
  it('result is always an integer, never a float', () => {
    const result = calcMargin(100001, 33334)
    expect(Number.isInteger(result)).toBe(true)
  })
  it('handles large values without overflow', () => {
    expect(calcMargin(99999999900, 49999999900)).toBe(50000000000)
  })
})
```

## API Route Integration Tests

Use `mongodb-memory-server` — no external DB dependency:

```typescript
import Fastify from 'fastify'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod: MongoMemoryServer

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
})

describe('POST /api/v1/[feature]', () => {
  it('returns 201 with correct data shape', async () => { ... })
  it('returns 422 on invalid input', async () => { ... })
  it('returns 400 on missing required fields', async () => { ... })
})
```

## Bug Report Format

```
Bug: [short title]
Where: [feature / function / route]
Expected: [correct behavior]
Actual: [observed behavior]
Reproduce: [minimal input or steps]
Severity: critical | high | medium | low
```

## After Testing

- All tests pass → update `docs/specs/[feature-name].md` (mark QA row as done)
- Bugs found → file bug report, present to user before committing anything
- Commit: `test([feature]): add unit tests for [what]`
