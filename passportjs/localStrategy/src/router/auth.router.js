const express = require('express');
const passport = require('passport');
const {
  httpRegisterNewUser,
  isAuth,
} = require('./auth.controller');

const authRouter = express.Router();

/**
 * POST ROUTES
 */
authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success',
  }),
);

authRouter.post('/register', httpRegisterNewUser);

/**
 * GET ROUTES
 */
authRouter.get('/', (req, res) => {
  return res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p><p>Or <a href="/login">login</a></p>');
});

authRouter.get('/login', isAuth, (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// When you visit http://localhost:3000/register, you will see "Register Page"
authRouter.get('/register', (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
authRouter.get('/protected-route', isAuth);

// Visiting this route logs the user out
authRouter.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/protected-route');
  });
});

authRouter.get('/login-success', (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>',
  );
});

authRouter.get('/login-failure', (req, res, next) => {
  return res.send('<h1>No User found!!!</h1>');
});

module.exports = authRouter;
