const express = require('express');
const router = express.Router();

const { buildCalendar } = require('../helpers/calendar');
const { getEvents } = require('../services/events');

router.get('/api/calendar', async (req, res) => {
  const response = { data: [] };

  const dates = buildCalendar(req.params.month);
  const events = await getEvents(dates);

  response.data = events;
  res.status(200).json(response);
});

module.exports = (app) => {
  app.use(router);
};
