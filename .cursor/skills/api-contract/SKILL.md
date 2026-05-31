---
name: api-contract
description: Generates Mongoose schemas and OpenAPI 3.1 contracts for a feature. Use when a new API endpoint or data model is needed. Output must be approved before any implementation begins.
---

# API Contract Generation

## Step 1 — Analyze requirements

Read the feature spec at `docs/specs/[feature-name].md`.
Identify: entities, relationships, operations (CRUD + any aggregations), financial fields.

## Step 2 — Draft Mongoose Schema

```typescript
import { Schema, model, InferSchemaType } from 'mongoose'

const [Name]Schema = new Schema({
  // Monetary fields: always integers in kopecks
  // Example:
  revenueKopecks: {
    type: Number,
    required: true,
    min: 0,
    // Stored as integer (kopecks × 100). Display: divide by 100.
  },
  // ...
}, { timestamps: true })

export type [Name] = InferSchemaType<typeof [Name]Schema>
export const [Name]Model = model('[Name]', [Name]Schema)
```

Rules:
- All monetary values stored as integers (kopecks). Document with JSDoc comment on every monetary field.
- Use `InferSchemaType` — no separate TypeScript interface
- Add indexes for all filterable and sortable fields

## Step 3 — Draft OpenAPI 3.1 contract

File location: `docs/api/[feature-name].yaml`

Minimum per endpoint:
- Path, method, summary
- Request body schema with field descriptions and examples
- Success response schema (matching the `{ data, error, meta }` envelope)
- Error responses: 400, 422, 500

Monetary fields in API responses are integers (kopecks). Document this in the field description.

## Step 4 — Present for approval

Present both schema and contract. State any non-obvious decisions (indexing strategy, aggregation approach, precision rationale).

**No implementation begins until the user approves.**

## Step 5 — Update feature spec

After approval, update `docs/specs/[feature-name].md`:
- Fill in the API Contract section with a reference to `docs/api/[feature-name].yaml`
- Mark DB Architect row as done in the Roles table
