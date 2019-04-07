const express = require('express');
const router = express.Router();

const { getEventsByDate } = require('../services/events');

router.get('/api/day', async (req, res) => {
  const response = { data: [] };

  const events = await getEventsByDate(req.query.date);
  response.data = events;
  res.json(response);
});

module.exports = (app) => {
  app.use(router);
};
