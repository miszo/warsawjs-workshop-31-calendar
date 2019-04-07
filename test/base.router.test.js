const express = require('express');
const supertest = require('supertest');

const router = require('../web/routing/base.router');

it('base router works', async () => {
  let app = express();
  router(app);

  const res = await supertest(app)
    .get('/')
    .expect(200);

  expect(res.body.status).toBe('OK');
});
