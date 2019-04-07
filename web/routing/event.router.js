const express = require('express');
const router = express.Router();

const { createEvent, removeEvent, updateEvent } = require('../services/events');

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
