const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const router = require('../web/routing/event.router');
const EventModel = require('../models/event-model');
const { connect } = require('../db');

let app = null;
let ajv = null;

const eventFake = () => ({
  description: 'Potato desc',
  notification: false,
  time: '2019-04-24T00:00',
  title: 'Potato'
});

beforeAll(async () => {
  await connect();
});

beforeEach(() => {
  app = express();
  app.use(bodyParser.json());
  router(app);

  ajv = new Ajv();
});

it('GET /api/day', async () => {
  const createdEvent = await supertest(app)
    .post('/api/event')
    .set('Accept', 'application/json')
    .send(eventFake())
    .expect(200);

  const res = await supertest(app)
    .post('/api/day?date=2019-04-24')
    .expect(404);

  await EventModel.deleteOne({ _id: createdEvent.body.id });
});
