const joi = require('joi');
const { id_userSchema } = require('./user');

const id_orgSchema = joi.string().guid({ version: ['uuidv4'] });
const nameSchema = joi.string().min(3).max(50);
const descriptionSchema = joi.string().min(3);

const createOrganizationSchema = joi.object({
  name_org: nameSchema.required(),
  description_org: descriptionSchema.required(),
  idUser: id_userSchema.required(),
});

const updateOrganizationSchema = joi.object({
  name_org: nameSchema,
  description_org: descriptionSchema,
});

const idOrganizationShcema = joi.object({
  id_org: id_orgSchema.required(),
});

module.exports = {
  id_orgSchema,
  createOrganizationSchema,
  updateOrganizationSchema,
  idOrganizationShcema,
};
