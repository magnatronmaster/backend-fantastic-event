const express = require('express');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/sponsors', router);

  router.get('/', (req, res) => {
    res.status(200).send('I\'m a live')
  });
};

module.exports = usersApi;
