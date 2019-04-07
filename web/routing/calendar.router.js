const express = require('express');
const router = express.Router();

const { buildCalendar, buildEvents } = require('../helpers/calendar');

router.get('/api/calendar', (req, res) =>
  res
    .status(200)
    .json({
      data: buildEvents(buildCalendar(req.params.month))
    }));

module.exports = (app) => {
  app.use(router);
};
