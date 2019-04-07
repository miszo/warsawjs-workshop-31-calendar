const express = require('express');
const router = express.Router();
const EventModel = require('../../models/event-model');

const createEvent = async (data) => {
  const model = await EventModel.create(data);
  return model.save();
};

const removeEvent = async (id) => {
  await EventModel.deleteOne({ _id: id });
};

router.post('/api/event', async (req, res) => {
  const respone = await createEvent(req.body);
  return res.status(200).json({ id: respone._id });
});

router.delete('/api/event/:id', async (req, res) => {
  const { id } = req.params;
  await removeEvent(id);
  res.status(200).json({ id });
});

module.exports = (app) => {
  app.use(router);
};
