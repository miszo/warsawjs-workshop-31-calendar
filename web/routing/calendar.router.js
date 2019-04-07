const express = require('express');
const router = express.Router();

router.get('/api/calendar', (req, res) => res.status(200).json({ status: 'OK' }));

module.exports = (app) => {
  app.use(router);
};
