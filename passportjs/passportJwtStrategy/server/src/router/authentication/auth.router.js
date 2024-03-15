const express = require('express');
const passport = require('passport');
const {
  httpLoginUser,
  httpRegisterNewUser,
  isAuth,
} = require('./auth.controller');

const authRouter = express.Router();

/**
 * POST ROUTES
 */
authRouter.post('/sign-up-user', httpRegisterNewUser);

authRouter.post('/login', httpLoginUser);

module.exports = authRouter;
