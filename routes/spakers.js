const express = require('express');

//Services
const SpeakerService = require('../services/speaker');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');
const { sendUploadToGCS } = require('../utils/middleware/saveImages');

//Schemas
const {
  idSpeakerSchema,
  createSpeakerSchema,
  updateSpeakerSchema,
} = require('../utils/schemas/speaker');
const { idEventSchema } = require('../utils/schemas/event');

function speakerApi(app) {
  const router = express.Router();

  app.use('/api/speaker/', router);
  const speakerService = new SpeakerService();

  router.get(
    '/:id_speaker',
    validationHandler(idSpeakerSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id_speaker } = req.params;
        const result = await speakerService.getSpeaker(id_speaker);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Speaker listed',
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
        const result = await speakerService.getSpeakers(id_event);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Speaker listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single('photo_speaker'),
    validationHandler(createSpeakerSchema),
    sendUploadToGCS,
    async (req, res, next) => {
      const { body: speaker } = req;
      // Was an image uploaded? If so, we'll use its public URL
      // in cloud storage.
      try {
        if (req.file && req.file.cloudStoragePublicUrl) {
          speaker.photo_speaker = req.file.cloudStoragePublicUrl;
        }

        const result = await speakerService.createSpeaker({
          speaker,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          data: { id_speaker: result },
          message: 'Speaker created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single('photo_speaker'),
    validationHandler(idSpeakerSchema, 'query'),
    validationHandler(updateSpeakerSchema),
    sendUploadToGCS,
    async (req, res, next) => {
      const { id_speaker } = req.query;
      const { body: speaker } = req;
      if (req.file && req.file.cloudStoragePublicUrl) {
        speaker.photo_speaker = req.file.cloudStoragePublicUrl;
      }

      try {
        const result = await speakerService.updateSpeaker(
          { id_speaker },
          speaker
        );

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Speaker updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_speaker',
    validationHandler(idSpeakerSchema, 'params'),
    async (req, res, next) => {
      const { id_speaker } = req.params;
      try {
        const result = await speakerService.deleteSpeaker(id_speaker);

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

module.exports = speakerApi;
