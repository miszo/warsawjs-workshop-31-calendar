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

const eventUpdateFake = () => ({
  description: 'Beetroot desc',
  notification: false,
  time: '2019-04-24T23:55',
  title: 'Beetroot'
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

it('/api/event responds with 200', async () => {
  const res = await supertest(app)
    .post('/api/event')
    .set('Accept', 'application/json')
    .send(eventFake())
    .expect(200);

  await EventModel.deleteOne({ _id: res.body.id });
});

it('POST /api/event response is valid', async () => {
  const schema = require('../docs/schemas/event.scheme');
  const validate = ajv.compile(schema);

  const res = await supertest(app)
    .post('/api/event')
    .set('Accept', 'application/json')
    .send(eventFake())
    .expect(200);

  const valid = validate(res.body);

  expect(valid).toBeTruthy();
  expect(validate.errors).toBeNull();
  const eventList = await EventModel.find({ _id: res.body.id });
  expect(eventList.length).toBe(1);
  await EventModel.deleteOne({ _id: res.body.id });
});

it('DELETE /api/event/:id can remove event', async () => {
  const createdEvent = await supertest(app)
    .post('/api/event')
    .set('Accept', 'application/json')
    .send(eventFake());

  const res = await supertest(app)
    .delete(`/api/event/${createdEvent.body.id}`)
    .expect(200);

  expect(createdEvent.body.id).toBe(res.body.id);
});

it('PUT /api/event/:id can update event', async () => {
  const createdEvent = await supertest(app)
    .post('/api/event')
    .set('Accept', 'application/json')
    .send(eventFake());

  const res = await supertest(app)
    .put(`/api/event/${createdEvent.body.id}`)
    .set('Accept', 'application/json')
    .send(eventUpdateFake());

  const updatedEvent = await EventModel.findById({ _id: res.body.id });

  expect(createdEvent.body.id).toBe(res.body.id);
  expect(updatedEvent.title).toBe(eventUpdateFake().title);

  await EventModel.deleteOne({ _id: res.body.id });
});
