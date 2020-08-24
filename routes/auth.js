const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Services
const UserService = require('../services/user');

const { config } = require('../config');

//Basic Strategy
require('../utils/auth/strategies/basic');

function AuthApi(app) {
  const router = express.Router();

  app.use('/api/auth/', router);
  const userService = new UserService();

  // Login
  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { user_id: id, email } = user;
          const payload = {
            sub: id,
            email,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });
          return res.status(200).json({ token, user: { id, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  //Register
  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      const id_user = await userService.CreateUser({ user });

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
