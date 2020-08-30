const express = require('express');

const UsersService = require('../services/user');

const validationHandler = require('../utils/middleware/validationHandler');

//Schemas
const { idUserShcema } = require('../utils/schemas/user');

function UsersApi(app) {
  const router = express.Router();
  app.use('/api/users/', router);

  const usersService = new UsersService();

  router.get(
    '/:id_user',
    validationHandler(idUserShcema, 'params'),
    async (req, res, next) => {
      try {
        const { id_user } = req.params;
        const user = await usersService.GetUser(id_user);

        if (user.isBoom) next(user);

        res.status(200).json({
          data: user,
          message: 'user listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', async (req, res, next) => {
    const { body: user } = req;
    try {
      const id_user = await usersService.CreateUser({ user });

      res.status(201).json({
        data: id_user,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = UsersApi;
