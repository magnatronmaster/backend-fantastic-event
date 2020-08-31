const express = require('express');

//Services
const EventService = require('../services/event');
const emailCompose = require('../utils/mail/index');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

//Schemas
const { idOrganizationShcema } = require('../utils/schemas/organization');
const {
  createEnvetSchema,
  updateEnvetSchema,
  idEventSchema,
} = require('../utils/schemas/event');

function eventApi(app) {
  const router = express.Router();

  app.use('/api/event/', router);
  const eventService = new EventService();

  router.get(
    '/:id_event',
    validationHandler(idEventSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id_event } = req.params;
        const result = await eventService.getEvent(id_event);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Event listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/',
    validationHandler(idOrganizationShcema, 'query'),
    async (req, res, next) => {
      const { id_org } = req.query;
      try {
        const result = await eventService.getEvents(id_org);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Envents listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single(),
    validationHandler(createEnvetSchema),
    async (req, res, next) => {
      const { body: event } = req;

      try {
        const result = await eventService.createEvent({
          event,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          data: { idEvent: result },
          message: 'Event created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single(),
    validationHandler(updateEnvetSchema),
    validationHandler(idEventSchema, 'query'),
    async (req, res, next) => {
      const { id_event } = req.query;
      const { body: event } = req;
      try {
        const result = await eventService.updateEvent({ id_event }, event);

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Event updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_event',
    validationHandler(idEventSchema, 'params'),
    async (req, res, next) => {
      const { id_event } = req.params;

      try {
        const result = await eventService.deleteEvent(id_event);

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Event deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );


  router.get(
    '/mail/daily',
    async (req, res, next) => {

      try{
        const data= await emailCompose()
        res.status(200).json({data, message: 'Mails Send'});
      } catch (error){
        next(error)
      }
    }
  );
}

module.exports = eventApi;
