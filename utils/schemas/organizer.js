const Joi = require('joi');
const { id_eventSchema } = require('./event');

const id_organizerSchema = Joi.string().guid({ version: ['uuidv4'] });

const createorganizerSchema = Joi.object({
  email_organizers: Joi.array()
    .items(Joi.string().email().required())
    .required(),
  id_event: id_eventSchema.required(),
});

const updateorganizerSchema = Joi.object({
  email_organizer: Joi.string().email(),
});

const idorganizerSchema = Joi.object({
  id_organizer: id_organizerSchema.required(),
});

module.exports = {
  idorganizerSchema,
  updateorganizerSchema,
  createorganizerSchema,
};
