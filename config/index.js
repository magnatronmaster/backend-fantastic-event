require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbDialect: process.env.DB_DIALECT,
  dbPort: process.env.DB_PORT || 3306,
  googleCloudProject: process.env.GOOGLE_CLOUD_PROJECT,
  googleCloudBucket: process.env.GOOGLE_CLOUD_BUCKET,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  googleAccessToken: process.env.GOOGLE_ACCESS_TOKEN,
};

module.exports = { config };
