const Joi = require('joi');
const { id_orgSchema } = require('./organization');

const id_eventSchema = Joi.string().guid({ version: ['uuidv4'] });
const name_eventSchema = Joi.string().min(3).max(50);
const description_eventSchema = Joi.string().min(3);
const location_eventShcema = Joi.string().min(3);
const date_start_eventShcema = Joi.date().iso();
const date_end_eventShcema = Joi.date().iso();
const banner_eventSchema = Joi.string().min(3);
const logo_eventSchema = Joi.string().min(3);
const public_eventSchema = Joi.boolean();
const url_eventSchema = Joi.string().min(3);

const createEnvetSchema = Joi.object({
  name_event: name_eventSchema.required(),
  description_event: description_eventSchema.required(),
  location_event: location_eventShcema,
  date_start_event: date_start_eventShcema.required(),
  date_end_event: date_end_eventShcema,
  banner_event: banner_eventSchema,
  logo_event: logo_eventSchema,
  public_event: public_eventSchema,
  url_event: url_eventSchema,
  idOrg: id_orgSchema.required(),
});

const updateEnvetSchema = Joi.object({
  name_event: name_eventSchema,
  description_event: description_eventSchema,
  location_event: location_eventShcema,
  date_start_event: date_start_eventShcema,
  date_end_event: date_end_eventShcema,
  banner_event: banner_eventSchema,
  logo_event: logo_eventSchema,
  public_event: public_eventSchema,
  url_event: url_eventSchema,
});

const idEventSchema = Joi.object({
  id_event: id_eventSchema.required(),
});

module.exports = {
  idEventSchema,
  updateEnvetSchema,
  createEnvetSchema,
  id_eventSchema,
};
