const express = require('express');
const supertest = require('supertest');
const Ajv = require('ajv');

const router = require('../web/routing/calendar.router');

let app = null;
let ajv = null;

beforeEach(() => {
  app = express();
  router(app);

  ajv = new Ajv();
});

it('api/calendar exists', async () => {
  let app = express();
  router(app);

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
  console.log(validate.errors);
  expect(valid).toBeTruthy();
  expect(validate.errors).toBeNull();
});
