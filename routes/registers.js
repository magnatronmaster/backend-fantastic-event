const express = require('express');

//Services
const RegisterService = require('../services/register');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

const sendEmail = require('../utils/mail/index');

//Schemas
const { createRegisterSchema } = require('../utils/schemas/register');

function registerApi(app) {
  const router = express.Router();

  app.use('/api/register/', router);
  const registerService = new RegisterService();

  router.post(
    '/',
    multer.single(),
    validationHandler(createRegisterSchema),

    async (req, res, next) => {
      const { body: register } = req;
      try {
        const result = await registerService.createRegister({
          register,
        });

        if (result.isBoom) next(result);

        res.status(201).json({
          data: { id_register: result },
          message: 'Register created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/mail/daily',
    async (req, res, next) => {

      try{
        const data= await sendEmail()
        res.status(200).json({data, message: 'Mails Send'});
      } catch (error){
        next(error)
      }
    }
  );
}

module.exports = registerApi;
