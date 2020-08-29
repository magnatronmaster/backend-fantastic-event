const Joi = require('joi');
const { id_eventSchema, idEventSchema } = require('./event');
const createRegisterSchema = Joi.object({
  email_register: Joi.string().email().required(),
  name_register: Joi.string().min(3).max(100).required(),
  id_event: id_eventSchema.required(),
});

module.exports = { createRegisterSchema };
