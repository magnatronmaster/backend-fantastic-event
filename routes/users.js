const express = require('express');
const UsersService = require('../services/user');
const { User } = require('../lib/sequelize');

function UsersApi(app) {
  const router = express.Router();
  app.use('/api/users/', router);

  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    try {
      const users = await usersService.GetUser();

      res.status(200).json({
        status: 200,
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

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
