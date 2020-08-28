const express = require('express');
const bodyParser = require('body-parser');

const sponsorsApi = require('./routes/sponsors');
const usersApi = require('./routes/users');
const organizationsApi = require('./routes/organizations');
const authApi = require('./routes/auth');
const eventsApi = require('./routes/events');

const { config } = require('./config');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
authApi(app);
sponsorsApi(app);
usersApi(app);
organizationsApi(app);
eventsApi(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
