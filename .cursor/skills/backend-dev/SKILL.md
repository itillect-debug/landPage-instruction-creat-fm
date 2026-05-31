---
name: backend-dev
description: Implementation patterns for Node.js + Fastify + MongoDB features. Use when implementing API routes, business logic, or MongoDB aggregations. Always requires an approved API contract before starting.
---

# Backend Development Patterns

## Pre-conditions

Before writing any code:
- [ ] API contract approved (`docs/api/[feature].yaml`)
- [ ] Mongoose schema approved (`server/shared/models/` or `server/features/[name]/model.ts`)

## Feature Folder Structure

```
server/features/[feature-name]/
  routes.ts       — Fastify route definitions with JSON Schema
  controller.ts   — request handlers (thin, delegates to service)
  service.ts      — business logic, DB queries, aggregations
  model.ts        — Mongoose model (if feature-specific)
```

## Route Definition Pattern

```typescript
// routes.ts
import type { FastifyInstance } from 'fastify'
import { getItems, createItem } from './controller'

const schema = {
  create: {
    body: {
      type: 'object',
      required: ['nameField', 'amountKopecks'],
      properties: {
        nameField: { type: 'string' },
        amountKopecks: { type: 'integer', minimum: 0 },
      },
    },
    response: {
      201: { /* matches OpenAPI contract */ },
    },
  },
}

export async function featureRoutes(fastify: FastifyInstance) {
  fastify.post('/', { schema: schema.create }, createItem)
  fastify.get('/', getItems)
}
```

## Response Envelope

Always return:
```typescript
// success
reply.send({ data: result, error: null, meta: {} })

// error
reply.status(422).send({ data: null, error: { code: 'VALIDATION_ERROR', message: '...' } })
```

## Financial Calculations

- All monetary values are integers (kopecks) in and out
- Use MongoDB aggregation pipelines — never accumulate in JS loops:

```typescript
// service.ts — example aggregation
const result = await SaleModel.aggregate([
  { $match: { userId } },
  { $group: {
    _id: null,
    totalRevenueKopecks: { $sum: '$revenueKopecks' },
    totalExpenseKopecks: { $sum: '$expenseKopecks' },
  }},
  { $addFields: {
    profitKopecks: { $subtract: ['$totalRevenueKopecks', '$totalExpenseKopecks'] },
  }},
])
```

## Error Handling

```typescript
// controller.ts
export async function createItem(request, reply) {
  try {
    const result = await itemService.create(request.body)
    reply.status(201).send({ data: result, error: null, meta: {} })
  } catch (err) {
    request.log.error({ err, body: request.body }, 'createItem failed')
    reply.status(500).send({ data: null, error: { code: 'INTERNAL_ERROR', message: 'Unexpected error' } })
  }
}
```

## After Implementation

- Update `docs/specs/[feature-name].md`: add files to Files section, mark Backend Dev row as done
- Verify every response shape matches the OpenAPI contract exactly
- Present for user review before committing
