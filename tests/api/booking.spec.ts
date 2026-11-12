import { test, expect } from '@playwright/test';
const apiUser = process.env.API_USER ?? 'admin';
const apiPassword = process.env.API_PASSWORD ?? 'password123';

test.use({ baseURL: 'https://restful-booker.herokuapp.com' });
test('GET /booking returns list of bookings', { tag: '@smoke' }, async ({ request }) => {
  const response = await request.get('/booking');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('bookingid');
});

test('GET /booking/:id returns booking details', async ({ request }) => {
  const listResponse = await request.get('/booking');
  const list = await listResponse.json();
  const id = list[0].bookingid;

  const response = await request.get(`/booking/${id}`, { headers: { Accept: 'application/json' } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('firstname');
  expect(body).toHaveProperty('lastname');
  expect(body).toHaveProperty('totalprice');
  expect(body).toHaveProperty('bookingdates.checkin');
});

test('GET /booking/:id returns 404 for unknown id', async ({ request }) => {
  const response = await request.get(`/booking/999999999`, { headers: { Accept: 'application/json' } });
  expect(response.status()).toBe(404);
});

const bookingData=
  {
    firstname: 'Hung',
    lastname: 'Phan',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast'
  }
  
test('POST /booking creates booking, GET returns it', { tag: '@smoke' }, async ({ request }) => {
  const response = await request.post('/booking',{data: bookingData
  });
  expect(response.status()).toBe(200);
  const created= await response.json();
  const id=created.bookingid;
  
  const getResponse = await request.get(`/booking/${id}`, { headers: { Accept: 'application/json' } });
  expect(getResponse.status()).toBe(200);
  const body = await getResponse.json();
  expect(body).toEqual(bookingData);
});

test('GET /auth token',async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: apiUser,
      password: apiPassword
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toBeTruthy();
  console.log('token',body.token);
});

test('DELETE /booking removes booking',async ({ request }) => {
  const authResponse = await request.post('/auth', {
    data: {
      username: apiUser,
      password: apiPassword
    }
  });
  expect(authResponse.status()).toBe(200);
  const body = await authResponse.json();
  const token = body.token;
  const bookingResponse = await request.post('/booking',{data: bookingData
  });
  const created= await bookingResponse.json();
  const id=created.bookingid;
   const deleteResponse = await request.delete(`/booking/${id}`, {
     headers: { Cookie: `token=${token}` }
   });
   expect(deleteResponse.status()).toBe(201);
  const getResponse = await request.get(`/booking/${id}`, { headers: { Accept: 'application/json' } });
  expect(getResponse.status()).toBe(404);
});