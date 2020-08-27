const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Services
const UserService = require('../services/user');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');

const { idSchema, createUserSchema } = require('../utils/schemas/user');

const { config } = require('../config');
const { createSchema } = require('../lib/repository/connection');

//Basic Strategy
require('../utils/auth/strategies/basic');

function AuthApi(app) {
  const router = express.Router();

  app.use('/api/auth/', router);
  const userService = new UserService();

  // Login
  router.post('/sign-in/', (req, res, next) => {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { id_user, email_user } = user;
          const payload = {
            sub: id_user,
            email_user,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });
          return res.status(200).json({ token, user: { id_user, email_user } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  //Register
  router.post('/sign-up/', validationHandler(createUserSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;
    try {
      const id_user = await userService.CreateUser({ user });

      if (id_user.isBoom) throw id_user;

      res.status(201).json({
        data: id_user,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = AuthApi;
