const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/user');

/**
 * Here is the authentication with:
 * email and password
 */
passport.use(
  new BasicStrategy(async function (email, password, cb) {
    const userService = new UserService();
    try {
      const user = await userService.GetUserByEmail(email);

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password_user))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
