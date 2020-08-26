const joi = require('joi');

const idUserSchema = joi.string().guid({ version: ['uuidv4'] });
const emailSchema = joi.string().email();
const passwordSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'));

const createUserSchema = joi.object({
  email_user: emailSchema.required(),
  password_user: passwordSchema.required(),
});

module.exports = {
  idUserSchema,
  createUserSchema,
};
