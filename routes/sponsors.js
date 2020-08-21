const express = require('express');
const SponsorService = require('../services/sponsors');
const Sponsor = require('../lib/models/sponsors');

const sponsorService = new SponsorService();
function usersApi(app) {
  const router = express.Router();
  app.use('/api/sponsors', router);


  router.get('/:sponsorId', async (req, res) => {
    try {
      const { sponsorId } = req.params;
      const sponsor = await sponsorService.getSponsor({ sponsorId });
      res.status(200).json({
        error: false,
        data: sponsor,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/', async(req, res) => {
    try {
      const sponsors = await sponsorService.getSposors();
      res.status(200).json({
        error: false,
        data: sponsors,
      });
    } catch (error) {
      console.log(error);
    }
  });

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
