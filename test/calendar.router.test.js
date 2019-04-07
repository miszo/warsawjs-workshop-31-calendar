const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const router = require('../web/routing/calendar.router');

let app = null;
let ajv = null;

beforeEach(() => {
  app = express();
  app.use(bodyParser.json());
  router(app);

  ajv = new Ajv();
});

it('api/calendar exists', async () => {
  const res = await supertest(app)
    .get('/api/calendar')
    .expect(200);

});

it('/api/calendar response is valid', async () => {
  const schema = require('../docs/schemas/calendar.scheme');
  const validate = ajv.compile(schema);

  const res = await supertest(app)
    .get('/api/calendar?month=???')
    .expect(200);

  const valid = validate(res.body);

  expect(valid).toBeTruthy();
  expect(validate.errors).toBeNull();
});
