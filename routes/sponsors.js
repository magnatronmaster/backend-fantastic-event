const express = require('express');
const SponsorService = require('../services/sponsors');

const sponsorService = new SponsorService();
function usersApi(app) {
  const router = express.Router();
  app.use('/api/sponsors', router);

  router.post('/', async (req, res) => {
    const { body: sponsor } = req;
    try {
      const createdCategory = await sponsorService.createSponsor({
        sponsor,
      });
      res.status(201).json({
        error: false,
        data: createdCategory,
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = usersApi;
