const express = require('express');
const SponsorService = require('../services/sponsor');
const { upload } = require('../utils/tools/saveImages')

const sponsorService = new SponsorService();

function sponsorApi(app) {
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
      const sponsors = await sponsorService.getSponsors();
      res.status(200).json({
        error: false,
        data: sponsors,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/', upload.single('file') ,async (req, res) => {
    const { body: sponsor } = req;
    try {
      const createdSponsor = await sponsorService.createSponsor({
        sponsor,
      });
      res.status(201).json({
        error: false,
        data: createdSponsor,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/:sponsorId', async (req, res) => {
    const { sponsorId } = req.params;
    const { body: sponsor } = req;
    try {
      const updatedSponsor = await sponsorService.updateSponsor({
        sponsorId,
        sponsor,
      });
      res.status(201).json({
        error: false,
        data: updatedSponsor,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete('/:sponsorId', async (req, res) => {
    const { sponsorId } = req.params;
    try {
      const deletedSponsor = await sponsorService.deleteSponsor({
        sponsorId
      });
      res.status(201).json({
        error: false,
        data: deletedSponsor,
      });
    } catch (error) {
      return error;
    }
  });
};

module.exports = sponsorApi;
