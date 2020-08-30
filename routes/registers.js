const express = require('express');

//Services
const RegisterService = require('../services/register');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

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
}

module.exports = registerApi;
