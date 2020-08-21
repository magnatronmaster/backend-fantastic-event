const express = require('express');
const bodyParser = require('body-parser');
const sponsors = require('./routes/sponsors');
const { config } = require('./config');

//Conection DB
const MysqlLib = require('./lib/mysql')
const mysqlLib= new MysqlLib();

const app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
sponsors(app);

app.listen(config.port, () => {
  console.log(`Servidor activo en http://localhost:${config.port}`);
});
