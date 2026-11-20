# Syntax cheat sheet (8 patterns)
| Pattern | Example | Common mistake |
|---|---|---|
| import | `import { test, expect } from '@playwright/test';` | Auto-added unknown import → delete |
| const | `const response = await request.get('/booking');` | Same name declared twice |
| template literal | `` `/booking/${bookingId}` `` | Used ' instead of backtick ` |
| object | `{ firstname: 'Hung', totalprice: 100 }` | Missing comma or } |
| array | `[200, 201]` | Confusing index [0] with id |
| arrow function | `async ({ page }) => { ... }` | Missing `});` at the end |
| async/await | `await page.goto('/')` | Missing await → step runs too early |
| brackets | Type the closing pair first | Unbalanced { } ( ) |