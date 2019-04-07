const express = require('express');
const router = express.Router();

const { buildCalendar } = require('../helpers/calendar');
const { getEvents } = require('../services/events');

router.get('/calendar', async (req, res) => {
  try {
    const response = { data: [] };

    if (!req.query) {
      console.warn('no query was provided');
      return void res.json(response);
    }
    if (!req.query.month) {
      console.log('month argument was not provided in query');
      return void res.warn(response);
    }

    const dates = buildCalendar(req.query.month);
    const events = await getEvents(dates);

    response.data = events;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = (app) => {
  app.use('/api', router);
};
