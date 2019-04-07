const express = require('express');
const router = express.Router();

const { createEvent, removeEvent, updateEvent } = require('../services/events');

router.post('/event', async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('request body was not provided');
    }
    const id = await createEvent(req.body);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/event/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('id was not provided');
    }

    const removedId = await removeEvent(id);
    res.status(200).json({ id: removedId });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/event/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('id was not provided');
    }

    if (!req.body) {
      throw new Error('request body was not provided');
    }

    const updatedId = await updateEvent(id, req.body);

    res.status(200).json({ id: updatedId });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = (app) => {
  app.use('/api', router);
};
