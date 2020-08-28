const Joi = require('joi');
const { id_eventSchema } = require('./event');

const id_sponsorSchema = Joi.string().guid({ version: ['uuidv4'] });
const name_sponsorSchema = Joi.string().min(3).max(50);
const url_sponsorSchema = Joi.string().uri();
const logo_sponsorSchema = Joi.string().min(3);

const createSponsorSchema = Joi.object({
  name_sponsor: name_sponsorSchema.required(),
  url_sponsor: url_sponsorSchema,
  logo_sponsor: logo_sponsorSchema,
  id_event: id_eventSchema.required(),
});

const updateSponsorSchema = Joi.object({
  name_sponsor: name_sponsorSchema,
  url_sponsor: url_sponsorSchema,
  logo_sponsor: logo_sponsorSchema,
});

const idSponsorSchema = Joi.object({
  id_sponsor: id_sponsorSchema.required(),
});

module.exports = {
  idSponsorSchema,
  updateSponsorSchema,
  createSponsorSchema,
};
