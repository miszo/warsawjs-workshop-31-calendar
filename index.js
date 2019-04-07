const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connect } = require('./db');

require('dotenv').config({
  path: path.join(__dirname, 'config', 'app.env')
});

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 204
};

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

require('./web/routing/base.router')(app);
require('./web/routing/calendar.router')(app);
require('./web/routing/event.router')(app);
require('./web/routing/day.router')(app);

(async () => {
  await connect();

  app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
  });
})();
