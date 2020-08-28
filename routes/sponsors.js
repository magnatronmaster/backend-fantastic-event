const express = require('express');

//Services
const SponsorService = require('../services/sponsor');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');
const { sendUploadToGCS } = require('../utils/middleware/saveImages');

//Schemas
const {
  idSponsorSchema,
  createSponsorSchema,
  updateSponsorSchema,
} = require('../utils/schemas/sponsor');
const { idEventSchema } = require('../utils/schemas/event');

function sponsorApi(app) {
  const router = express.Router();

  app.use('/api/sponsors', router);
  const sponsorService = new SponsorService();

  router.get(
    '/:id_sponsor',
    validationHandler(idSponsorSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id_sponsor } = req.params;
        const result = await sponsorService.getSponsor(id_sponsor);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Sponsor listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/',
    validationHandler(idEventSchema, 'query'),
    async (req, res, next) => {
      const { id_event } = req.query;
      try {
        const result = await sponsorService.getSponsors(id_event);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Sponsors listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single('logo_sponsor'),
    validationHandler(createSponsorSchema),
    sendUploadToGCS,
    async (req, res, next) => {
      const { body: sponsor } = req;
      // Was an image uploaded? If so, we'll use its public URL
      // in cloud storage.
      try {
        if (req.file && req.file.cloudStoragePublicUrl) {
          sponsor.logo_sponsor = req.file.cloudStoragePublicUrl;
        }

        const result = await sponsorService.createSponsor({
          sponsor,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          data: { id_sponsor: result },
          message: 'Sponsor created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single('logo_sponsor'),
    sendUploadToGCS,
    validationHandler(idSponsorSchema, 'query'),
    validationHandler(updateSponsorSchema),
    async (req, res, next) => {
      const { id_sponsor } = req.query;
      const { body: sponsor } = req;

      if (req.file && req.file.cloudStoragePublicUrl) {
        sponsor.logo_sponsor = req.file.cloudStoragePublicUrl;
      }

      try {
        const result = await sponsorService.updateSponsor(
          { id_sponsor },
          sponsor
        );

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Sponsor updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_sponsor',
    validationHandler(idSponsorSchema, 'params'),
    async (req, res, next) => {
      const { id_sponsor } = req.params;
      try {
        const result = await sponsorService.deleteSponsor(id_sponsor);

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Sponsor deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = sponsorApi;
