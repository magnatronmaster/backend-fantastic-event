const Joi = require('joi');

const id_userSchema = Joi.string().guid({ version: ['uuidv4'] });

const email_userSchema = Joi.string().email();
const password_userSchema = Joi.string().pattern(
  new RegExp('^[a-zA-Z0-9]{8,30}$')
);

const createUserSchema = Joi.object({
  email_user: email_userSchema.required(),
  password_user: password_userSchema.required(),
});

const idUserShcema = Joi.object({
  id_user: id_userSchema.required(),
});

module.exports = {
  id_userSchema,
  createUserSchema,
  idUserShcema,
};
