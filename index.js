const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./db');

require('dotenv').config({
  path: path.join(__dirname, 'config', 'app.env')
});

const app = express();
app.use(bodyParser.json());

require('./web/routing/base.router')(app);
require('./web/routing/calendar.router')(app);
require('./web/routing/event.router')(app);

(async () => {
  await connect();

  app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${ process.env.PORT }`);
  });

})();
