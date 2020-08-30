const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sponsorsApi = require('./routes/sponsors');
const usersApi = require('./routes/users');
const organizationsApi = require('./routes/organizations');
const authApi = require('./routes/auth');
const eventsApi = require('./routes/events');
const speakersApi = require('./routes/spakers');
const schedulesApi = require('./routes/schedules');
const registersApi = require('./routes/registers');
const organizersApi = require('./routes/organizer');

const { config } = require('./config');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const app = express();

// //cors
if (config.dev === 'production') {
  const corsOptions = { origin: config.urlFrontend };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
authApi(app);
sponsorsApi(app);
usersApi(app);
organizationsApi(app);
eventsApi(app);
speakersApi(app);
schedulesApi(app);
registersApi(app);
organizersApi(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
