const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');

const router = require('../web/routing/base.router');

it('base router works', async () => {
  let app = express();
  app.use(bodyParser.json());
  router(app);

  const res = await supertest(app)
    .get('/')
    .expect(200);

  expect(res.body.status).toBe('OK');
});
