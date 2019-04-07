const express = require('express');
const router = express.Router();
const EventModel = require('../../models/event-model');

const createEvent = async (data) => {
  const model = await EventModel.create(data);
  return model.save();
};

const removeEvent = async (id) => {
  await EventModel.deleteOne({ _id: id });
  return id;
};

const updateEvent = async (id, data) => {
  await EventModel.updateOne({ _id: id }, data);
  return id;
};

router.post('/api/event', async (req, res) => {
  const respone = await createEvent(req.body);
  return res.status(200).json({ id: respone._id });
});

router.delete('/api/event/:id', async (req, res) => {
  const { id } = req.params;
  const removedId = await removeEvent(id);
  res.status(200).json({ id: removedId });
});

router.put('/api/event/:id', async (req, res) => {
  const { id } = req.params;
  const updatedId = await updateEvent(id, req.body);

  res.status(200).json({ id: updatedId });
});

module.exports = (app) => {
  app.use(router);
};
