const express = require('express');

//Services
const ScheduleService = require('../services/schedule');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

//Schemas
const { idSpeakerSchema } = require('../utils/schemas/speaker');
const { idEventSchema } = require('../utils/schemas/event');
const {
  idScheduleSchema,
  createScheduleSchema,
  updateScheduleSchema,
} = require('../utils/schemas/schedule');

function scheduleApi(app) {
  const router = express.Router();

  app.use('/api/schedule/', router);
  const scheduleService = new ScheduleService();

  router.get(
    '/:id_schedule',
    validationHandler(idScheduleSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id_schedule } = req.params;
        const result = await scheduleService.getSchedule(id_schedule);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Shedule listed',
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
        const result = await scheduleService.getSchedules(id_event);

        if (result.isBoom) next(result);

        res.status(200).json({
          data: result,
          message: 'Shedules listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single(),
    validationHandler(createScheduleSchema),

    async (req, res, next) => {
      const { body: schedule } = req;
      try {
        const result = await scheduleService.createSchedule({
          schedule,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          data: { id_schedule: result },
          message: 'Speaker created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single(),
    validationHandler(idScheduleSchema, 'query'),
    validationHandler(updateScheduleSchema),
    async (req, res, next) => {
      const { id_schedule } = req.query;
      const { body: schedule } = req;

      try {
        const result = await scheduleService.updateScheule(
          { id_schedule },
          schedule
        );

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Schedule updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_schedule',
    validationHandler(idScheduleSchema, 'params'),
    async (req, res, next) => {
      const { id_schedule } = req.params;
      try {
        const result = await scheduleService.deleteSchedule(id_schedule);

        if (result.isBoom) next(result);

        res.status(201).json({
          data: result,
          message: 'Schedule deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = scheduleApi;
