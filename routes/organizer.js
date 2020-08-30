const express = require('express');

//Services
const OrganizerService = require('../services/organizer');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

//Schemas
const {
  idorganizerSchema,
  createorganizerSchema,
  updateorganizerSchema,
} = require('../utils/schemas/organizer');
const { idEventSchema } = require('../utils/schemas/event');

function organizerApi(app) {
  const router = express.Router();

  app.use('/api/organizer/', router);
  const organizerService = new OrganizerService();

  router.get(
    '/:id_organizer',
    validationHandler(idorganizerSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id_organizer } = req.params;
        const result = await organizerService.getOrganizer(id_organizer);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Organizer listed',
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
        const result = await organizerService.getOrganizers(id_event);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Organizers listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single(),
    validationHandler(createorganizerSchema),
    async (req, res, next) => {
      const { body: organizer } = req;

      try {
        const result = await organizerService.createOrganizer({
          organizer,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          message: 'Organizers created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single(),
    validationHandler(idorganizerSchema, 'query'),
    validationHandler(updateorganizerSchema),
    async (req, res, next) => {
      const { id_organizer } = req.query;
      const { body: organizer } = req;

      try {
        const result = await organizerService.updateOrganizer(
          { id_organizer },
          organizer
        );

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Organizer updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_organizer',
    validationHandler(idorganizerSchema, 'params'),
    async (req, res, next) => {
      const { id_organizer } = req.params;
      try {
        const result = await organizerService.deleteOrganizer(id_organizer);

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Organizer deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = organizerApi;
