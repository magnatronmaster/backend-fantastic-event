const joi = require('joi');
const { idUserSchema } = require('./user');
const idOrganizationSchema = joi.string().guid({ version: ['uuidv4'] });
const nameSchema = joi.string().min(3).max(50);
const descriptionSchema = joi.string().min(3);

const createOrganizationSchema = joi.object({
  name_org: nameSchema.required(),
  description_org: descriptionSchema.required(),
  idUser: idUserSchema.required(),
});

const updateOrganizationSchema = joi.object({
  name_org: nameSchema,
  description_org: descriptionSchema,
  idUser: idUserSchema,
});

module.exports = {
  idOrganizationSchema,
  createOrganizationSchema,
  updateOrganizationSchema,
};
