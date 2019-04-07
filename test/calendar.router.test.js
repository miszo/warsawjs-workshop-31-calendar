const express = require('express')
const supertest = require('supertest');

const router = require('../web/routing/calendar.router');

let app = null;

beforeEach(() => {
  app = express();
  router(app);
});

it('api/calendar exists', async () => {
  let app = express();
  router(app);

  const res = await supertest(app)
    .get('/api/calendar')
    .expect(200);

  expect(res.body.status).toBe('OK');
});

