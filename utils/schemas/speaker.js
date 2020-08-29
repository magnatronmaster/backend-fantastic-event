const Joi = require('joi');
const { id_eventSchema } = require('./event');

const id_speakerSchema = Joi.string().guid({ version: ['uuidv4'] });
const name_speakerSchema = Joi.string().min(3).max(50);
const biografhy_speakerSchema = Joi.string().min(2);
const role_speakerSchema = Joi.string().min(3).max(50);
const twitter_speakerSchema = Joi.string().min(3).max(50);
const photo_speakerSchema = Joi.string();

const createSpeakerSchema = Joi.object({
  name_speaker: name_speakerSchema.required(),
  biografhy_speaker: biografhy_speakerSchema.required(),
  role_speaker: role_speakerSchema.required(),
  twitter_speaker: twitter_speakerSchema,
  photo_speaker: photo_speakerSchema.required(),
  id_event: id_eventSchema.required(),
});

const updateSpeakerSchema = Joi.object({
  name_speaker: name_speakerSchema,
  biografhy_speaker: biografhy_speakerSchema,
  role_speaker: role_speakerSchema,
  twitter_speaker: twitter_speakerSchema,
  photo_speaker: photo_speakerSchema,
});

const idSpeakerSchema = Joi.object({
  id_speaker: id_speakerSchema.required(),
});

module.exports = {
  idSpeakerSchema,
  updateSpeakerSchema,
  createSpeakerSchema,
  id_speakerSchema,
};
