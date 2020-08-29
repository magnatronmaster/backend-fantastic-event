const Joi = require('joi');
const { id_eventSchema } = require('./event');
const { id_speakerSchema } = require('./speaker');

const id_scheduleSchema = Joi.string().guid({ version: ['uuidv4'] });
const title_scheduleSchema = Joi.string().min(3).max(50);
const description_scheduleSchema = Joi.string();
const datetime_start_scheduleSchema = Joi.date().iso();
const datetime_end_scheduleSchema = Joi.date().iso();

const createScheduleSchema = Joi.object({
  title_schedule: title_scheduleSchema.required(),
  description_schedule: description_scheduleSchema.required(),
  datetime_start_schedule: datetime_start_scheduleSchema.required(),
  datetime_end_shedule: datetime_end_scheduleSchema,
  id_event: id_eventSchema.required(),
  id_speaker: id_speakerSchema.required(),
});

const updateScheduleSchema = Joi.object({
  title_schedule: title_scheduleSchema,
  description_schedule: description_scheduleSchema,
  datetime_start_schedule: datetime_start_scheduleSchema,
  datetime_end_shedule: datetime_end_scheduleSchema,
});

const idScheduleSchema = Joi.object({
  id_schedule: id_scheduleSchema.required(),
});

module.exports = {
  idScheduleSchema,
  updateScheduleSchema,
  createScheduleSchema,
};
