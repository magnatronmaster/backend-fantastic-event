require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbDialect: process.env.DB_DIALECT,
  dbPort: process.env.DB_PORT || 3306,
};

module.exports = { config };
