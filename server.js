const express = require('express');
const bodyParser = require('body-parser');
const sponsors = require('./routes/sponsors');
const organizations = require('./routes/organizations');
const { config } = require('./config');

const app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
sponsors(app);
organizations(app);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
