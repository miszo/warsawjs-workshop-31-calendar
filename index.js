const path = require('path');
const express = require('express');


require('dotenv').config({
  path: path.join(__dirname, 'config', 'app.env')
});

const app = express();
require('./web/routing/base.router')(app);
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
