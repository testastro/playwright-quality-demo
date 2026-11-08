import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://restful-booker.herokuapp.com' });
test('GET /booking returns list of bookings', async ({ request }) => {
  const response = await request.get('/booking');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});