const express = require('express');
const router = express.Router();

const { getEventsByDate } = require('../services/events');

router.get('/day', async (req, res) => {
  try {
    const response = { data: [] };

    if (!date) {
      console.warn('date argument was not provided in query');
      return void res.json(response);
    }

    const events = await getEventsByDate(req.query.date);
    response.data = events;
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = (app) => {
  app.use('/api', router);
};
